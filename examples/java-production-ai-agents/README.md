# Java for Production AI Agents

Runnable companion to
[Java for Production AI Agents](https://gionag.com/articles/java-production-ai-agents).
It demonstrates the article's raw HTTP boundary with a typed, validated result.

## Requirements

- JDK 21+
- Maven 3.9+

## Run locally

The default mode starts an in-process OpenAI-compatible mock endpoint. It makes
no external request and requires no credentials.

```bash
./run.sh
```

Expected output:

```text
LeadQualification[companyName=Example GmbH, contactEmail=lead@example.com, companySize=12, interestArea=custom CRM, qualified=true]
```

## Run against a provider

The live mode accepts any provider exposing an OpenAI-compatible
`/chat/completions` endpoint:

```bash
export AI_API_KEY="..."
export AI_BASE_URL="https://api.openai.com/v1"
export AI_MODEL="gpt-4o-mini"
./run.sh --live
```

The example deliberately keeps transport, structured parsing, and validation
visible. The article's comparison tabs show how TramAI, Spring AI, and
LangChain4j replace this plumbing with their higher-level contracts.
