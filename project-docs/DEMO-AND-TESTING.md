# Demo Targets & Testing Guide

This document provides a comprehensive guide to TestUniverse's demo targets and testing infrastructure.

## Table of Contents

- [Overview](#overview)
- [Demo Targets](#demo-targets)
  - [1. Vulnerable Webapp](#1-vulnerable-webapp-port-3001)
  - [2. Marketing Site](#2-marketing-site-port-3002)
  - [3. OpenAPI REST API](#3-openapi-rest-api-port-3003)
  - [4. GraphQL API](#4-graphql-api-port-3004)
  - [5. Auth-Protected App](#5-auth-protected-app-port-3005)
- [Running Demo Targets](#running-demo-targets)
- [Test Suite](#test-suite)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [E2E Tests](#e2e-tests)
- [Test Results Summary](#test-results-summary)
- [CI/CD Integration](#cicd-integration)

---

## Overview

TestUniverse includes a comprehensive testing infrastructure with:

1. **5 Demo Target Applications** - Intentionally vulnerable/problematic apps for E2E testing
2. **Unit Tests** - Test individual components in isolation
3. **Integration Tests** - Test component interactions
4. **E2E Tests** - Full pipeline tests against demo targets

```
┌─────────────────────────────────────────────────────────────────┐
│                     Testing Architecture                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │ Unit Tests  │   │ Integration │   │  E2E Tests  │          │
│  │   (fast)    │   │   Tests     │   │  (docker)   │          │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘          │
│         │                 │                 │                  │
│         ▼                 ▼                 ▼                  │
│  ┌─────────────────────────────────────────────────┐          │
│  │              pytest Framework                     │          │
│  └─────────────────────────────────────────────────┘          │
│                           │                                    │
│                           ▼                                    │
│  ┌─────────────────────────────────────────────────┐          │
│  │              Demo Targets (Docker)               │          │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │          │
│  │  │3001 │ │3002 │ │3003 │ │3004 │ │3005 │       │          │
│  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘       │          │
│  └─────────────────────────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo Targets

All demo targets are containerized with Docker and orchestrated via Docker Compose.

### Quick Start

```bash
# Start all demo targets
cd demo-targets
docker-compose up -d

# Verify health
for port in 3001 3002 3003 3004 3005; do
  curl -s http://localhost:$port/health | jq '.status'
done

# Stop all targets
docker-compose down
```

---

### 1. Vulnerable Webapp (Port 3001)

**Purpose:** Security testing with intentional vulnerabilities

**URL:** http://localhost:3001

#### Expected Findings (15-20)

| Finding | Severity | CWE | Description |
|---------|----------|-----|-------------|
| SQL Injection | CRITICAL | CWE-89 | Login and search endpoints vulnerable |
| Reflected XSS | HIGH | CWE-79 | Search query echoed without sanitization |
| Stored XSS | HIGH | CWE-79 | Comments rendered without escaping |
| Path Traversal | CRITICAL | CWE-22 | /download endpoint allows directory traversal |
| Information Disclosure | HIGH | CWE-200 | /api/debug exposes credentials |
| Exposed Passwords | CRITICAL | CWE-312 | /api/users returns passwords |
| Hardcoded Secrets | CRITICAL | CWE-798 | API keys in source code |
| Missing CSP | HIGH | - | No Content Security Policy |
| Missing HSTS | MEDIUM | - | No HTTP Strict Transport Security |
| Missing X-Frame-Options | MEDIUM | CWE-1021 | Clickjacking possible |
| Insecure Cookies | HIGH | CWE-614 | Session cookies without HttpOnly/Secure |
| CORS Misconfiguration | HIGH | CWE-942 | Wildcard Access-Control-Allow-Origin |
| Missing CSRF Protection | MEDIUM | CWE-352 | Forms lack CSRF tokens |

#### Test Commands

```bash
# SQL Injection
curl "http://localhost:3001/search?q=' OR '1'='1"

# XSS
curl "http://localhost:3001/search?q=<script>alert(1)</script>"

# Path Traversal
curl "http://localhost:3001/download?file=../../../etc/passwd"

# Information Disclosure
curl http://localhost:3001/api/debug
curl http://localhost:3001/api/users
```

---

### 2. Marketing Site (Port 3002)

**Purpose:** Performance, SEO, and accessibility testing

**URL:** http://localhost:3002

#### Expected Findings (10-15)

##### Performance Issues

| Finding | Severity | Description |
|---------|----------|-------------|
| Poor LCP | HIGH | Large unoptimized hero image (>4s) |
| Render-blocking Resources | HIGH | Multiple blocking CSS/JS in head |
| Large JavaScript | MEDIUM | Unused libraries (jQuery, Lodash, Moment.js) |
| No Lazy Loading | MEDIUM | Large images loaded immediately |
| Slow TTFB | MEDIUM | Artificial 2s server delay |

##### SEO Issues

| Finding | Severity | Description |
|---------|----------|-------------|
| Missing Meta Description | MEDIUM | No description meta tag |
| Short Title | LOW | Title too short, no brand |
| Multiple H1 Tags | MEDIUM | More than one H1 on page |
| Heading Hierarchy | MEDIUM | Skipping heading levels |

##### Accessibility Issues

| Finding | Severity | WCAG | Description |
|---------|----------|------|-------------|
| Low Contrast Text | HIGH | 1.4.3 | Text fails WCAG AA (4.5:1) |
| Missing Alt Text | HIGH | 1.1.1 | Images without alt attributes |
| Missing Form Labels | HIGH | 1.3.1 | Inputs without associated labels |
| Focus Styles Removed | HIGH | 2.4.7 | outline: none on all elements |
| No Skip Link | MEDIUM | 2.4.1 | No way to skip navigation |

---

### 3. OpenAPI REST API (Port 3003)

**Purpose:** API contract testing with schema violations

**URLs:**
- API: http://localhost:3003/api
- Docs: http://localhost:3003/docs
- Spec: http://localhost:3003/openapi.json

#### Expected Findings (5-10)

| Finding | Severity | Description |
|---------|----------|-------------|
| Type Mismatch | HIGH | `price` is string instead of number |
| Missing Required Field | HIGH | `stock` field missing from products |
| Invalid Enum Value | MEDIUM | category "gadgets" not in enum |
| Wrong Date Format | MEDIUM | Date as "15/01/2024" instead of ISO |
| Extra Undocumented Fields | LOW | `internalCode`, `supplierPrice` in response |
| Null Where Not Allowed | MEDIUM | null name where string required |
| Wrong Status Code | MEDIUM | POST returns 200 instead of 201 |
| Wrong Response Structure | HIGH | products as object instead of array |

#### Test Commands

```bash
# Get OpenAPI spec
curl http://localhost:3003/openapi.json | jq

# Test endpoints with violations
curl http://localhost:3003/api/products | jq
curl http://localhost:3003/api/products/1 | jq

# Rate limit test (10 req/min)
for i in {1..15}; do curl -s http://localhost:3003/api/products > /dev/null && echo "Request $i"; done
```

---

### 4. GraphQL API (Port 3004)

**Purpose:** GraphQL security testing

**URLs:**
- Endpoint: http://localhost:3004/graphql
- Playground: http://localhost:3004/graphql (GraphiQL)

#### Expected Findings (5-8)

| Finding | Severity | Description |
|---------|----------|-------------|
| Introspection Enabled | MEDIUM | Full schema queryable in production |
| No Query Depth Limit | HIGH | Infinite nesting possible (DoS) |
| Sensitive Data Exposed | CRITICAL | Passwords, API keys, SSN in User type |
| No Rate Limiting | MEDIUM | Unlimited mutation calls |
| Stack Traces Exposed | MEDIUM | Error responses include stack traces |
| Missing Authentication | HIGH | Sensitive queries without auth |
| Deprecated Fields | LOW | Deprecated fields without alternatives |

#### Test Commands

```bash
# Introspection query
curl -X POST http://localhost:3004/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name } } }"}'

# Deep nesting (DoS)
curl -X POST http://localhost:3004/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { posts { author { posts { author { username } } } } } }"}'

# Sensitive data exposure
curl -X POST http://localhost:3004/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { username password apiKey ssn } }"}'
```

---

### 5. Auth-Protected App (Port 3005)

**Purpose:** Testing authenticated scanning

**URL:** http://localhost:3005

#### Credentials

| User | Username | Password | Role |
|------|----------|----------|------|
| Demo User | testuser | testpass123 | user |
| Admin | admin | adminpass123 | admin |

#### Authentication Methods

1. **Session-based:** Login via form at `/login`
2. **JWT-based:** POST to `/api/auth/login`, use Bearer token

#### Test Scenarios

##### Without Credentials (AUTH_BLOCKED)
```bash
curl http://localhost:3005/dashboard   # Returns 401
curl http://localhost:3005/api/me      # Returns 401
```
**Expected:** Exit code 2 (AUTH_BLOCKED)

##### With JWT Credentials
```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:3005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}' | jq -r '.token')

# Access protected endpoints
curl -H "Authorization: Bearer $TOKEN" http://localhost:3005/api/me
curl -H "Authorization: Bearer $TOKEN" http://localhost:3005/api/data
```
**Expected:** Exit code 0 or 1

#### Protected Routes

| Route | Auth Required | Admin Required |
|-------|---------------|----------------|
| `/dashboard` | Yes (Session) | No |
| `/profile` | Yes (Session) | No |
| `/admin` | Yes (Session) | Yes |
| `/api/me` | Yes (JWT) | No |
| `/api/data` | Yes (JWT) | No |
| `/api/admin/users` | Yes (JWT) | Yes |

---

## Running Demo Targets

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- 4GB RAM minimum

### Commands

```bash
# Navigate to demo-targets directory
cd demo-targets

# Build all images
docker-compose build

# Start all targets (foreground)
docker-compose up

# Start all targets (background)
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f vulnerable-webapp

# Stop all targets
docker-compose down

# Clean up everything
docker-compose down -v --rmi local
```

### Health Checks

```bash
# Check all health endpoints
for port in 3001 3002 3003 3004 3005; do
  echo -n "Port $port: "
  curl -sf http://localhost:$port/health | jq -r '.status' || echo "FAILED"
done
```

Expected output:
```
Port 3001: healthy
Port 3002: healthy
Port 3003: healthy
Port 3004: healthy
Port 3005: healthy
```

---

## Test Suite

### Directory Structure

```
tests/
├── __init__.py
├── conftest.py              # Shared fixtures
├── test_core.py             # Core framework tests
├── test_agents.py           # Agent tests
├── test_integration.py      # Integration tests
├── test_models.py           # Data model tests
│
├── unit/                    # Unit tests
│   ├── test_models.py
│   └── test_quality_gate.py
│
├── integration/             # Integration tests
│   ├── test_attack_gating.py
│   ├── test_secrets_redaction.py
│   ├── test_scope_enforcement.py
│   └── test_exit_codes.py
│
├── agents/                  # Agent-specific tests
│   └── test_governor.py
│
├── plugins/                 # Plugin tests
│   └── test_lighthouse.py
│
└── e2e/                     # End-to-end tests
    ├── conftest.py          # E2E fixtures
    ├── pytest.ini           # E2E config
    ├── requirements.txt
    ├── test_full_pipeline.py
    ├── test_scope_enforcement.py
    ├── test_ci_gates.py
    ├── test_golden_baseline.py
    └── test_report_artifacts.py
```

### Running Tests

#### All Unit/Integration Tests (No Docker)

```bash
# Run all tests except E2E
pytest tests/ --ignore=tests/e2e -v

# Run with coverage
pytest tests/ --ignore=tests/e2e --cov=kernel --cov-report=html

# Run specific test file
pytest tests/test_agents.py -v

# Run specific test class
pytest tests/test_agents.py::TestGovernorAgent -v

# Run tests matching pattern
pytest tests/ -k "governor" -v
```

#### E2E Tests (Requires Docker)

```bash
# Using the runner script (recommended)
./scripts/run-e2e-tests.sh

# Or manually
cd demo-targets && docker-compose up -d
pytest tests/e2e/ -v --timeout=600

# Skip docker management if targets already running
E2E_SKIP_DOCKER=1 pytest tests/e2e/ -v
```

#### Quick Test (CI Mode)

```bash
# Fast tests only
pytest tests/ --ignore=tests/e2e -m "not slow" -q
```

---

## Test Results Summary

### Latest Test Run

```
========================= test session summary =========================
tests collected: 271
passed: 223
failed: 3
skipped: 45
warnings: 4677 (mostly datetime.utcnow deprecation)
duration: ~62 seconds
```

### Test Categories

| Category | Count | Status |
|----------|-------|--------|
| Core Tests | 25 | ✅ All passing |
| Agent Tests | 60 | ✅ All passing |
| Model Tests | 37 | ✅ All passing |
| Integration Tests | 45 | ⚠️ 3 failures |
| Plugin Tests | 12 | ⚠️ 2 failures |
| E2E Tests | 70+ | 🔄 Requires Docker |

### Known Issues

1. **test_evidence_contains_no_secrets** - Redaction not applied in test fixture
2. **test_map_audit_to_severity** - Severity mapping assertion mismatch
3. **test_extract_evidence** - Missing audit key in test data

---

## CI/CD Integration

### GitHub Actions Workflows

#### 1. Unit Tests (On every push)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -e ".[dev,test]"
      - run: pytest tests/ --ignore=tests/e2e -v
```

#### 2. E2E Nightly Tests

```yaml
# .github/workflows/e2e-nightly.yml
name: E2E Nightly
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC daily
  workflow_dispatch:

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Start demo targets
        run: cd demo-targets && docker-compose up -d
      - name: Run E2E tests
        run: pytest tests/e2e/ -v --timeout=600
```

### Exit Codes

| Code | Meaning | CI Action |
|------|---------|-----------|
| 0 | All tests passed, gate passed | ✅ Success |
| 1 | Tests passed, gate failed (findings) | ❌ Fail build |
| 2 | Authentication blocked | ⚠️ Config error |
| 3 | Internal error | ❌ Fail build |
| 4 | Timeout | ⚠️ Investigate |
| 5 | Target unreachable | ⚠️ Config error |

### Quality Gates

Configure in `aiciv.yaml`:

```yaml
quality_gate:
  max_critical: 0      # Fail on any critical
  max_high: 5          # Allow up to 5 high
  max_medium: 20       # Allow up to 20 medium
  block_cwe:
    - CWE-89           # SQL Injection
    - CWE-79           # XSS
```

---

## Troubleshooting

### Docker Issues

```bash
# Container won't start
docker-compose logs <service-name>
docker-compose build --no-cache <service-name>

# Port already in use
lsof -i :3001  # Find process
# Or use different ports
PORT_VULNERABLE=3101 docker-compose up

# Health check failing
docker inspect --format='{{.State.Health.Status}}' demo-vulnerable-webapp
```

### Test Issues

```bash
# Import errors
pip install -e ".[dev,test]"

# Timeout issues
pytest tests/e2e/ --timeout=900

# Verbose debugging
pytest tests/ -v --tb=long -s
```

---

## See Also

- [README.md](../README.md) - Main project documentation
- [demo-targets/README.md](../demo-targets/README.md) - Demo targets documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [SECURITY.md](./SECURITY.md) - Security considerations
