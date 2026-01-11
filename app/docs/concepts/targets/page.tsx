'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function TargetsPage() {
  return (
    <DocPage
      title="Targets"
      description="Define what you want to test"
      badge="Core Concepts"
      prev={{ title: 'Understanding Results', href: '/docs/understanding-results' }}
      next={{ title: 'Policies', href: '/docs/concepts/policies' }}
    >
      <DocSection title="What is a Target?">
        <p className="text-slate-300 mb-4">
          A Target defines what system you want to test. It includes the URL or identifier,
          authentication details, and metadata needed for testing.
        </p>
      </DocSection>

      <DocSection title="Target Types">
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li><code className="text-primary-400">web</code> - Web applications (URLs)</li>
          <li><code className="text-primary-400">api</code> - REST or GraphQL APIs</li>
          <li><code className="text-primary-400">repo</code> - Git repositories</li>
          <li><code className="text-primary-400">mobile</code> - Mobile applications</li>
          <li><code className="text-primary-400">cli</code> - Command-line tools</li>
          <li><code className="text-primary-400">infra</code> - Infrastructure (containers, IaC)</li>
        </ul>
      </DocSection>

      <DocSection title="Target Configuration">
        <CodeBlock title="target.yaml">{`target:
  # Required: Unique identifier
  id: my-webapp

  # Required: Target type
  type: web

  # Required: URL or path
  url: https://staging.example.com

  # Optional: Display name
  name: "My Web Application"

  # Optional: Authentication
  auth:
    type: bearer
    token_env: API_TOKEN

  # Optional: Scope restrictions
  scope:
    include:
      - "https://staging.example.com/*"
    exclude:
      - "*/admin/*"
      - "*/logout"

  # Optional: Custom headers
  headers:
    X-Custom-Header: "value"

  # Optional: Metadata
  metadata:
    team: "platform"
    environment: "staging"`}</CodeBlock>
      </DocSection>

      <DocSection title="Authentication Types">
        <ParamTable params={[
          { name: 'bearer', type: 'string', description: 'Bearer token authentication', default: '-' },
          { name: 'basic', type: 'object', description: 'HTTP Basic authentication (username/password)', default: '-' },
          { name: 'cookie', type: 'string', description: 'Cookie-based authentication', default: '-' },
          { name: 'oauth2', type: 'object', description: 'OAuth 2.0 flow', default: '-' },
          { name: 'custom', type: 'object', description: 'Custom authentication script', default: '-' },
        ]} />

        <CodeBlock title="Authentication Examples">{`# Bearer token
auth:
  type: bearer
  token_env: API_TOKEN  # Read from environment variable

# Basic auth
auth:
  type: basic
  username_env: API_USER
  password_env: API_PASS

# Cookie
auth:
  type: cookie
  cookie_env: SESSION_COOKIE

# OAuth2
auth:
  type: oauth2
  client_id_env: OAUTH_CLIENT_ID
  client_secret_env: OAUTH_CLIENT_SECRET
  token_url: https://auth.example.com/token`}</CodeBlock>

        <InfoBox type="warning" title="Security">
          Never hardcode credentials in configuration files. Always use environment
          variables or secrets management systems.
        </InfoBox>
      </DocSection>

      <DocSection title="Scope Control">
        <p className="text-slate-300 mb-4">
          Define what URLs the scanner can access:
        </p>
        <CodeBlock title="Scope Configuration">{`scope:
  # URLs to include (glob patterns)
  include:
    - "https://staging.example.com/*"
    - "https://api.example.com/v1/*"

  # URLs to exclude (glob patterns)
  exclude:
    - "*/admin/*"
    - "*/logout"
    - "*/delete/*"

  # Maximum crawl depth
  max_depth: 5

  # Stay on same domain only
  same_origin: true`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
