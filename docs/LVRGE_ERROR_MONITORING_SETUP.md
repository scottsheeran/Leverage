# LVRGE Error Monitoring & Logging Setup Guide

## Overview
Comprehensive error tracking, logging, and monitoring system for LVRGE production deployment. Includes Sentry integration, Claude API monitoring, payment error tracking, and frontend error boundaries.

---

## 1. SENTRY SETUP (Error Tracking)

### 1.1 Create Sentry Account & Project
1. Sign up at https://sentry.io (free plan includes 5,000 events/month)
2. Create new organization: "LVRGE"
3. Create project: "lvrge-app"
4. Select "JavaScript" as platform
5. Copy your DSN (Data Source Name)

### 1.2 Frontend Sentry Integration (app.html)

Add to `<head>` before other scripts:
```html
<script
  src="https://browser.sentry-cdn.com/7.100.0/bundle.min.js"
  integrity="sha384-..." 
  crossorigin="anonymous"
></script>
<script>
  Sentry.init({
    dsn: "YOUR_DSN_HERE",
    environment: "production",
    tracesSampleRate: 0.1, // 10% of transactions
    beforeSend(event, hint) {
      // Don't send errors in development
      if (window.location.hostname === "localhost") {
        return null;
      }
      return event;
    }
  });
</script>
```

### 1.3 Backend Sentry Integration (Node.js API)

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event, hint) {
    // Filter out 404s and other non-critical errors
    if (event.exception) {
      const error = hint.originalException;
      if (error.message?.includes("404") || error.status === 404) {
        return null;
      }
    }
    return event;
  }
});

// Attach Sentry error handler
app.use(Sentry.Handlers.errorHandler());
```

---

## 2. CRITICAL MONITORING POINTS

### 2.1 Resume Analysis (Claude API)

```javascript
async function analyzeResume(jobDescription, resume) {
  const startTime = Date.now();
  
  try {
    const response = await claude.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Analyze this resume against the job description...`
        }
      ]
    });

    // Log successful analysis
    logger.info("Resume analysis successful", {
      duration: Date.now() - startTime,
      jobDescriptionLength: jobDescription.length,
      resumeLength: resume.length,
      tokensUsed: response.usage.output_tokens
    });

    return response;
  } catch (error) {
    // Log and report errors
    logger.error("Resume analysis failed", {
      error: error.message,
      duration: Date.now() - startTime,
      errorType: error.constructor.name
    });

    // Report to Sentry with context
    Sentry.captureException(error, {
      tags: {
        feature: "resume-analysis",
        severity: "high"
      },
      contexts: {
        resumeAnalysis: {
          jobDescriptionLength: jobDescription.length,
          resumeLength: resume.length,
          timestamp: new Date().toISOString()
        }
      }
    });

    throw error;
  }
}
```

### 2.2 Payment Processing (LemonSqueezy)

```javascript
async function handlePaymentWebhook(event) {
  try {
    logger.info("Payment webhook received", {
      eventType: event.type,
      customerId: event.data.customer_id,
      subscriptionId: event.data.id
    });

    if (event.type === "subscription_payment_success") {
      // Update user subscription in database
      await updateUserSubscription(event.data.customer_id, "active");
      
      logger.info("Subscription activated", {
        customerId: event.data.customer_id,
        timestamp: new Date().toISOString()
      });
    } else if (event.type === "subscription_payment_failed") {
      logger.warn("Payment failed", {
        customerId: event.data.customer_id,
        reason: event.data.fail_reason
      });

      // Alert about payment failure
      Sentry.captureMessage("Payment processing failed", "warning", {
        tags: {
          feature: "payments",
          severity: "medium"
        },
        contexts: {
          payment: {
            customerId: event.data.customer_id,
            failReason: event.data.fail_reason
          }
        }
      });
    }

    return { success: true };
  } catch (error) {
    logger.error("Webhook processing failed", {
      error: error.message,
      eventType: event.type
    });

    Sentry.captureException(error, {
      tags: {
        feature: "payment-webhook",
        severity: "critical"
      }
    });

    throw error;
  }
}
```

### 2.3 Job Tracker Operations

```javascript
async function addJobToTracker(userId, jobData) {
  try {
    const job = await db.jobs.create({
      userId,
      role: jobData.role,
      status: jobData.status,
      score: jobData.score,
      createdAt: new Date()
    });

    logger.info("Job added to tracker", {
      jobId: job.id,
      userId,
      role: jobData.role
    });

    return job;
  } catch (error) {
    logger.error("Failed to add job", {
      error: error.message,
      userId,
      jobData
    });

    Sentry.captureException(error, {
      tags: {
        feature: "job-tracker",
        severity: "medium"
      },
      contexts: {
        jobData: {
          role: jobData.role,
          status: jobData.status
        }
      }
    });

    throw error;
  }
}
```

---

## 3. FRONTEND ERROR BOUNDARIES

### 3.1 React Error Boundary (app.html)

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error("Error caught by boundary:", error, errorInfo);

    // Report to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack
        }
      },
      tags: {
        errorBoundary: true
      }
    });

    // Log to backend for analysis
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "error",
        source: "error-boundary",
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(err => console.error("Failed to log error:", err));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Something went wrong</h2>
          <p>We've been notified of the issue. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007AFF",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap main app
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
```

### 3.2 Global Error Handler

```javascript
// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", event => {
  logger.error("Unhandled promise rejection", {
    error: event.reason?.message || event.reason,
    promise: event.promise
  });

  Sentry.captureException(event.reason, {
    tags: {
      type: "unhandledPromiseRejection"
    }
  });
});

// Handle runtime errors
window.addEventListener("error", event => {
  logger.error("Runtime error", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });

  Sentry.captureException(event.error, {
    tags: {
      type: "runtimeError"
    },
    contexts: {
      location: {
        filename: event.filename,
        line: event.lineno,
        column: event.colno
      }
    }
  });
});
```

---

## 4. LOGGING BEST PRACTICES

### 4.1 Logging Levels

```javascript
// Use appropriate log levels
logger.debug("Variable value", { userId, data }); // Development only
logger.info("User action completed", { action, userId }); // Normal operations
logger.warn("Rate limit approaching", { remaining: 5 }); // Potential issues
logger.error("Failed to save data", { error, userId }); // Failed operations
logger.fatal("Database connection lost", { error }); // Critical failures
```

### 4.2 Structured Logging Format

```javascript
// GOOD - Structured with context
logger.info("Resume analysis completed", {
  analysisId: "uuid-here",
  duration: 1250,
  matchScore: 85,
  keywordsMatched: 14,
  userId: "user-id",
  timestamp: new Date().toISOString()
});

// BAD - Unstructured string
logger.info("Analysis done with 85% score");
```

### 4.3 Sensitive Data Handling

```javascript
// NEVER log sensitive data
logger.info("Payment processed", {
  // ❌ BAD - logs credit card info
  // creditCard: "1234-5678-9012-3456",
  
  // ✅ GOOD - mask sensitive data
  creditCardLast4: "3456",
  paymentMethod: "card",
  amount: 19.00
});

// ❌ BAD - logs full resume
logger.info("Resume uploaded", { 
  // resume: userResume 
  
  // ✅ GOOD - only metadata
  resumeSize: 2048,
  fileType: "pdf",
  pages: 1
});
```

---

## 5. MONITORING DASHBOARD SETUP

### 5.1 Sentry Dashboard Alerts

Configure alerts in Sentry for:

1. **Critical Errors**
   - Resume analysis failures (spike > 5% error rate)
   - Payment webhook failures
   - Database connection errors
   - Claude API rate limiting

2. **Alert Actions**
   - Email notification immediately
   - Slack notification to #lvrge-alerts
   - Daily digest of errors

### 5.2 Key Metrics to Monitor

```javascript
// Metrics to track
{
  "resume_analysis": {
    "total_requests": 1250,
    "successful": 1200,
    "failed": 50,
    "error_rate": "4%",
    "avg_duration_ms": 1500
  },
  "payments": {
    "total_transactions": 45,
    "successful": 43,
    "failed": 2,
    "failure_rate": "4.4%"
  },
  "api_errors": {
    "4xx_errors": 12,
    "5xx_errors": 2,
    "authentication_errors": 1
  },
  "performance": {
    "frontend_load_time_ms": 2100,
    "api_response_time_ms": 850,
    "database_query_time_ms": 45
  }
}
```

---

## 6. ENVIRONMENT VARIABLES

Add to `.env.production`:

```bash
# Sentry
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
SENTRY_ENVIRONMENT=production

# Claude API
CLAUDE_API_KEY=sk-ant-...
CLAUDE_API_LOG_LEVEL=warn

# Database
DATABASE_LOG_LEVEL=error

# App
LOG_LEVEL=info
ENABLE_ERROR_REPORTING=true
```

---

## 7. ERROR RESPONSE TEMPLATES

### 7.1 User-Friendly Error Messages

```javascript
// Return helpful error messages to users
const errorMessages = {
  ANALYSIS_FAILED: "Unable to analyze resume. Please try again.",
  UPLOAD_FAILED: "File upload failed. Please check file size (max 10MB).",
  PAYMENT_FAILED: "Payment processing failed. Your card may be declined.",
  RATE_LIMITED: "Too many requests. Please wait a few minutes.",
  SERVICE_ERROR: "Service temporarily unavailable. Please try again soon.",
  UNAUTHORIZED: "Please log in to continue.",
  VALIDATION_ERROR: "Please check your input and try again."
};

// Send to frontend with technical logging
app.post("/api/analyze", async (req, res) => {
  try {
    // ... analysis code
  } catch (error) {
    // Log technical details
    logger.error("Analysis failed", {
      error: error.message,
      stack: error.stack,
      userId: req.user.id
    });

    // Send user-friendly message
    res.status(500).json({
      success: false,
      message: errorMessages.ANALYSIS_FAILED,
      errorId: generateErrorId() // For support reference
    });
  }
});
```

### 7.2 Error ID Reference

```javascript
function generateErrorId() {
  // Format: ERR-TIMESTAMP-RANDOM
  return `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Users can reference error IDs in support tickets
// Support team can find exact error in logs using error ID
```

---

## 8. TESTING ERROR HANDLING

### 8.1 Test Error Scenarios

Before launch, manually test:

```javascript
// Test resume analysis error
const testAnalysisError = async () => {
  try {
    await analyzeResume(
      "Invalid job description that's way too short",
      "Invalid resume"
    );
  } catch (error) {
    console.log("Error properly caught and logged");
  }
};

// Test payment webhook error
const testPaymentError = async () => {
  const event = {
    type: "subscription_payment_failed",
    data: {
      customer_id: "test-customer",
      fail_reason: "card_declined"
    }
  };
  await handlePaymentWebhook(event);
};

// Test rate limiting
const testRateLimit = async () => {
  // Make multiple requests rapidly
  for (let i = 0; i < 100; i++) {
    await analyzeResume(jobDesc, resume);
  }
};
```

### 8.2 Load Testing with Error Monitoring

Use Apache Bench or similar:

```bash
# Test with 1000 requests, 10 concurrent
ab -n 1000 -c 10 https://leverageapp.co/api/analyze

# Monitor Sentry during test for errors
# Check response times and error rates
```

---

## 9. POST-LAUNCH MONITORING

### 9.1 Daily Checklist

```
□ Check Sentry dashboard for new errors
□ Review error logs for patterns
□ Check Claude API error rate and latency
□ Verify payment webhook success rate (>99%)
□ Monitor frontend performance metrics
□ Check database query performance
□ Review user-reported issues
```

### 9.2 Weekly Review

```
□ Analyze error trends
□ Update error handling based on patterns
□ Review performance bottlenecks
□ Check for security-related errors
□ Plan improvements based on data
```

---

## 10. CRITICAL ALERTS - IMMEDIATE ACTION REQUIRED

These should trigger immediate notifications:

1. **Payment Processing Down** (>50% failure rate)
   - Action: Check LemonSqueezy status, verify webhook
   - Impact: Revenue loss

2. **Claude API Down** (>90% errors)
   - Action: Check API status, verify credentials
   - Impact: Core functionality broken

3. **Database Connection Lost** (any occurrence)
   - Action: Check database, verify connection string
   - Impact: Complete app failure

4. **Authentication Errors Spike** (>10x normal)
   - Action: Check for attacks, verify auth system
   - Impact: Users locked out

5. **Frontend Errors Spike** (>20% of sessions)
   - Action: Check recent deployments, browser console
   - Impact: User experience degradation

---

## Summary

This setup provides:
- ✅ Real-time error tracking (Sentry)
- ✅ Structured logging for analysis
- ✅ Performance monitoring
- ✅ Payment-specific error handling
- ✅ Claude API monitoring
- ✅ User-friendly error messages
- ✅ Error alerting system
- ✅ Debugging capabilities

All critical systems have monitoring before launch.
