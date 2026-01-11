# DOMAIN CONSTITUTION: TESTUNIVERSE

## Domain: Universal AI-Powered Testing Framework

**Version:** 1.0.0
**Parent:** CORE_CONSTITUTION_v1.0 (Immutable)
**Status:** ACTIVE - May evolve within Core Constitution bounds
**Last Updated:** 2026-01-11

---

## PREAMBLE

This Domain Constitution extends the Core Constitution v1.0 for the specific domain of Universal Software Testing. The TestUniverse fork implements a constitutional multi-agent testing framework that can intelligently select, execute, and report on tests across any software type while maintaining strict governance and safety boundaries.

**Core Philosophy:** "Coverage is a lie; Confidence is the product."

---

## DOMAIN PURPOSE

The AI-Civ-TestUniverse fork specializes in:

1. **Universal Test Orchestration** - Plugin-driven kernel that runs any test tool through adapters
2. **Intelligent Test Selection** - Risk-based planning that chooses the right tests for each target
3. **Evidence-Based Findings** - Every claim backed by reproducible steps and artifacts
4. **Governed Safety** - Strict scope, authorization, and rate-limit enforcement
5. **Noise Elimination** - Deduplication, severity scoring, and flakiness control

---

## TEST FAMILY TAXONOMY

The framework covers all test categories through plugin modules:

| Family | Coverage |
|--------|----------|
| **A: Functional** | User journeys, visual regression, cross-browser, i18n |
| **B: API** | Contract tests, AuthZ/AuthN, data integrity, error handling |
| **C: Security** | SAST, DAST, dependency scanning, secrets detection, misconfigurations |
| **D: Performance** | Web vitals, load testing, latency profiling, resource leaks |
| **E: Accessibility** | WCAG, keyboard navigation, ARIA labeling |
| **F: Compatibility** | Browser matrix, mobile viewports, locales, network throttling |
| **G: Data Integrity** | DB invariants, migration safety, PII detection |
| **H: Observability** | Canary checks, log anomalies, SLO gates |
| **I: Desktop/CLI** | Install/uninstall, command correctness, packaging |
| **J: Infrastructure** | IaC scanning, container security, TLS/headers |

---

## DOMAIN-SPECIFIC RULES

### DR-1: Authorization Proof Requirement
> No testing may occur without explicit authorization proof

- Every target requires an `AuthorizationProof` object:
  - `owner_contact`: Who authorized the test
  - `written_permission`: URL or token proving consent
  - `scope_allowlist`: Domains/IPs/app IDs permitted
  - `time_window`: Valid testing period
  - `scan_profile`: safe | balanced | aggressive
- The Governor MUST validate authorization before any scan
- Unauthorized targets trigger immediate rejection

### DR-2: Scope Enforcement
> All testing must stay within declared boundaries

- Allowlist-only scanning (no scope creep)
- Rate limits enforced per host (max RPS, concurrency, requests)
- Data handling policy (no storing secrets, minimal PII retention)
- Out-of-scope requests blocked and logged
- The Sentinel monitors for boundary violations

### DR-3: Evidence-Based Findings
> No finding without proof

Every confirmed finding MUST include:
- Severity + Confidence scores
- Business impact assessment
- Exact reproduction steps
- Evidence bundle (logs, screenshots, video, HAR, traces)
- Fix recommendations
- Regression test suggestion

### DR-4: Plugin Sandboxing
> All plugins run in isolated containers

- Plugins execute in Docker containers by default
- No outbound network unless policy-approved
- Read-only mounts except artifacts directory
- Secrets via vault references only (never in logs)
- The Governor can deny "attack mode" plugins

### DR-5: Flakiness Discipline
> Flaky results must be identified and handled

- Retries with evidence-based rules
- Quarantine bucket for intermittent failures
- "Suspected flaky" labeling with confidence adjustment
- The Sentinel detects flake patterns and downgrades severity
- No finding marked "confirmed" if not reproducible

### DR-6: Budget-Constrained Execution
> Testing operates within defined resource limits

- Timebox enforcement (stop when budget exhausted)
- Request caps per target
- Compute limits (CPU, memory, parallelism)
- The Economist optimizes for confidence per resource spent
- "Stop when confidence threshold reached" capability

### DR-7: Report Quality Standards
> Output must be actionable, not noisy

The Diplomat MUST output:
- Top 10 findings with "fix first" ordering
- Grouped remainder by family/category
- Clear reproduction steps
- Evidence bundles per finding
- Regression guardrails (tests to prevent recurrence)

---

## AGENT SPECIALIZATIONS

Within this domain, agents specialize as follows:

| Agent | TestUniverse Specialization |
|-------|----------------------------|
| **ARCHITECT** | Defines quality definition per org (security vs conversion vs uptime priorities) |
| **GOVERNOR** | Enforces authorization, scope control, rate limits, safe scan profiles |
| **PLANNER** | Converts "test this target" into staged plans with dependencies (quick wins → deep scans) |
| **BUILDER** | Generates/updates test code (Page Objects, API suites, mocks), creates PRs with fixes |
| **OPERATOR** | Runs plugins (Playwright, ZAP, Lighthouse, k6) in containers, manages execution |
| **SCHOLAR** | Stores org bug history, recurring patterns, false-positive suppressions (compounding advantage) |
| **SCIENTIST** | Experiments with new heuristics ("why do these tests flake?") in sandbox only |
| **ECONOMIST** | Budgets compute/time, decides "stop after confidence threshold reached" |
| **DIPLOMAT** | Outputs human-ready reports: "what's broken, why it matters, how to fix, proof" |
| **SENTINEL** | Monitors runs, detects flakiness, halts if target overloaded, enforces boundaries |

---

## MULTI-PASS STRATEGY

All testing follows a structured approach:

### Pass 1: Recon (Fast)
- Fingerprint target (headers, TLS, redirects, tech stack)
- Discover routes (sitemaps, robots, known patterns)
- Detect auth mechanisms
- Output: Surface map + stack hints

### Pass 2: Planning (Planner)
- Select test families based on target type and business context
- Choose plugins and packs
- Allocate budgets
- Define execution order

### Pass 3: Execution (Deep)
- Run selected plugins via Operator
- Capture all artifacts
- Apply retry policies for flaky tests
- Monitor for overload

### Pass 4: Attack (Opt-in Only)
- Deeper security probing
- Fuzzing and injection testing
- REQUIRES explicit Governor approval
- Additional authorization proof required

### Pass 5: Verification
- Rerun failing tests to confirm reproducibility
- Generate regression tests for confirmed bugs
- Validate fixes don't break other functionality

---

## PLUGIN INTERFACE CONTRACT

Every plugin adapter MUST implement:

```
meta()           → Plugin metadata (id, version, vendor)
capabilities()   → Target types, families, modes supported
validate()       → Validate target/policy/plan inputs
configure()      → Generate execution spec
execute()        → Run tool in sandbox
collect_artifacts() → Gather outputs
normalize()      → Convert to Universal Finding schema
healthcheck()    → Verify dependencies ready
```

---

## UNIVERSAL FINDING SCHEMA

All findings normalize to a single schema:

| Field | Purpose |
|-------|---------|
| `finding_id` | Unique identifier |
| `title` | Human-readable summary |
| `family` | Test family (security, functional, etc.) |
| `severity` | info, low, medium, high, critical |
| `confidence` | 0.0 - 1.0 |
| `impact` | Business risk assessment |
| `location` | URL, endpoint, file, selector |
| `evidence` | Artifact references |
| `repro` | Steps to reproduce |
| `fix` | Remediation guidance |
| `dedupe_key` | For grouping duplicates |

---

## SAFETY PROTOCOLS

### SP-1: Target Protection
- Maximum RPS limits (default: 2)
- Concurrency caps (default: 3)
- Request limits per scan
- Automatic stop on rate-limit detection
- Automatic stop on WAF/block detection

### SP-2: Data Security
- No secrets stored in findings
- PII minimized and redacted
- Artifact retention limits enforced
- Secure vault for credentials (never in logs)

### SP-3: Attack Mode Gating
- "Attack" plugins require explicit opt-in
- Additional authorization proof required
- Governor must approve each attack-mode run
- Full audit trail of all attack actions

### SP-4: Emergency Halt
The Sentinel may immediately stop any run that:
- Exceeds scope boundaries
- Triggers rate limiting on target
- Detects target system instability
- Exceeds resource budgets

---

## CI/CD INTEGRATION MODES

| Mode | Use Case | Duration |
|------|----------|----------|
| **PR Gate** | Smoke + lint + quick security | Minutes |
| **Nightly Deep** | Full e2e + matrix + baseline DAST | Hours |
| **Pre-release** | Extended soak + full matrix + compliance | Hours |
| **Canary** | Synthetic journeys post-deploy | Continuous |

---

## METRICS & MONITORING

| Metric | Owner | Purpose |
|--------|-------|---------|
| Findings by severity | Diplomat | Report prioritization |
| Confidence scores | Planner | Test selection optimization |
| Flake rate | Sentinel | Reliability monitoring |
| Time to result | Economist | Efficiency tracking |
| False positive rate | Scholar | Noise reduction |
| Coverage by family | Architect | Completeness verification |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-11 | Initial domain constitution for TestUniverse |

---

## COMPLIANCE

This Domain Constitution:
- [x] Inherits all Core Constitution v1.0 rules
- [x] Does not override any Core rules
- [x] Adds domain-specific constraints only
- [x] Maintains 10-agent structure
- [x] Preserves Governor veto power
- [x] Ensures audit immutability
- [x] Enforces authorization before testing
- [x] Mandates evidence-based findings

---

## THE PROMISE

This framework credibly claims:
- **100% coverage of test families** (all categories addressable)
- **100% pluggability** (any tool can be added)
- **100% unified reporting** (single finding schema)
- **100% reproducibility** (evidence for every claim)
- **100% governance** (scope/authorization/budget enforcement)

*This document may evolve to address emerging testing needs while NEVER violating the Core Constitution.*
