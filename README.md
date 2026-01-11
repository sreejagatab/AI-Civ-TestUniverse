# AI-Civ-TestUniverse

<p align="center">
  <strong>Constitutional AI Multi-Agent Testing Framework</strong>
</p>

<p align="center">
  <em>A 10-agent orchestration system for intelligent, governed, and evidence-based software testing</em>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#agents">Agents</a> •
  <a href="#plugins">Plugins</a> •
  <a href="#mvp-packs">MVP Packs</a> •
  <a href="#deployment">Deployment</a> •
  <a href="ACHIEVE.md"><strong>What Can It Achieve?</strong></a>
</p>

---
<img width="1536" height="1024" alt="20260111_1635_Image Generation_simple_compose_01kepygbqnfkfvn6em4n8k3bdw" src="https://github.com/user-attachments/assets/09d337be-00e6-46d3-83db-e056dfa4d51b" />

---

## Core Philosophy

> **"Coverage is a lie; Confidence is the product."**

AI-Civ-TestUniverse is a Constitutional AI framework that orchestrates automated testing with:
- **10 Specialized Agents** with defined roles, boundaries, and permissions
- **14+ Testing Plugins** covering security, performance, accessibility, mobile, desktop, infrastructure, and more
- **Evidence-Based Findings** where every claim requires proof
- **Governed Execution** with mandatory authorization and scope enforcement
- **3 MVP Packs** for quick deployment (webapp, API, security)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
  - [System Architecture](#system-architecture)
  - [Agent Hierarchy](#agent-hierarchy)
  - [Execution Pipeline](#execution-pipeline)
- [The 10 Agents](#the-10-agents)
- [Plugins](#plugins)
- [MVP Packs](#mvp-packs)
- [CI/CD Integration](#cicd-integration)
- [Data Models](#data-models)
- [Quick Start](#quick-start)
- [CLI Reference](#cli-reference)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Testing Strategy](#testing-strategy)
- [Demo Targets](#demo-targets)
- [Security Features](#security-features)
- [Comparisons](#comparisons)
- [Troubleshooting](#troubleshooting)
- [Full Capabilities Guide](ACHIEVE.md)

---

## Overview

### What Is TestUniverse?

TestUniverse is a fork of the [AI Civilization](https://github.com/sreejagatab/AI-Civilization) constitutional framework, specialized for universal software testing. It leverages 10 AI agents working in concert to:

1. **Analyze targets** through reconnaissance and fingerprinting
2. **Plan tests** based on target characteristics and risk
3. **Execute plugins** in isolated containers with resource limits
4. **Normalize findings** to a universal schema with evidence
5. **Report results** with actionable remediation guidance

### Key Features

| Feature | Description |
|---------|-------------|
| **Universal Test Orchestration** | Plugin-driven kernel supporting any test tool |
| **Intelligent Test Selection** | Risk-based planning that chooses optimal tests |
| **Evidence-Based Findings** | Every claim backed by reproducible steps |
| **Governed Safety** | Strict scope, authorization, and rate limits |
| **Constitutional AI** | 10 agents with immutable boundaries |
| **Noise Elimination** | Deduplication, severity scoring, flakiness control |

### Test Family Coverage

| Family | Description | Plugins |
|--------|-------------|---------|
| **Functional** | User journeys, forms, navigation | Playwright |
| **API** | Contract tests, AuthZ, data integrity | Newman, OpenAPI, GraphQL |
| **Security** | SAST, DAST, secrets, dependencies | ZAP, Security plugin |
| **Performance** | Web vitals, load testing | Lighthouse, k6 |
| **Accessibility** | WCAG compliance, ARIA | Axe, Lighthouse |
| **Best Practices** | Code quality, SEO | Lighthouse |
| **Reconnaissance** | Fingerprinting, discovery | Recon plugin |
| **Mobile** | iOS/Android, native/hybrid apps | Appium, Device Farm |
| **Desktop** | Windows/macOS/Linux applications | PyAutoGUI, Accessibility |
| **CLI** | Command-line tools, interactive shells | Subprocess, PTY |
| **Infrastructure** | Containers, IaC, Kubernetes, cloud | Trivy, Checkov, kube-bench |
| **Observability** | SLO monitoring, chaos testing, logs | Synthetic, SLO, Chaos-lite |

---

## Architecture

### System Architecture

```mermaid
graph TB
    subgraph External["External Interfaces"]
        CLI[CLI]
        API[REST API]
        CI[CI/CD Systems]
    end

    subgraph Agents["Constitutional AI Agents"]
        Architect[Architect<br/>Purpose & Values]
        Governor[Governor<br/>Law & Ethics]
        Planner[Planner<br/>Strategy]
        Builder[Builder<br/>Implementation]
        Operator[Operator<br/>Execution]
        Scholar[Scholar<br/>Memory]
        Scientist[Scientist<br/>Discovery]
        Economist[Economist<br/>Resources]
        Diplomat[Diplomat<br/>Communication]
        Sentinel[Sentinel<br/>Monitoring]
    end

    subgraph Core["Kernel Core"]
        MessageBus[Message Bus]
        Engine[Execution Engine]
        Registry[Plugin Registry]
        Sandbox[Docker Sandbox]
    end

    subgraph Plugins["Test Plugins (14+)"]
        Lighthouse[Lighthouse]
        ZAP[OWASP ZAP]
        Axe[Axe-core]
        K6[k6]
        Recon[Recon]
        Security[Security]
        APIPlugin[API Testing]
        Mobile[Mobile]
        Desktop[Desktop]
        CLI[CLI]
        Infra[Infrastructure]
        Observability[Observability]
    end

    subgraph Storage["Storage"]
        Reports[(Reports)]
        Evidence[(Evidence)]
        Memory[(Scholar Memory)]
        AuditLog[(Audit Log)]
    end

    CLI --> Diplomat
    API --> Diplomat
    CI --> Diplomat

    Diplomat --> MessageBus
    MessageBus --> Architect
    MessageBus --> Governor
    MessageBus --> Planner
    MessageBus --> Builder
    MessageBus --> Operator
    MessageBus --> Scholar
    MessageBus --> Scientist
    MessageBus --> Economist
    MessageBus --> Sentinel

    Planner --> Engine
    Operator --> Engine
    Engine --> Registry
    Engine --> Sandbox

    Sandbox --> Lighthouse
    Sandbox --> ZAP
    Sandbox --> Axe
    Sandbox --> K6
    Sandbox --> Recon
    Sandbox --> Security
    Sandbox --> APIPlugin
    Sandbox --> Mobile
    Sandbox --> Desktop
    Sandbox --> CLI
    Sandbox --> Infra
    Sandbox --> Observability

    Scholar --> Memory
    Diplomat --> Reports
    Engine --> Evidence
    Governor --> AuditLog
```

### Agent Hierarchy

```mermaid
graph TD
    subgraph "Authority Levels"
        A1[Level 1: Purpose]
        A2[Level 2: Governance]
        A3[Level 3: Planning]
        A4[Level 4: Execution]
        A5[Level 5: Support]
    end

    Architect["🏛️ Architect<br/>Defines Purpose"]
    Governor["⚖️ Governor<br/>Enforces Rules"]
    Planner["📋 Planner<br/>Creates Plans"]
    Builder["🔧 Builder<br/>Implements"]
    Operator["⚙️ Operator<br/>Executes"]
    Scholar["📚 Scholar<br/>Remembers"]
    Scientist["🔬 Scientist<br/>Experiments"]
    Economist["💰 Economist<br/>Allocates"]
    Diplomat["🌐 Diplomat<br/>Communicates"]
    Sentinel["🛡️ Sentinel<br/>Monitors"]

    A1 --> Architect
    A2 --> Governor
    A3 --> Planner
    A4 --> Builder
    A4 --> Operator
    A5 --> Scholar
    A5 --> Scientist
    A5 --> Economist
    A5 --> Diplomat
    A5 --> Sentinel

    Architect -->|"defines values"| Governor
    Governor -->|"approves"| Planner
    Planner -->|"assigns tasks"| Operator
    Planner -->|"requests build"| Builder
    Operator -->|"reports"| Diplomat
    Operator -->|"logs"| Scholar
    Economist -->|"budgets"| Operator
    Sentinel -->|"monitors"| Operator
    Sentinel -->|"can halt"| Governor
```

### Execution Pipeline

```mermaid
flowchart LR
    subgraph Phase1["RECON Phase"]
        R1[Fingerprint Target]
        R2[Discover Routes]
        R3[Detect Auth]
        R4[Stack Detection]
        R1 --> R2 --> R3 --> R4
    end

    subgraph Phase2["PLANNING Phase"]
        P1[Select Families]
        P2[Choose Plugins]
        P3[Allocate Budget]
        P4[Governor Approval]
        P1 --> P2 --> P3 --> P4
    end

    subgraph Phase3["EXECUTION Phase"]
        E1[Spawn Containers]
        E2[Run Plugins]
        E3[Collect Artifacts]
        E4[Handle Retries]
        E1 --> E2 --> E3 --> E4
    end

    subgraph Phase4["NORMALIZATION Phase"]
        N1[Parse Outputs]
        N2[Create Findings]
        N3[Deduplicate]
        N4[Score Severity]
        N1 --> N2 --> N3 --> N4
    end

    subgraph Phase5["REPORTING Phase"]
        O1[Generate Reports]
        O2[Create Tickets]
        O3[Send Notifications]
        O4[PR Comments]
        O1 --> O2 --> O3 --> O4
    end

    Phase1 --> Phase2 --> Phase3 --> Phase4 --> Phase5
```

### Message Flow

```mermaid
sequenceDiagram
    participant User
    participant Diplomat
    participant Governor
    participant Planner
    participant Operator
    participant Plugin
    participant Scholar

    User->>Diplomat: Submit test request
    Diplomat->>Governor: Validate authorization
    Governor->>Governor: Check scope & policy
    Governor-->>Diplomat: Approved / Denied

    alt Approved
        Diplomat->>Planner: Create plan request
        Planner->>Planner: Analyze target
        Planner->>Governor: Submit plan for approval
        Governor-->>Planner: Plan approved
        Planner->>Operator: Execute plan

        loop For each plugin
            Operator->>Plugin: Run in sandbox
            Plugin-->>Operator: Results + artifacts
            Operator->>Scholar: Store findings
        end

        Operator->>Diplomat: Execution complete
        Diplomat->>User: Report with findings
    else Denied
        Diplomat->>User: Authorization denied
    end
```

---

## The 10 Agents

### Agent Overview

| Agent | Role | Key Capabilities | Critical Boundaries |
|-------|------|------------------|---------------------|
| **Architect** | Purpose & Values | Define quality priorities, establish values | Cannot execute, allocate resources, or self-modify |
| **Governor** | Law & Ethics | Enforce policies, issue permissions, veto actions | Has veto power, cannot change purpose |
| **Planner** | Strategy | Break goals into tasks, analyze dependencies | Cannot execute, requires Governor approval |
| **Builder** | Implementation | Build software, create fix PRs | Cannot deploy without approval |
| **Operator** | Execution | Run plugins, manage containers | Cannot alter plans or make decisions |
| **Scholar** | Memory | Store knowledge, maintain history | Read-only, cannot decide policy |
| **Scientist** | Discovery | Run experiments, propose optimizations | Sandbox-only, no production access |
| **Economist** | Resources | Track usage, allocate budgets | Cannot change purpose or veto |
| **Diplomat** | Communication | Generate reports, handle notifications | Communication only |
| **Sentinel** | Monitoring | Detect anomalies, trigger rollbacks | Can halt system in emergencies |

### Detailed Agent Documentation

#### 🏛️ Architect Agent

**Purpose:** Defines the civilization's purpose, vision, values, and world-model.

```yaml
capabilities:
  - define_purpose: Establish testing quality objectives
  - establish_values: Create value hierarchy (security vs UX vs speed)
  - create_world_model: Understand target ecosystem
  - propose_changes: Suggest architectural improvements

boundaries:
  cannot_execute: true      # No direct task execution
  cannot_allocate: true     # No resource allocation
  cannot_self_modify: true  # Cannot change own code
```

**Example Output:**
```python
Purpose(
    statement="Ensure software quality through evidence-based testing",
    values=["Security", "Reliability", "Accessibility"],
    constraints=["Never exceed scope", "Always require evidence"],
    success_criteria={"coverage": 0.8, "confidence": 0.9}
)
```

#### ⚖️ Governor Agent

**Purpose:** Enforces rules, issues permissions, and maintains audit trails.

```yaml
capabilities:
  - enforce_policies: Validate all requests against policy
  - issue_permissions: Grant/revoke agent permissions
  - veto_actions: Block unauthorized operations
  - maintain_audit: Immutable audit logging
  - resolve_conflicts: Arbitrate agent disputes

boundaries:
  has_veto_power: true       # Absolute authority to deny
  cannot_change_purpose: true # Cannot modify Architect's purpose
  cannot_execute: true       # No direct execution

authority:
  only_permission_grantor: true  # Only agent that grants permissions
  can_intercept_messages: true   # Can intercept all communications
```

**Authorization Flow:**
```mermaid
flowchart TD
    Request[Test Request] --> CheckScope{Scope Valid?}
    CheckScope -->|No| Deny[Deny: Out of Scope]
    CheckScope -->|Yes| CheckAuth{Authorization?}
    CheckAuth -->|No| Deny2[Deny: No Auth Proof]
    CheckAuth -->|Yes| CheckMode{Attack Mode?}
    CheckMode -->|Yes| RequireApproval{Explicit Approval?}
    RequireApproval -->|No| Deny3[Deny: Attack Requires Approval]
    RequireApproval -->|Yes| Approve[Approve Request]
    CheckMode -->|No| Approve
    Approve --> AuditLog[Log to Audit Trail]
```

#### 📋 Planner Agent

**Purpose:** Converts goals into executable plans with dependencies.

```yaml
capabilities:
  - decompose_goals: Break "test this" into specific tasks
  - analyze_dependencies: Build task dependency graph
  - estimate_resources: Calculate CPU, memory, time needs
  - risk_assessment: Evaluate potential issues
  - create_plans: Generate ExecutionPlan objects

boundaries:
  cannot_execute: true           # Planning only
  requires_governor_approval: true  # All plans need approval
  must_provide_reasoning: true   # Traceable decisions
```

**Plan Generation:**
```python
Plan(
    name="security-baseline-example.com",
    mode=TestMode.DEEP,
    families_enabled=[TestFamily.SECURITY, TestFamily.PERFORMANCE],
    timebox_seconds=1800,
    tasks=[
        PlanTask(family="security", plugin_id="zap-security", priority="HIGH"),
        PlanTask(family="performance", plugin_id="lighthouse-audit", priority="MEDIUM"),
    ],
    resource_budget=ResourceBudget(max_cpu_seconds=600, max_memory_mb=2048),
    approval_status="PENDING"
)
```

#### ⚙️ Operator Agent

**Purpose:** Reliable execution of assigned tasks.

```yaml
capabilities:
  - execute_tasks: Run assigned work items
  - invoke_tools: Call plugins via adapters
  - manage_containers: Docker sandbox management
  - handle_retries: Exponential backoff on failures
  - report_status: Progress and completion reporting

boundaries:
  cannot_decide_goals: true    # Executes only assigned tasks
  cannot_alter_plans: true     # No plan modifications
  requires_approval: true      # Needs Planner + Governor approval

execution_config:
  max_retries: 3
  retry_backoff: exponential
  timeout_handling: graceful_shutdown
```

#### 📚 Scholar Agent

**Purpose:** Maintains long-term memory and knowledge preservation.

```yaml
capabilities:
  - store_knowledge: Persist findings and patterns
  - retrieve_knowledge: RAG-based retrieval
  - maintain_baselines: Historical comparison data
  - track_fingerprints: Finding deduplication
  - detect_flakes: Identify flaky tests
  - manage_suppressions: False positive handling

boundaries:
  read_only_operations: true   # Cannot modify during execution
  cannot_execute: true         # No task execution
  cannot_decide_policy: true   # No policy changes

storage_backends:
  - SQLite (development)
  - PostgreSQL (production)
```

**Scholar Capabilities:**
```mermaid
flowchart LR
    subgraph Input
        Findings[New Findings]
        Historical[Historical Data]
    end

    subgraph Scholar["Scholar Processing"]
        Fingerprint[Generate Fingerprint]
        Compare[Compare to Baseline]
        Flake[Detect Flakiness]
        Suppress[Check Suppressions]
    end

    subgraph Output
        New[New Finding]
        Regression[Regression]
        FalsePos[False Positive]
        Flaky[Flaky Test]
    end

    Findings --> Fingerprint
    Historical --> Compare
    Fingerprint --> Compare
    Compare --> Flake
    Flake --> Suppress
    Suppress --> New
    Suppress --> Regression
    Suppress --> FalsePos
    Suppress --> Flaky
```

#### 💰 Economist Agent

**Purpose:** Resource allocation and optimization.

```yaml
capabilities:
  - track_usage: Monitor CPU, memory, tokens, API calls
  - allocate_resources: Distribute budgets to tasks
  - optimize_efficiency: Minimize waste
  - prevent_exhaustion: Stop before limits exceeded
  - cost_analysis: Track monetary costs

boundaries:
  cannot_change_purpose: true  # No goal modification
  no_veto_power: true          # Cannot override Governor
  resource_only: true          # Only resource operations

resource_types:
  - COMPUTE: CPU cycles
  - MEMORY: RAM allocation
  - TOKENS: LLM token budget
  - API_CALLS: External API quota
  - STORAGE: Disk space
  - BANDWIDTH: Network I/O
  - TIME: Wall clock time
```

**Budget Tracking:**
```python
ResourceBudget(
    max_cpu_seconds=3600,
    max_memory_mb=4096,
    max_requests=10000,
    max_parallel_tasks=5,
    cost_budget_usd=10.00
)

# Usage tracking
usage = {
    "cpu_seconds": 1200,
    "memory_mb_peak": 2048,
    "requests_made": 3500,
    "cost_usd": 2.50
}
```

#### 🌐 Diplomat Agent

**Purpose:** Communication with humans and external systems.

```yaml
capabilities:
  - generate_reports: HTML, JSON, Markdown, SARIF, JUnit, CSV
  - create_tickets: Jira, GitHub Issues, Linear
  - send_notifications: Slack, Teams, Discord, Email, PagerDuty
  - pr_comments: GitHub, GitLab, Bitbucket, Azure DevOps
  - explain_decisions: Human-readable reasoning

boundaries:
  communication_only: true   # No execution capability
  must_be_truthful: true     # Cannot misrepresent
```

**Report Formats:**
```mermaid
flowchart TD
    Findings[Findings Collection] --> Diplomat

    Diplomat --> HTML[HTML Report<br/>Human readable]
    Diplomat --> JSON[JSON Report<br/>Machine readable]
    Diplomat --> MD[Markdown<br/>Documentation]
    Diplomat --> SARIF[SARIF<br/>IDE integration]
    Diplomat --> JUnit[JUnit XML<br/>CI integration]
    Diplomat --> CSV[CSV Export<br/>Spreadsheet]
```

#### 🛡️ Sentinel Agent

**Purpose:** Monitoring, safety, and emergency response.

```yaml
capabilities:
  - monitor_health: Agent heartbeats and metrics
  - detect_anomalies: Statistical deviation detection
  - trigger_rollbacks: Automated recovery
  - halt_system: Emergency shutdown (UNIQUE CAPABILITY)
  - stress_testing: Load simulation
  - self_healing: Automatic recovery workflows

boundaries:
  can_halt_system: true        # Only agent with this power
  cannot_define_purpose: true  # No goal setting
  cannot_execute_plans: true   # Monitoring only

alert_levels:
  - INFO: Informational
  - WARNING: Attention needed
  - ERROR: Action required
  - CRITICAL: Immediate response
  - EMERGENCY: System halt triggered

thresholds:
  anomaly_detection: 20%  # >20% deviation triggers alert
  spike_detection: 3x     # 3x normal = spike
  consecutive_failures: 10 # Auto-abort threshold
```

**Sentinel Monitoring:**
```mermaid
flowchart TD
    subgraph Monitoring
        Metrics[Collect Metrics]
        Heartbeat[Agent Heartbeats]
        Errors[Error Tracking]
    end

    subgraph Analysis
        Threshold[Threshold Check]
        Anomaly[Anomaly Detection]
        Trend[Trend Analysis]
    end

    subgraph Response
        Alert[Generate Alert]
        Heal[Self-Healing]
        Halt[System Halt]
    end

    Metrics --> Threshold
    Heartbeat --> Threshold
    Errors --> Anomaly

    Threshold -->|Exceeded| Alert
    Anomaly -->|Detected| Alert

    Alert -->|Recoverable| Heal
    Alert -->|Critical| Halt
```

---

## Plugins

### Plugin Architecture

```mermaid
flowchart LR
    subgraph Plugin["Plugin Structure"]
        Meta[plugin.yaml<br/>Metadata]
        Adapter[adapter.py<br/>Execution]
        Normalizer[normalizer.py<br/>Output Processing]
        Dockerfile[Dockerfile<br/>Container]
    end

    subgraph Flow["Execution Flow"]
        F1[Configure] --> F2[Validate]
        F2 --> F3[Execute in Container]
        F3 --> F4[Collect Artifacts]
        F4 --> F5[Normalize to Findings]
    end

    Meta --> F1
    Adapter --> F2
    Adapter --> F3
    Adapter --> F4
    Normalizer --> F5
```

### Plugin Comparison

| Plugin | Type | Safe by Default | Requires Approval | Output |
|--------|------|-----------------|-------------------|--------|
| **Lighthouse** | Performance/A11y | ✅ Yes | No | JSON, HTML |
| **ZAP Baseline** | Security (Passive) | ✅ Yes | No | JSON, XML |
| **ZAP Fullscan** | Security (Active) | ❌ No | **Yes (Governor)** | JSON, XML |
| **Axe** | Accessibility | ✅ Yes | No | JSON |
| **k6 Ramp/Spike/Soak** | Load Testing | ✅ Yes | No | JSON |
| **k6 Stress** | Load Testing | ❌ No | **Yes (Governor)** | JSON |
| **Recon** | Reconnaissance | ✅ Yes | No | JSON |
| **Security Headers** | Security | ✅ Yes | No | JSON |
| **Secret Scanner** | Security | ✅ Yes | No | JSON (redacted) |

### Detailed Plugin Documentation

#### Lighthouse Plugin

**Purpose:** Google Lighthouse audits for performance, SEO, accessibility, and best practices.

```yaml
id: lighthouse-audit
docker_image: lighthouse-ci/lhci:latest
categories:
  - performance
  - seo
  - accessibility
  - best_practices

presets:
  safe:
    timeout: 180s
    device: desktop
  balanced:
    timeout: 300s
    device: desktop + mobile
  aggressive:
    timeout: 600s
    device: all
```

**Core Web Vitals Thresholds:**

| Metric | Good | Needs Improvement | Poor | Severity |
|--------|------|-------------------|------|----------|
| LCP | < 2.5s | 2.5s - 4s | > 4s | CRITICAL |
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 | HIGH |
| INP | < 200ms | 200ms - 500ms | > 500ms | HIGH |
| FCP | < 1.8s | 1.8s - 3s | > 3s | MEDIUM |
| TTFB | < 800ms | 800ms - 1.8s | > 1.8s | MEDIUM |

**Sample Finding:**
```json
{
  "finding_id": "lh_lcp_poor_abc123",
  "title": "Largest Contentful Paint is poor (4.2s)",
  "severity": "CRITICAL",
  "family": "PERFORMANCE",
  "location": {"url": "https://example.com"},
  "evidence": [
    {"type": "metric", "value": "LCP: 4200ms"},
    {"type": "screenshot", "artifact": "lcp_element.png"}
  ],
  "fix": {
    "summary": "Optimize images, reduce render-blocking resources"
  }
}
```

#### OWASP ZAP Plugin

**Purpose:** Dynamic Application Security Testing (DAST).

```yaml
id: zap-security
docker_image: ghcr.io/zaproxy/zaproxy:stable

modes:
  baseline:
    type: passive
    safe_for_production: true
    requires_approval: false
  fullscan:
    type: active
    safe_for_production: false
    requires_approval: true  # CRITICAL: Requires Governor approval
```

**Risk to Severity Mapping:**

| ZAP Risk | Severity | Action |
|----------|----------|--------|
| 3 (High) | CRITICAL | Fail gate |
| 2 (Medium) | HIGH | Warn |
| 1 (Low) | MEDIUM | Info |
| 0 (Informational) | LOW | Log |

**CWE Mapping (14 categories):**
- Injection (SQL, OS, LDAP)
- XSS (Reflected, Stored, DOM)
- Authentication
- Access Control
- Cryptographic Issues
- CSRF
- SSRF
- XXE
- Deserialization
- Security Misconfiguration

**Authorization Requirements (Fullscan only):**
```python
# Governor must approve attack mode
approval = await governor.approve_attack_mode(
    target="https://example.com",
    scope=["example.com", "api.example.com"],
    duration=3600,
    reason="Penetration test authorized by security team"
)

# Approval record
{
    "approval_id": "gov_123abc",
    "timestamp": "2024-01-15T10:00:00Z",
    "approver": "governor_agent",
    "scope_hash": "sha256:abc123...",
    "expires_at": "2024-01-15T11:00:00Z"  # Max 60 min validity
}
```

#### Axe Plugin

**Purpose:** WCAG accessibility testing via axe-core.

```yaml
id: axe-accessibility
docker_image: mcr.microsoft.com/playwright:v1.40.0-focal

rule_sets:
  - wcag2a
  - wcag2aa
  - wcag2aaa
  - wcag21a
  - wcag21aa
  - wcag22aa
  - best-practice
  - section508
```

**Impact to Severity Mapping:**

| Axe Impact | Severity | WCAG Level |
|------------|----------|------------|
| critical | CRITICAL | A |
| serious | HIGH | A/AA |
| moderate | MEDIUM | AA |
| minor | LOW | AAA |

**WCAG Criteria Coverage (28 criteria):**
- 1.1.1 Non-text Content
- 1.3.1 Info and Relationships
- 1.4.3 Contrast (Minimum)
- 2.1.1 Keyboard
- 2.4.4 Link Purpose
- 4.1.2 Name, Role, Value
- ... and 22 more

#### k6 Plugin

**Purpose:** Load testing with Constitutional AI safeguards.

```yaml
id: k6-load
docker_image: grafana/k6:latest

scenarios:
  ramp:
    vus: 1 → 10 → 1
    duration: 3.5min
    safe: true
  spike:
    baseline_vus: 5
    spike_vus: 50
    safe: true
  soak:
    vus: 10
    duration: 10min
    safe: true
  stress:
    max_vus: 100
    progressive: true
    safe: false  # REQUIRES APPROVAL
```

**Performance Thresholds:**

| Metric | Warning | High | Critical |
|--------|---------|------|----------|
| P95 Latency | 500ms | 1000ms | 2000ms |
| P99 Latency | 1000ms | 2000ms | 5000ms |
| Error Rate | 1% | 5% | 10% |
| Throughput Drop | 20% | 40% | 60% |

**Sentinel Integration:**
```python
# k6 integrates with Sentinel for real-time monitoring
sentinel_config = {
    "response_time_spike_factor": 3,   # 3x normal = spike
    "error_rate_spike_factor": 5,      # 5x normal = spike
    "rate_limit_threshold": 3,         # 3+ 429s = rate limited
    "auto_abort_failures": 10,         # 10 consecutive = abort
    "monitoring_window": 30            # 30 second window
}
```

#### Recon Plugin

**Purpose:** Target reconnaissance and fingerprinting.

```yaml
id: recon
entry_points:
  quick_recon:
    timeout: 30s
    max_requests: 5
  recon:
    timeout: 300s
    max_requests: 100
  thorough:
    timeout: 600s
    max_requests: 500

sub_plugins:
  - http_scanner: Security headers, TLS, CDN/WAF detection
  - route_crawler: Sitemap, robots.txt, API discovery
  - tech_fingerprint: Framework, CMS, auth detection
```

**Output Schema:**
```python
ReconResult(
    target_fingerprint={
        "technologies": ["Next.js", "React", "Node.js"],
        "frameworks": ["nextjs"],
        "cms": None,
        "cdn": "Cloudflare",
        "waf": "Cloudflare WAF"
    },
    discovered_routes=[
        "/api/v1/users",
        "/api/v1/products",
        "/login",
        "/dashboard"
    ],
    security_posture={
        "tls_version": "TLS 1.3",
        "hsts": True,
        "csp": "strict-dynamic",
        "xfo": "DENY"
    },
    constraints={
        "rate_limit_detected": True,
        "auth_required_paths": ["/api/*", "/dashboard/*"]
    }
)
```

#### Security Plugin

**Purpose:** Multi-faceted security analysis.

```yaml
id: security
sub_plugins:
  headers:
    checks: [CSP, HSTS, XFO, XCTO, Referrer-Policy, CORS, Cookies]
  secrets:
    patterns: [API keys, passwords, tokens, AWS keys, private keys]
    REDACTS_EVIDENCE: true  # CRITICAL: Never stores actual secrets
  sbom:
    formats: [CycloneDX, SPDX]
    ecosystems: [npm, pip, golang, cargo, maven, nuget]
  vulnerabilities:
    source: OSV
    cvss_mapping: true
```

**Secrets Detection & Redaction:**
```python
# Detected secret patterns
SECRET_PATTERNS = [
    r"(?i)(api[_-]?key)\s*[:=]\s*['\"]?([a-zA-Z0-9_\-]{20,})",
    r"ghp_[a-zA-Z0-9]{36}",           # GitHub PAT
    r"sk_live_[a-zA-Z0-9]{24,}",      # Stripe
    r"AKIA[A-Z0-9]{16}",              # AWS Access Key
    r"-----BEGIN (RSA |EC )?PRIVATE KEY-----",
    r"eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+"  # JWT
]

# Evidence is ALWAYS redacted
{
    "finding_id": "sec_secret_123",
    "title": "Exposed API key in JavaScript bundle",
    "evidence": {
        "type": "code_snippet",
        "value": "[REDACTED]",  # Never stores actual secret
        "context": "...api_key: [REDACTED]..."
    }
}
```

### Plugin Packs

Pre-configured plugin collections for common use cases:

| Pack | Plugins | Use Case |
|------|---------|----------|
| `webapp_standard_pack` | Playwright, Lighthouse, Axe | General webapp testing |
| `security_baseline_pack` | ZAP (baseline), Headers, Secrets, Deps | Security assessment |
| `api_contract_pack` | Newman, OpenAPI, GraphQL | API validation |
| `performance_pack` | Lighthouse, k6 | Performance testing |
| `accessibility_pack` | Axe, Keyboard nav | A11y compliance |

---

## MVP Packs

Ready-to-use test packs for quick deployment. Each pack is optimized for specific use cases with sensible defaults.

### Available MVP Packs

| Pack | Time | Tools | Use Case |
|------|------|-------|----------|
| **mvp-webapp** | 15 min | recon, lighthouse, axe, zap-baseline, headers | Web applications |
| **mvp-api** | 10 min | recon, openapi, newman, headers, secrets | REST/GraphQL APIs |
| **mvp-security** | 12 min | zap-baseline, headers, secrets, deps-vuln | Security review |

### Quick Start with MVP Packs

```bash
# Web application testing
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-webapp \
  --target https://your-app.com \
  --output /reports

# API testing
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-api \
  --target https://api.your-app.com \
  --output /reports

# Security-focused scan
docker run --rm -v $(pwd)/reports:/reports \
  ghcr.io/ai-civ/testuniverse:latest \
  --pack mvp-security \
  --target https://your-app.com \
  --output /reports
```

**See:** [docs/quickstart.md](docs/quickstart.md) for detailed setup instructions.

---

## CI/CD Integration

TestUniverse integrates seamlessly with all major CI/CD platforms. Ready-to-use configuration files are provided in the `examples/` directory.

### Supported Platforms

| Platform | Config File | Features |
|----------|-------------|----------|
| **GitHub Actions** | `examples/github-action.yml` | SARIF upload, PR comments, quality gates |
| **GitLab CI** | `examples/gitlab-ci.yml` | Security Dashboard, JUnit reports |
| **Jenkins** | `examples/Jenkinsfile` | HTML reports, Slack notifications |
| **Azure Pipelines** | `examples/azure-pipelines.yml` | Multi-stage, Teams notifications |

### Quality Gate Integration

```yaml
# Example quality gate thresholds
quality_gate:
  thresholds:
    critical: 0    # Zero tolerance for critical
    high: 3        # Max 3 high severity findings
  tool_gates:
    zap-baseline:
      high_alerts: 0
    lighthouse:
      performance: 70
```

### Report Formats

| Format | Use Case | CI Integration |
|--------|----------|----------------|
| **SARIF** | GitHub Security Tab | Code scanning alerts |
| **JUnit** | Test results | All CI platforms |
| **HTML** | Human review | Artifacts |
| **JSON** | Programmatic access | Custom integrations |

**See:** [docs/ci-setup.md](docs/ci-setup.md) for detailed CI/CD setup instructions.

---

## Data Models

### Universal Finding Schema

All plugin outputs normalize to a single schema:

```python
@dataclass
class Finding:
    # Identification
    schema_version: str = "1.0.0"
    finding_id: str          # Unique deterministic hash
    run_id: str              # Execution run identifier
    target_id: str           # Target being tested

    # Classification
    title: str               # Clear issue description
    description: str         # Detailed explanation
    family: TestFamily       # SECURITY, PERFORMANCE, etc.
    category: str            # Subcategory
    severity: Severity       # INFO, LOW, MEDIUM, HIGH, CRITICAL
    confidence: float        # 0.0 - 1.0

    # Location
    location: Location       # Where the issue was found

    # Evidence (REQUIRED - "No evidence, no claim")
    evidence: List[Evidence] # Must have at least 1 item

    # Impact Assessment
    impact: Impact           # Technical and business impact

    # Remediation
    fix: Remediation         # How to fix the issue

    # Deduplication
    dedupe_key: str          # Auto-generated deduplication key
    fingerprint: str         # SHA-256 fingerprint

    # References
    links: Links             # CWE, OWASP, CVE references

    # Status
    status: FindingStatus    # NEW, CONFIRMED, FIXED, etc.
```

### Severity Scoring

```mermaid
flowchart TD
    subgraph Inputs
        TI[Technical Impact<br/>1-10]
        BI[Business Impact<br/>1-10]
        EX[Exploitability<br/>TRIVIAL to THEORETICAL]
        LK[Likelihood<br/>CERTAIN to RARE]
        BR[Blast Radius<br/>CRITICAL to MINIMAL]
    end

    subgraph Calculation
        Base[Base Score<br/>= (TI + BI) / 2]
        Mod1[× Exploitability Modifier]
        Mod2[× Likelihood Modifier]
        Mod3[× Blast Radius Modifier]
    end

    subgraph Output
        S1[0.0-2.0: INFO]
        S2[2.0-4.0: LOW]
        S3[4.0-7.0: MEDIUM]
        S4[7.0-9.0: HIGH]
        S5[9.0-10.0: CRITICAL]
    end

    TI --> Base
    BI --> Base
    Base --> Mod1
    EX --> Mod1
    Mod1 --> Mod2
    LK --> Mod2
    Mod2 --> Mod3
    BR --> Mod3

    Mod3 --> S1
    Mod3 --> S2
    Mod3 --> S3
    Mod3 --> S4
    Mod3 --> S5
```

### Policy Model

```python
@dataclass
class Policy:
    # Authorization (REQUIRED)
    authorization_proof: AuthorizationProof

    # Scope (REQUIRED)
    scope: ScopeDefinition

    # Rate Limits
    rate_limits: RateLimits

    # Data Handling
    data_handling: DataHandling

    # Execution Constraints
    execution_constraints: ExecutionConstraints

    # Notifications
    notifications: NotificationConfig

    # Approval Status
    approval: GovernorApproval

@dataclass
class ScopeDefinition:
    domain_allowlist: List[str]    # Required, wildcards OK
    domain_denylist: List[str]     # Overrides allowlist
    ip_ranges: List[IPRange]       # Optional IP restrictions
    url_allowlist: List[str]       # URL patterns
    url_denylist: List[str]        # Excluded URLs
    allowed_ports: List[int] = [80, 443, 8080, 8443]
    excluded_paths: List[str] = ["/logout", "/admin/delete"]

@dataclass
class RateLimits:
    max_rps: int = 2               # Requests per second (0-100)
    max_concurrency: int = 3       # Parallel requests (1-50)
    max_total_requests: int = 2000 # Total per run
    burst_size: int = 5
    backoff_factor: float = 2.0
```

---

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/sreejagatab/AI-Civilization.git
cd AI-Civilization
git checkout AI-Civ-TestUniverse

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
# Edit .env with your configuration
```

### Docker Quick Start

```bash
# Development mode
docker-compose up

# Full stack with monitoring
docker-compose --profile full --profile monitoring up

# Production mode
docker-compose -f docker-compose.prod.yml up
```

### Basic Usage

```python
from kernel.cli import TestUniverse
from kernel.models import Target, Policy, Plan, TestMode, TestFamily

# Initialize
universe = TestUniverse()
await universe.initialize()

# Define target
target = Target(
    id="my-webapp",
    type="WEB",
    url="https://example.com",
    environment="staging"
)

# Define policy
policy = Policy(
    authorization_proof={
        "type": "INTERNAL_APPROVAL",
        "reference": "SEC-2024-001",
        "owner": {"email": "security@company.com"}
    },
    scope={
        "allowlist": ["example.com", "*.example.com"],
        "denylist": ["admin.example.com"]
    }
)

# Run tests
results = await universe.run(
    target=target,
    policy=policy,
    mode=TestMode.DEEP,
    families=[TestFamily.SECURITY, TestFamily.PERFORMANCE]
)

# Generate report
report = await universe.generate_report(results, format="html")
```

---

## CLI Reference

### Commands

```bash
# Run tests
testuniverse run --target https://example.com \
    --mode deep \
    --pack security_baseline \
    --output report.json

# Quick recon
testuniverse run --target https://example.com \
    --mode recon \
    --timeout 60

# CI mode with quality gate
testuniverse run --target https://example.com \
    --mode ci \
    --gate "critical=0,high=5" \
    --output results.sarif

# Generate report from existing run
testuniverse report --run-id abc123 \
    --format html \
    --output report.html

# List available plugins
testuniverse plugins list

# Check plugin health
testuniverse plugins health lighthouse-audit

# Show run status
testuniverse status --run-id abc123

# Start API server
testuniverse --api --host 0.0.0.0 --port 8000
```

### Exit Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 0 | Success | Quality gate passes |
| 1 | Gate Failed | Findings exceed thresholds |
| 2 | Auth Blocked | Governor denied authorization |
| 3 | Internal Error | Unexpected failure |
| 4 | Timeout | Scan exceeded time limit |
| 5 | Unreachable | Target not accessible |

### Quality Gate Configuration

```bash
# Gate syntax: metric=threshold
--gate "critical=0,high=5,medium=20"

# Multiple gates
--gate "critical=0" --gate "high=5"

# Per-family gates
--gate "security.critical=0,performance.p95=500"
```

---

## API Reference

### REST Endpoints

```yaml
Health & Status:
  GET /health:
    description: Liveness probe
    response: {status: "healthy", version: "1.0.0", uptime_seconds: 3600}

  GET /ready:
    description: Readiness probe (checks all dependencies)
    response: {ready: true, checks: {docker: true, storage: true, plugins: true}}

  GET /metrics:
    description: Prometheus metrics
    content_type: text/plain

Runs:
  POST /runs:
    description: Create new test run
    body: {target: {...}, policy: {...}, plan: {...}}
    response: {run_id: "abc123", status: "PENDING"}

  GET /runs/{run_id}:
    description: Get run status and results
    response: {run_id: "abc123", status: "COMPLETED", findings: [...]}

  GET /runs/{run_id}/findings:
    description: Get findings for a run
    query: ?severity=HIGH&family=SECURITY
    response: {findings: [...], total: 15}

  GET /runs/{run_id}/report:
    description: Generate report
    query: ?format=html
    response: HTML/JSON/SARIF document

Plugins:
  GET /plugins:
    description: List available plugins
    response: {plugins: [{id: "lighthouse-audit", ...}]}

  GET /plugins/{plugin_id}:
    description: Get plugin details
    response: {id: "lighthouse-audit", capabilities: {...}}

Plans:
  POST /plans:
    description: Create execution plan
    body: {target_id: "...", mode: "DEEP", families: ["SECURITY"]}
    response: {plan_id: "xyz789", tasks: [...]}

  POST /plans/{plan_id}/approve:
    description: Governor approval for plan
    response: {approved: true, approval_id: "gov_123"}

WebSocket:
  WS /ws:
    description: Real-time updates
    events: [run_started, task_completed, finding_detected, run_completed]
```

### API Usage Example

```python
import httpx

async def run_tests():
    async with httpx.AsyncClient(base_url="http://localhost:8000") as client:
        # Create run
        response = await client.post("/runs", json={
            "target": {
                "id": "my-app",
                "type": "WEB",
                "url": "https://example.com"
            },
            "policy": {
                "authorization_proof": {
                    "type": "INTERNAL_APPROVAL",
                    "reference": "SEC-001"
                },
                "scope": {
                    "allowlist": ["example.com"]
                }
            },
            "plan": {
                "mode": "DEEP",
                "families": ["SECURITY", "PERFORMANCE"],
                "timebox_seconds": 1800
            }
        })
        run = response.json()

        # Poll for completion
        while True:
            status = await client.get(f"/runs/{run['run_id']}")
            if status.json()["status"] in ["COMPLETED", "FAILED"]:
                break
            await asyncio.sleep(5)

        # Get report
        report = await client.get(
            f"/runs/{run['run_id']}/report",
            params={"format": "html"}
        )
        return report.text
```

---

## Configuration

### Main Configuration (config.yaml)

```yaml
# TestUniverse Configuration
version: "1.0"

# Storage settings
storage:
  backend: postgres  # sqlite, postgres
  reports_dir: /app/reports
  evidence_dir: /app/evidence

# Plugin settings
plugins:
  timeout: 300           # Default plugin timeout (seconds)
  max_concurrent: 5      # Max parallel plugins
  registry_path: ./plugins
  auto_discover: true

# Default quality gate
quality_gate:
  lighthouse:
    performance: 0.8
    accessibility: 0.9
    best_practices: 0.8
    seo: 0.8
  axe:
    max_critical: 0
    max_serious: 5
  zap:
    max_high: 0
    max_medium: 10
  k6:
    p95_threshold_ms: 500
    error_rate_threshold: 0.01

# Constitutional AI settings
constitution:
  require_approval_for_attack: true
  audit_all_requests: true
  max_attack_duration: 3600

# Governance
governance:
  require_authorization: true
  require_allowlist: true
  audit_all_scans: true
```

### Environment Variables

```bash
# LLM Configuration
LLM_PROVIDER=anthropic          # openai, anthropic, local
LLM_MODEL=claude-3-opus-20240229
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Storage
STORAGE_BACKEND=postgres        # sqlite, postgres
DATABASE_URL=postgresql://user:pass@host:5432/testuniverse
REDIS_URL=redis://localhost:6379/0

# Paths
TESTUNIVERSE_HOME=/app
TESTUNIVERSE_CONFIG=/app/config/config.yaml

# API Settings
API_HOST=0.0.0.0
API_PORT=8000
LOG_LEVEL=INFO
ENVIRONMENT=production

# Docker
DOCKER_HOST=unix:///var/run/docker.sock
```

### Civilization Configuration (civilization.yaml)

```yaml
civilization:
  name: "TestUniverse"
  version: "1.0.0"

# The Final Ruleset (Immutable)
final_ruleset:
  - "Purpose outranks intelligence"
  - "Governance outranks autonomy"
  - "Boundaries outrank capability"
  - "Memory outranks speed"
  - "Structure outranks cleverness"

# Agent Configuration
agents:
  architect:
    capabilities: [define_purpose, establish_values]
    boundaries:
      cannot_execute: true
      cannot_allocate: true
      cannot_self_modify: true

  governor:
    capabilities: [enforce_policies, issue_permissions, veto_actions]
    boundaries:
      has_veto_power: true
      cannot_change_purpose: true

  # ... other agents ...

# Resource Quotas
resource_quotas:
  compute:
    total_per_hour: 1000
    per_agent_default: 100
  tokens:
    total_per_hour: 1000000
    per_agent_default: 100000
  api_calls:
    total_per_hour: 10000
    per_agent_default: 1000

# Monitoring
monitoring:
  health_check_interval: 30
  anomaly_detection:
    enabled: true
    sensitivity: 0.8
  alert_thresholds:
    cpu_warning: 70
    cpu_critical: 90
    memory_warning: 75
    memory_critical: 95
    error_rate_warning: 5
    error_rate_critical: 15

# Logging
logging:
  level: INFO
  format: json
  audit:
    enabled: true
    retention_days: 365
    immutable: true
```

---

## Deployment

### Docker Compose (Development)

```bash
# Basic setup (kernel + Redis)
docker-compose up

# With development hot-reload
docker-compose --profile dev up

# Full stack (+ PostgreSQL, ChromaDB)
docker-compose --profile full up

# With monitoring (+ Prometheus, Grafana)
docker-compose --profile monitoring up

# Test target included
docker-compose --profile test up
```

### Docker Compose (Production)

```bash
# Create secrets
mkdir -p secrets
echo "your_secure_password" > secrets/postgres_password
echo "your_grafana_password" > secrets/grafana_password

# Start production stack
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f kernel
```

**Production Features:**
- PostgreSQL with secrets management
- Nginx reverse proxy with TLS
- Redis with AOF persistence
- Prometheus + Grafana + Alertmanager
- Resource limits on all containers
- Internal network isolation
- JSON logging with rotation

### Kubernetes Deployment

```bash
# Deploy all resources
kubectl apply -k k8s/

# Check deployment status
kubectl get pods -n testuniverse

# View logs
kubectl logs -f deployment/testuniverse-kernel -n testuniverse

# Create a test job
kubectl create job my-test --from=cronjob/testuniverse-scheduled -n testuniverse
```

**Kubernetes Architecture:**

```mermaid
graph TB
    subgraph Internet
        Users[Users/CI]
    end

    subgraph Cluster["Kubernetes Cluster"]
        subgraph Ingress
            Nginx[Nginx Ingress<br/>TLS Termination]
        end

        subgraph Services["testuniverse namespace"]
            Kernel[Kernel Deployment<br/>2-10 replicas HPA]
            Redis[Redis<br/>1 replica]
            PVC1[(Reports PVC<br/>10Gi)]
            PVC2[(Evidence PVC<br/>20Gi)]
        end

        subgraph Monitoring["monitoring network"]
            Prometheus[Prometheus]
            Grafana[Grafana]
            AlertManager[AlertManager]
        end
    end

    Users --> Nginx
    Nginx --> Kernel
    Kernel --> Redis
    Kernel --> PVC1
    Kernel --> PVC2
    Prometheus --> Kernel
    Grafana --> Prometheus
```

**Resource Requirements:**

| Component | CPU Request | CPU Limit | Memory Request | Memory Limit |
|-----------|-------------|-----------|----------------|--------------|
| Kernel | 500m | 2000m | 512Mi | 2Gi |
| Redis | 100m | 500m | 128Mi | 512Mi |
| PostgreSQL | 250m | 1000m | 256Mi | 1Gi |

### Infrastructure Requirements

**Development:**
- Docker 20.10+
- Docker Compose 2.0+
- 2+ CPU cores
- 4GB RAM
- 10GB storage

**Production (Docker):**
- Docker 20.10+
- 4+ CPU cores
- 8GB RAM
- 50GB storage
- TLS certificates

**Production (Kubernetes):**
- Kubernetes 1.24+
- 2+ nodes (HA)
- Nginx Ingress Controller
- Storage class for PVCs
- External secret management (recommended)

---

## Testing Strategy

### Test Structure

```
tests/
├── conftest.py           # Global fixtures (678 lines, 40+ fixtures)
├── unit/                 # Unit tests
│   ├── test_models.py    # Data model validation
│   └── test_quality_gate.py
├── agents/               # Agent tests
│   └── test_governor.py  # Governor authorization
├── plugins/              # Plugin tests
│   └── test_lighthouse.py
├── integration/          # Critical security tests
│   ├── test_attack_gating.py      # CRITICAL
│   ├── test_secrets_redaction.py  # CRITICAL
│   ├── test_scope_enforcement.py  # CRITICAL
│   └── test_exit_codes.py         # CRITICAL
└── fixtures/             # Test data
    └── mock_outputs/     # Tool output mocks
```

### Critical Security Tests

#### Attack Gating (`test_attack_gating.py`)

**Validates:** Attack/fullscan mode REFUSES without Governor approval

```python
@pytest.mark.critical
async def test_attack_mode_refused_without_approval():
    """CRITICAL: Verify attack mode is blocked without approval."""
    governor = MockGovernor(auto_approve=False)
    request = ScanRequest(mode=ScanMode.ATTACK, target="https://example.com")

    authorized = await governor.authorize(request)

    assert authorized is False, "Attack mode MUST be denied without approval"
    assert len(governor.audit_log) > 0, "Denial must be logged"
```

#### Secrets Redaction (`test_secrets_redaction.py`)

**Validates:** Secrets NEVER appear in evidence - must show `[REDACTED]`

```python
@pytest.mark.critical
async def test_api_key_is_redacted():
    """CRITICAL: Verify API keys are never stored."""
    finding = await scan_with_secret("api_key=sk_live_abc123xyz")

    for evidence in finding.evidence:
        assert "sk_live_" not in evidence.value
        assert "[REDACTED]" in evidence.value
```

#### Scope Enforcement (`test_scope_enforcement.py`)

**Validates:** Out-of-scope requests blocked, SSRF prevention

```python
@pytest.mark.critical
async def test_internal_ip_blocked():
    """CRITICAL: Prevent SSRF to internal IPs."""
    scope = Scope(allowlist=["example.com"])

    for ip in ["127.0.0.1", "192.168.1.1", "10.0.0.1", "::1"]:
        result = await scope.check(f"http://{ip}/admin")
        assert result.blocked, f"Internal IP {ip} must be blocked"
```

#### Exit Codes (`test_exit_codes.py`)

**Validates:** Correct exit codes for CI integration

```python
@pytest.mark.critical
async def test_exit_2_when_auth_blocked():
    """CRITICAL: Verify exit code 2 on authorization denial."""
    result = await run_with_denied_auth()
    assert result.exit_code == 2
```

### Running Tests

```bash
# All tests
pytest

# Unit tests only
pytest tests/unit/ -v

# Critical security tests
pytest tests/integration/ -v --tb=long

# With coverage
pytest --cov=kernel --cov=plugins --cov-report=html

# Parallel execution
pytest -n auto

# CI mode
pytest --cov-fail-under=80
```

### CI/CD Pipeline

```yaml
# .github/workflows/test.yml
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - run: pytest tests/unit/ --cov --cov-fail-under=80

  security-tests:
    runs-on: ubuntu-latest
    steps:
      - run: pytest tests/integration/test_attack_gating.py -v
      - run: pytest tests/integration/test_secrets_redaction.py -v
      - run: pytest tests/integration/test_scope_enforcement.py -v
      - run: pytest tests/integration/test_exit_codes.py -v

  integration-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'  # Nightly only
    services:
      httpbin:
        image: kennethreitz/httpbin
    steps:
      - run: pytest tests/integration/ -v -m integration
```

---

## Demo Targets

TestUniverse includes 5 intentionally vulnerable/problematic demo applications for end-to-end testing.

| Target | Port | Purpose | Expected Findings |
|--------|------|---------|-------------------|
| **Vulnerable Webapp** | 3001 | Security testing | 15-20 security issues |
| **Marketing Site** | 3002 | Performance/SEO/A11y | 10-15 perf/a11y issues |
| **OpenAPI REST API** | 3003 | Contract testing | 5-10 schema violations |
| **GraphQL API** | 3004 | GraphQL security | 5-8 GraphQL issues |
| **Auth-Protected App** | 3005 | Authenticated scanning | Auth testing scenarios |

### Quick Start

```bash
# Start all demo targets
cd demo-targets
docker-compose up -d

# Verify health
for port in 3001 3002 3003 3004 3005; do
  curl -sf http://localhost:$port/health | jq '.status'
done

# Run TestUniverse against targets
aiciv run http://localhost:3001 --mode=deep --pack=security-baseline
aiciv run http://localhost:3002 --mode=balanced --pack=webapp-standard
aiciv run http://localhost:3003 --mode=ci --pack=api-contract
```

### E2E Test Suite

```bash
# Run E2E tests against demo targets
./scripts/run-e2e-tests.sh

# Or manually
pytest tests/e2e/ -v --timeout=600
```

**Detailed documentation:** [docs/DEMO-AND-TESTING.md](docs/DEMO-AND-TESTING.md)

---

## Security Features

### Authorization Requirements

Every test execution requires:

| Requirement | Purpose | Enforcement |
|-------------|---------|-------------|
| Authorization Proof | Legal protection | Governor validation |
| Scope Allowlist | Prevent unauthorized scanning | Scope checker |
| Owner Contact | Accountability | Policy model |
| Time Window | Limit exposure | Policy constraints |

### Rate Limiting

```yaml
default_limits:
  max_rps: 2              # Requests per second
  max_concurrency: 3      # Parallel connections
  max_total_requests: 2000 # Total per run
  burst_size: 5           # Burst allowance

auto_behaviors:
  stop_on_429: true       # Stop on rate limit
  stop_on_waf_block: true # Stop on WAF detection
  exponential_backoff: true
```

### Secrets Protection

```python
# Secrets are ALWAYS redacted
SECRET_PATTERNS = [
    r"api[_-]?key",
    r"password",
    r"secret",
    r"token",
    r"bearer",
    r"ghp_[a-zA-Z0-9]{36}",      # GitHub
    r"sk_live_[a-zA-Z0-9]{24,}", # Stripe
    r"AKIA[A-Z0-9]{16}",         # AWS
    r"-----BEGIN.*PRIVATE KEY-----",
]

# Evidence shows [REDACTED], never actual values
```

### Audit Logging

```python
# All actions are logged immutably
AuditEntry(
    timestamp="2024-01-15T10:30:00Z",
    agent="governor",
    action="authorize_request",
    target="https://example.com",
    details={"mode": "attack", "scope_hash": "abc123"},
    outcome="DENIED",
    reason="Attack mode requires explicit approval"
)

# Retention: 365 days, immutable
```

### Network Isolation

```mermaid
flowchart LR
    subgraph External["External Network"]
        Internet[Internet]
        Users[Users]
    end

    subgraph DMZ["DMZ"]
        Nginx[Nginx<br/>TLS Termination]
    end

    subgraph Internal["Internal Network"]
        Kernel[Kernel]
        Redis[Redis]
        Postgres[PostgreSQL]
    end

    subgraph Monitoring["Monitoring Network"]
        Prometheus[Prometheus]
        Grafana[Grafana]
    end

    Users --> Nginx
    Nginx --> Kernel
    Kernel --> Redis
    Kernel --> Postgres
    Prometheus -.-> Kernel
    Grafana -.-> Prometheus

    Internet -.->|Blocked| Redis
    Internet -.->|Blocked| Postgres
```

---

## Comparisons

### vs. Traditional Testing Tools

| Feature | TestUniverse | Traditional Tools |
|---------|--------------|-------------------|
| **Orchestration** | Multi-tool, unified | Single tool |
| **Finding Format** | Universal schema | Tool-specific |
| **Authorization** | Built-in governance | Manual/none |
| **Deduplication** | Automatic fingerprinting | Manual |
| **Evidence** | Required for all claims | Often optional |
| **Scope Enforcement** | Automatic, audited | Manual config |

### vs. CI Security Scanners

| Feature | TestUniverse | GitHub/GitLab Scanners |
|---------|--------------|------------------------|
| **Scope** | Full-stack testing | Primarily SAST |
| **Plugins** | Extensible (any tool) | Fixed set |
| **Governance** | Constitutional AI | Basic policies |
| **Report Format** | Universal + SARIF | SARIF |
| **Load Testing** | Built-in (k6) | Separate tools |

### vs. Penetration Testing Platforms

| Feature | TestUniverse | Commercial Pentest |
|---------|--------------|-------------------|
| **Automation** | Fully automated | Semi-automated |
| **Cost** | Open source | $$$$ |
| **Customization** | Plugin architecture | Limited |
| **Governance** | Constitutional AI | Vendor policies |
| **Attack Mode** | Governor-approved | Manual approval |

### Test Mode Comparison

| Mode | Duration | Risk Level | Approval | Use Case |
|------|----------|------------|----------|----------|
| RECON | 5-10 min | None | No | Discovery |
| CI | 10-30 min | Low | No | Pull requests |
| DEEP | 30-60 min | Medium | No | Release testing |
| ATTACK | 1-2 hours | High | **Yes** | Penetration test |
| VERIFY | 5 min | Low | No | Fix validation |

---

## Troubleshooting

### Common Issues

#### Docker Socket Permission Denied

```bash
# Error: Permission denied while trying to connect to Docker daemon
sudo usermod -aG docker $USER
newgrp docker
# Or restart your session
```

#### Plugin Timeout

```yaml
# Increase timeout in config.yaml
plugins:
  timeout: 600  # Default is 300

# Or per-run
testuniverse run --target https://example.com --timeout 600
```

#### Out of Memory

```bash
# Increase Docker memory limits
# docker-compose.yml
services:
  kernel:
    deploy:
      resources:
        limits:
          memory: 4G
```

#### Rate Limited by Target

```yaml
# Reduce rate limits in policy
policy:
  rate_limits:
    max_rps: 1
    max_concurrency: 1
    burst_size: 1
```

#### Attack Mode Denied

```python
# Attack mode requires explicit Governor approval
# Ensure policy allows attack mode
policy = Policy(
    authorization_proof={
        "type": "PENETRATION_TEST",
        "reference": "PENTEST-2024-001"
    },
    execution_constraints={
        "allowed_modes": ["RECON", "DEEP", "ATTACK"]  # Include ATTACK
    }
)

# Then request approval
approval = await governor.request_attack_approval(
    target=target,
    reason="Authorized penetration test"
)
```

### Debug Mode

```bash
# Enable debug logging
LOG_LEVEL=DEBUG testuniverse run --target https://example.com

# Or in config
logging:
  level: DEBUG
```

### Health Checks

```bash
# Check API health
curl http://localhost:8000/health

# Check readiness (all dependencies)
curl http://localhost:8000/ready

# Check Prometheus metrics
curl http://localhost:8000/metrics
```

---

## The Constitution

### The Final Ruleset (Immutable)

1. **Purpose > Intelligence** - Clear quality goals before capability
2. **Governance > Autonomy** - Authorization and scope enforcement
3. **Boundaries > Capability** - Rate limits and safety constraints
4. **Memory > Speed** - Audit trails and evidence
5. **Structure > Cleverness** - Plugin architecture over ad-hoc testing

### No Evidence, No Claim

Every Finding **MUST** have at least one piece of Evidence. This is enforced at the model level:

```python
@validator("evidence")
def evidence_required(cls, v):
    if not v or len(v) == 0:
        raise ValueError("Findings must have evidence - 'No evidence, no claim'")
    return v
```

### Agent Boundaries Are Immutable

Agent boundaries cannot be changed at runtime:

```python
class AgentBoundaries:
    """Immutable boundaries - cannot be modified after agent creation."""

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)
        self._frozen = True

    def __setattr__(self, key, value):
        if getattr(self, '_frozen', False):
            raise ImmutableError("Agent boundaries cannot be modified")
        super().__setattr__(key, value)
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Ensure all tests pass (`pytest --cov-fail-under=80`)
4. Ensure critical security tests pass
5. Submit a pull request

All contributions must comply with the Core Constitution.

---
<img width="1536" height="1024" alt="20260111_1635_Image Generation_simple_compose_01kepygbqpe5krz1ykwcdc599s" src="https://github.com/user-attachments/assets/1e6590ff-21b9-404d-b4e3-6d33fc017918" />


---

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

## Links

- **Repository:** [github.com/sreejagatab/AI-Civilization](https://github.com/sreejagatab/AI-Civilization)
- **Branch:** `AI-Civ-TestUniverse`
- **Parent Project:** [AI Civilization](https://github.com/sreejagatab/AI-Civilization)

---

<p align="center">
  <em>Built with the AI Civilization constitutional framework.</em>
</p>
