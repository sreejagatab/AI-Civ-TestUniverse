# Getting Started

## Prerequisites

- Python 3.10 or higher
- Docker (optional, for plugin sandboxing)
- An LLM API key (OpenAI or Anthropic)

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/ai-civ/testuniverse.git
cd testuniverse

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install with all dependencies
pip install -e ".[all]"
```

### Using pip

```bash
pip install ai-civ-testuniverse
```

## Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Configure your LLM provider:
   ```bash
   # For OpenAI
   OPENAI_API_KEY=sk-...
   LLM_PROVIDER=openai
   LLM_MODEL=gpt-4o-mini

   # For Anthropic
   ANTHROPIC_API_KEY=sk-ant-...
   LLM_PROVIDER=anthropic
   LLM_MODEL=claude-3-opus-20240229
   ```

## First Run

### Interactive CLI

```bash
aiciv
```

This starts an interactive session where you can:
- Initialize the civilization
- Create test plans
- Execute tests
- Query the knowledge base

### API Server

```bash
aiciv --api --port 8000
```

Access the API at `http://localhost:8000/docs` for Swagger UI.

## Next Steps

- Read about the [Architecture](architecture.md)
- Learn about [Agents](agents/index.md)
- Set up [Plugins](plugins/index.md)
