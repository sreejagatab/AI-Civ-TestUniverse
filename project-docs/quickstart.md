# Quick Start Guide

Get your first security and quality report in under 5 minutes.

## Prerequisites

- Docker installed and running
- A target URL to test (your staging environment)

## 1. Run Your First Scan (30 seconds)

### Web Application

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-staging-app.com \
  --output /reports
```

### API

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-api \
  --target https://api.your-app.com \
  --output /reports
```

### Security-Focused

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-security \
  --target https://your-app.com \
  --output /reports
```

## 2. View Results (1 minute)

After the scan completes, you'll find reports in the `./reports` directory:

```
reports/
├── report.html          # Human-readable report (open in browser)
├── results.sarif        # For GitHub Security Tab
├── results.json         # Programmatic access
└── junit.xml            # CI/CD test results
```

**Open `report.html` in your browser** for a visual summary.

## 3. Understanding the Output

### Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All checks passed |
| `1`  | Findings exceed quality gate |
| `2`  | Critical security issues found |
| `3`  | Configuration error |

### Sample Console Output

```
============================================================
  AI-Civ TestUniverse v1.0.0
  Target: https://your-app.com
  Pack: mvp-webapp
============================================================

[1/5] Running: Target Reconnaissance.............. DONE (12s)
[2/5] Running: Google Lighthouse.................. DONE (45s)
[3/5] Running: Axe Accessibility.................. DONE (18s)
[4/5] Running: OWASP ZAP Baseline................. DONE (180s)
[5/5] Running: Security Headers Check............. DONE (5s)

============================================================
  SUMMARY
============================================================

  Total Findings: 23
  ├── Critical:  0
  ├── High:      2
  ├── Medium:    8
  └── Low:       13

  Lighthouse Scores:
  ├── Performance:    78/100
  ├── Accessibility:  92/100
  ├── Best Practices: 85/100
  └── SEO:            90/100

  Quality Gate: PASSED

============================================================
  Reports saved to: ./reports/
============================================================
```

### Sample Finding (JSON)

```json
{
  "finding_id": "zap-10202-1",
  "title": "Absence of Anti-CSRF Tokens",
  "severity": "medium",
  "description": "No Anti-CSRF tokens were found in a HTML submission form.",
  "location": {
    "url": "https://your-app.com/login",
    "method": "POST"
  },
  "tool": {
    "name": "OWASP ZAP",
    "version": "2.14.0"
  },
  "remediation": {
    "description": "Implement anti-CSRF tokens in all forms",
    "reference": "https://owasp.org/www-community/attacks/csrf"
  },
  "cwe": "CWE-352"
}
```

## 4. Common Options

### Set a Custom Timeout

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-app.com \
  --timeout 1800 \  # 30 minutes
  --output /reports
```

### Scan with Authentication

```bash
docker run --rm -v $(pwd)/reports:/reports \
  -e AUTH_TOKEN="your-bearer-token" \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-api \
  --target https://api.your-app.com \
  --auth bearer \
  --output /reports
```

### Scan Specific Pages Only

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-app.com \
  --include "/login,/dashboard,/profile" \
  --output /reports
```

### Skip Specific Tools

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-app.com \
  --skip lighthouse \
  --output /reports
```

### Verbose Output

```bash
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-app.com \
  --verbose \
  --output /reports
```

## 5. Next Steps

### Add to CI/CD

See [CI Setup Guide](./ci-setup.md) for GitHub Actions, GitLab CI, and more.

### Customize Quality Gates

Create a custom config file:

```yaml
# testuniverse.yaml
quality_gate:
  thresholds:
    critical: 0
    high: 0      # Fail on any high findings
    medium: 5
```

Then run with:

```bash
docker run --rm \
  -v $(pwd)/reports:/reports \
  -v $(pwd)/testuniverse.yaml:/config/testuniverse.yaml \
  ghcr.io/ai-civ/testuniverse:latest \
  --config /config/testuniverse.yaml \
  --pack mvp-webapp \
  --target https://your-app.com \
  --output /reports
```

### Scan Source Code

```bash
docker run --rm \
  -v $(pwd)/reports:/reports \
  -v $(pwd)/src:/src:ro \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-security \
  --target https://your-app.com \
  --source /src \
  --output /reports
```

## Troubleshooting

### Docker Permission Denied

```bash
# Linux/Mac: Run with current user
docker run --rm -u $(id -u):$(id -g) -v $(pwd)/reports:/reports ...

# Or fix permissions after
sudo chown -R $(whoami) ./reports
```

### Network Issues

```bash
# If target is on localhost
docker run --rm --network host -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target http://localhost:3000 \
  --output /reports
```

### Out of Memory

```bash
# Increase Docker memory
docker run --rm -m 4g -v $(pwd)/reports:/reports ...
```

### SSL Certificate Errors

```bash
# For self-signed certificates (development only)
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-app.com \
  --insecure \
  --output /reports
```

## Getting Help

- **Documentation**: [Full Docs](https://github.com/sreejagatab/AI-Civilization/docs)
- **Issues**: [GitHub Issues](https://github.com/sreejagatab/AI-Civilization/issues)
- **Examples**: [Example Configurations](https://github.com/sreejagatab/AI-Civilization/examples)

---

**Time to first report: ~5 minutes** (including Docker pull)
