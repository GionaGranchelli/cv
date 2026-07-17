export type Article = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  content: string
  ogImage?: string
  ogImageAlt?: string
}

export const articles: Article[] = [
  {
    slug: 'java-production-ai-agents',
    title: 'Java for Production AI Agents: Types, Tools, Governance, and Observability',
    description: 'From raw API calls to typed agents with approval gates, tool integration, and audit trails — what it takes to build AI agents on the JVM that are ready for real systems.',
    date: '2026-07-16',
    readingTime: '18 min read',
    tags: ['Java', 'AI Agents', 'Spring AI', 'LangChain4j', 'TramAI', 'Production'],
    ogImage: '/articles/java-production-ai-agents.webp',
    ogImageAlt: 'Layered production AI agent architecture with governed tools, typed data paths, and observability signals',
    content: `
      <p>
        <em>This is the article I wish I had read before building my first production AI agent on the JVM. It covers what works, what breaks, and where the real engineering effort goes once you move beyond a proof of concept.</em>
      </p>

      <aside class="article-checklist" aria-labelledby="production-checklist-title">
        <h2 id="production-checklist-title">Production AI agent checklist</h2>
        <ul>
          <li>Typed, validated model outputs</li>
          <li>Explicit tool allowlists</li>
          <li>Approval for irreversible actions</li>
          <li>A tested provider migration path</li>
          <li>Evaluation and replay tests</li>
          <li>End-to-end traces and audit events</li>
        </ul>
      </aside>

      <h2>1. Where Python Remains the Right Choice</h2>
      <p>
        If you are training a model, fine-tuning a LoRA adapter, or running a research experiment, you should use Python. That ecosystem holds PyTorch, Hugging Face Transformers, vLLM, Unsloth, and the most widely adopted training and inference frameworks. Nobody is arguing otherwise.
      </p>
      <p>
        But most production AI work is not training. It is integration. It is connecting a model to your database, your API, your approval workflow, your compliance log, and your monitoring stack. Once the model is an HTTP endpoint, the language boundary opens up.
      </p>
      <p>
        That is where Java and the broader JVM ecosystem become not just viable but advantageous — particularly in enterprises where existing systems, team expertise, and operational tooling already run on the JVM.
      </p>

      <h2>2. Why Java Fits Enterprise AI Integration</h2>
      <p>
        Enterprise applications do not call a model in isolation. They authenticate, authorise, validate input, enrich context, call multiple downstream systems, apply business rules, log decisions, and handle failures. These are not AI problems. They are software engineering problems that Java has been solving for twenty-five years.
      </p>
      <p>
        The JVM brings: strong typing for predictable data contracts, mature threading and concurrency primitives, battle-tested transaction management, declarative security, comprehensive observability through <a href="https://docs.micrometer.io/micrometer/reference/observation.html" target="_blank" rel="noopener noreferrer">Micrometer Observation</a> and <a href="https://opentelemetry.io/docs/languages/java/" target="_blank" rel="noopener noreferrer">OpenTelemetry Java</a>, and deployment portability across containers, Kubernetes, and bare metal.
      </p>
      <p>
        When your AI agent needs to read from PostgreSQL, write to Kafka, send an email, await human approval, and log every step to an audit table — that is not a Python advantage. That is a Java sweet spot.
      </p>

      <h2>3. A Minimal Java Model Call</h2>
      <p>
        Let us start with the simplest possible interaction: calling an LLM from Java. The OpenAI-compatible API is JSON over HTTP, so the standard <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html" target="_blank" rel="noopener noreferrer">Java 21 <code>HttpClient</code></a> is enough.
      </p>
      <pre><code>var client = HttpClient.newHttpClient();

var request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
    .header("Content-Type", "application/json")
    .header("Authorization", "Bearer " + apiKey)
    .POST(HttpRequest.BodyPublishers.ofString("""
        {
          "model": "gpt-4o",
          "messages": [
            {"role": "user", "content": "Explain virtual threads in Java 21"}
          ]
        }
        """))
    .build();

var response = client.send(request, BodyHandlers.ofString());
System.out.println(response.body());</code></pre>
      <p>
        This works. But it is also where most Java-AI tutorials stop, and where the real engineering should begin. A raw JSON string, no type safety, no error handling, no retry, no streaming, no structured output. Fine for a quick experiment. Dangerous for production.
      </p>
      <p>
        TramAI starts from a different premise: the AI boundary should look like a typed application service, not a provider response that every caller has to parse. Spring AI and LangChain4j can also return typed objects, but their APIs and enforcement options make different trade-offs. We will compare the same operation below.
      </p>

      <h2>4. Why the API Call Is the Easy Part</h2>
      <p>
        A production agent does not just call a model. It must:
      </p>
      <ul>
        <li>Manage conversation state across multiple turns</li>
        <li>Handle token limits and context window pressures</li>
        <li>Retry on transient failures with exponential backoff</li>
        <li>Stream responses for user-facing latency</li>
        <li>Parse and validate model output before acting on it</li>
        <li>Enforce timeouts and circuit-break degraded endpoints</li>
        <li>Log every interaction for debugging and compliance</li>
      </ul>
      <p>
        Each of these is well-supported by the Java ecosystem. The challenge is that most AI tutorials skip them entirely, leaving teams to rediscover every pitfall in production.
      </p>

      <h2>5. Typed Structured Output</h2>
      <p>
        The most important shift from prototype to production is moving from raw strings to typed, validated structures. A model returning unstructured text is a liability. A model returning a validated Java record is an integration point. Here is the same lead-qualification operation in TramAI, Spring AI, and LangChain4j.
      </p>
      <pre><code>public record LeadQualification(
    String companyName,
    String contactEmail,
    @JsonProperty("company_size") String companySize,
    String interestArea,
    boolean isQualified
) {}</code></pre>
      <div class="code-tabs" data-code-tabs>
        <div class="code-tab-list" role="tablist" aria-label="Structured output implementation">
          <button type="button" role="tab" id="structured-tab-tramai" aria-controls="structured-panel-tramai" aria-selected="true" tabindex="0" data-code-tab="tramai">TramAI</button>
          <button type="button" role="tab" id="structured-tab-spring" aria-controls="structured-panel-spring" aria-selected="false" tabindex="-1" data-code-tab="spring">Spring AI</button>
          <button type="button" role="tab" id="structured-tab-langchain" aria-controls="structured-panel-langchain" aria-selected="false" tabindex="-1" data-code-tab="langchain">LangChain4j</button>
        </div>
        <div role="tabpanel" id="structured-panel-tramai" aria-labelledby="structured-tab-tramai" data-code-panel="tramai">
          <pre><code>@AiService
public interface LeadQualifier {
    @Operation(
        prompt = "Qualify this lead and return a structured result",
        model = "gpt-4o"
    )
    LeadQualification qualify(String description);
}

Tramai tramai = Tramai.builder()
    .provider(
        new OpenAiProvider(System.getenv("OPENAI_API_KEY")),
        "openai",
        true
    )
    .model("gpt-4o", "openai")
    .build();

LeadQualifier qualifier = tramai.create(LeadQualifier.class);
LeadQualification lead = qualifier.qualify(
    "A Berlin startup with 12 employees needs a custom CRM"
);</code></pre>
        </div>
        <div role="tabpanel" id="structured-panel-spring" aria-labelledby="structured-tab-spring" data-code-panel="spring" hidden>
          <pre><code>LeadQualification lead = chatClient.prompt()
    .user("A Berlin startup with 12 employees needs a custom CRM")
    .call()
    .entity(LeadQualification.class, spec -&gt; spec
        .useProviderStructuredOutput()
        .validateSchema());</code></pre>
        </div>
        <div role="tabpanel" id="structured-panel-langchain" aria-labelledby="structured-tab-langchain" data-code-panel="langchain" hidden>
          <pre><code>interface LeadQualifier {
    @UserMessage(
        "Qualify this lead and return a structured result: {{it}}"
    )
    LeadQualification qualify(String description);
}

LeadQualifier qualifier = AiServices.create(
    LeadQualifier.class,
    model
);

LeadQualification lead = qualifier.qualify(
    "A Berlin startup with 12 employees needs a custom CRM"
);</code></pre>
        </div>
      </div>
      <p>
        TramAI makes the Java interface the primary contract: the non-<code>String</code> return type drives schema generation, parsing, validation, and corrective retry in the runtime. Spring AI exposes provider-native enforcement and validation as explicit entity options. LangChain4j maps an AI Service return type into a Java object, with strict schema behavior depending on the configured model and its supported capabilities. In all three cases, the declared type gives downstream code compile-time safety while model conformance is still enforced at runtime. Compare the official documentation for <a href="https://tramai.dev/guides/core/structured-output" target="_blank" rel="noopener noreferrer">TramAI structured output</a>, <a href="https://docs.spring.io/spring-ai/reference/api/chatclient.html#_structured_output" target="_blank" rel="noopener noreferrer">Spring AI structured output</a>, and <a href="https://docs.langchain4j.dev/tutorials/structured-outputs/" target="_blank" rel="noopener noreferrer">LangChain4j structured outputs</a>.
      </p>

      <h2>6. Tools and Business-System Integration</h2>
      <p>
        An agent that cannot act on its conclusions is a toy. A production agent needs tools — functions the model can invoke to read from databases, call APIs, send notifications, or mutate state.
      </p>
      <p>
        The important question is not only how a tool is implemented, but how it becomes available to a model. These examples expose customer lookup and order history while keeping the registration boundary visible:
      </p>
      <div class="code-tabs" data-code-tabs>
        <div class="code-tab-list" role="tablist" aria-label="Tool registration implementation">
          <button type="button" role="tab" id="tools-tab-tramai" aria-controls="tools-panel-tramai" aria-selected="true" tabindex="0" data-code-tab="tramai-tools">TramAI</button>
          <button type="button" role="tab" id="tools-tab-spring" aria-controls="tools-panel-spring" aria-selected="false" tabindex="-1" data-code-tab="spring-tools">Spring AI</button>
          <button type="button" role="tab" id="tools-tab-langchain" aria-controls="tools-panel-langchain" aria-selected="false" tabindex="-1" data-code-tab="langchain-tools">LangChain4j</button>
        </div>
        <div role="tabpanel" id="tools-panel-tramai" aria-labelledby="tools-tab-tramai" data-code-panel="tramai-tools">
          <pre><code>@Component
public class CustomerTools {
    @AiTool(
        name = "find_customer",
        description = "Look up a customer by email",
        sideEffectLevel = SideEffectLevel.READ_ONLY
    )
    Customer findCustomer(CustomerLookup input) {
        return customerRepository.findByEmail(input.email());
    }

    @AiTool(
        name = "get_orders",
        description = "Get recent customer orders",
        sideEffectLevel = SideEffectLevel.READ_ONLY
    )
    List&lt;Order&gt; getOrders(OrderLookup input) {
        return orderRepository.findByCustomerId(
            input.customerId()
        );
    }
}

@AiService
public interface CustomerAssistant {
    @Operation(
        prompt = "Answer using customer and order data",
        model = "gpt-4o",
        tools = {"find_customer", "get_orders"}
    )
    String answer(String request);
}

String response = assistant.answer(
    "Show orders for john@example.com"
);</code></pre>
        </div>
        <div role="tabpanel" id="tools-panel-spring" aria-labelledby="tools-tab-spring" data-code-panel="spring-tools" hidden>
          <pre><code>@Component
public class CustomerTools {
    @Tool(description = "Look up a customer by email")
    Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Tool(description = "Get recent customer orders")
    List&lt;Order&gt; getOrders(
        @ToolParam(description = "Customer ID") Long id
    ) {
        return orderRepository.findByCustomerId(id);
    }
}

String response = chatClient.prompt()
    .user("Show orders for john@example.com")
    .tools(customerTools)
    .call()
    .content();</code></pre>
        </div>
        <div role="tabpanel" id="tools-panel-langchain" aria-labelledby="tools-tab-langchain" data-code-panel="langchain-tools" hidden>
          <pre><code>class CustomerTools {
    @Tool("Look up a customer by email")
    Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Tool("Get recent customer orders")
    List&lt;Order&gt; getOrders(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
}

CustomerAssistant assistant = AiServices
    .builder(CustomerAssistant.class)
    .chatModel(model)
    .tools(new CustomerTools())
    .build();</code></pre>
        </div>
      </div>
      <p>
        TramAI's Spring module discovers <code>@AiTool</code> methods and registers the <code>@AiService</code> proxy as an injectable bean, while each <code>@Operation(tools = {...})</code> remains an explicit allowlist; an operation with no listed tools exposes none. There is no separate <code>@Tools</code> annotation in the current API. Standalone applications instead register <code>TramaiTool</code> instances through the builder. Spring AI registers tool objects on the request or client. LangChain4j attaches tool objects while building the AI Service. In each case, the model requests a tool call, but ordinary Java code still executes the repository, validation, transaction, and audit logic. The corresponding references are <a href="https://tramai.dev/guides/core/tool-calling" target="_blank" rel="noopener noreferrer">TramAI tool calling</a>, <a href="https://docs.spring.io/spring-ai/reference/api/tools.html" target="_blank" rel="noopener noreferrer">Spring AI tool calling</a>, and <a href="https://docs.langchain4j.dev/tutorials/tools/" target="_blank" rel="noopener noreferrer">LangChain4j tools</a>.
      </p>

      <h2>7. Permissions and Approval Boundaries</h2>
      <p>
        The hardest production problem is not getting the model to call a tool. It is controlling which tools it may call, for which users, under which circumstances.
      </p>
      <ul>
        <li>A customer-support agent can read orders but not cancel them unilaterally.</li>
        <li>An internal ops agent can query the database but never execute <code>DELETE</code>.</li>
        <li>A document agent can draft an email but must route it through human approval before sending.</li>
      </ul>
      <p>
        This requires an explicit authorization layer at the agent level — not at the model level, where it is unreliable, but at the orchestration level, where it is enforceable. Tools should be grouped into scopes with approval requirements that cannot be bypassed by jailbreaking the model.
      </p>
      <p>
        <a href="https://tramai.dev" target="_blank" rel="noopener noreferrer">TramAI</a>, a JVM-native runtime for governed AI agents, treats <a href="https://tramai.dev/security/approval-workflows" target="_blank" rel="noopener noreferrer">approval workflows</a> as a first-class concern. You configure which tools trigger an approval workflow through the policy engine, and the runtime suspends execution, stores the continuation, and only resumes after an authorized decision.
      </p>
      <pre><code>// Minimum approval infrastructure using TramAI's documented builder.
val coordinator = DefaultApprovalGateCoordinator(
    store = InMemoryApprovalStore(),
    approvalIdGenerator = UuidApprovalIdGenerator,
    approvalTokenGenerator = SecureRandomApprovalTokenGenerator,
    approvalTokenDigester = Sha256ApprovalTokenDigester,
    decisionValidator = AllowAnyApprovalDecisionValidator,
    maxApprovalTtl = Duration.ofMinutes(15),
)

val tramai = Tramai {
    provider(openAiProvider, name = "openai", default = true)
    model("gpt-4o", "openai")
    approvalGateCoordinator(coordinator)
    approvalContinuationStore(InMemoryApprovalContinuationStore())
    toolArgumentsDigester(Sha256ToolArgumentsDigester)
}</code></pre>
      <p>
        This is not an add-on. It is architectural. When policy requires approval, the runtime suspends execution, stores a continuation, and waits for an authorized decision. The in-memory stores above are suitable for demonstrating the API; production deployments need a durable store if approvals must survive process restarts. If your agent's permission boundaries are enforced only by a system prompt, you do not have security. You have suggestions.
      </p>

      <h2>8. Provider Portability and Self-Hosted Models</h2>
      <p>
        Vendor lock-in is the silent tax of AI integration. Most tutorials hardcode a single provider, a single model, and a single endpoint. In production, you want the ability to switch providers, run benchmarks across models, swap in a cheaper model for simple classification tasks, and host your own models behind a compatible API.
      </p>
      <p>
        All three options can keep business code independent of a provider, but they place routing policy at different levels. The following examples express the same cloud-versus-local requirement:
      </p>
      <div class="code-tabs" data-code-tabs>
        <div class="code-tab-list" role="tablist" aria-label="Provider routing implementation">
          <button type="button" role="tab" id="routing-tab-tramai" aria-controls="routing-panel-tramai" aria-selected="true" tabindex="0" data-code-tab="tramai-routing">TramAI</button>
          <button type="button" role="tab" id="routing-tab-spring" aria-controls="routing-panel-spring" aria-selected="false" tabindex="-1" data-code-tab="spring-routing">Spring AI</button>
          <button type="button" role="tab" id="routing-tab-langchain" aria-controls="routing-panel-langchain" aria-selected="false" tabindex="-1" data-code-tab="langchain-routing">LangChain4j</button>
        </div>
        <div role="tabpanel" id="routing-panel-tramai" aria-labelledby="routing-tab-tramai" data-code-panel="tramai-routing">
          <pre><code># application.yml
tramai:
  default-provider: openai
  models:
    gpt-4o: openai
  fallbacks:
    gpt-4o:
      - provider: ollama
        model: llama3.1:8b
  resilience:
    circuit-breaker:
      enabled: true
      failure-threshold: 3
  providers:
    openai:
      api-key: \${OPENAI_API_KEY}
    ollama:
      base-url: http://localhost:11434

# CustomerAssistant's @Operation(model = "gpt-4o")
# now follows this ordered route automatically.</code></pre>
        </div>
        <div role="tabpanel" id="routing-panel-spring" aria-labelledby="routing-tab-spring" data-code-panel="spring-routing" hidden>
          <pre><code>ChatClient cloud = ChatClient.create(openAiModel);
ChatClient local = ChatClient.create(ollamaModel);

ChatClient selected = useLocalModel
    ? local
    : cloud;

String response = selected.prompt()
    .user("Qualify this lead")
    .call()
    .content();

// Add Resilience4j or application-level failover
// when automatic fallback is required.</code></pre>
        </div>
        <div role="tabpanel" id="routing-panel-langchain" aria-labelledby="routing-tab-langchain" data-code-panel="langchain-routing" hidden>
          <pre><code>ChatModel model = useLocalModel
    ? OllamaChatModel.builder()
        .baseUrl("http://localhost:11434")
        .modelName("llama3.1:8b")
        .build()
    : OpenAiChatModel.builder()
        .apiKey(System.getenv("OPENAI_API_KEY"))
        .modelName("gpt-4o")
        .build();

String response = model.chat("Qualify this lead");</code></pre>
        </div>
      </div>
      <p>
        TramAI stores the primary route, fallback model, provider, and circuit-breaker behavior in the runtime configuration. Spring AI and LangChain4j make changing the concrete model straightforward, but an automatic fallback policy still belongs in your application or resilience layer. See <a href="https://tramai.dev/guides/core/providers-routing" target="_blank" rel="noopener noreferrer">TramAI provider routing</a>, <a href="https://docs.spring.io/spring-ai/reference/api/chatclient.html#_working_with_multiple_chat_models" target="_blank" rel="noopener noreferrer">Spring AI multiple-model configuration</a>, and <a href="https://docs.langchain4j.dev/tutorials/chat-and-language-models/" target="_blank" rel="noopener noreferrer">LangChain4j chat models</a>.
      </p>
      <p>
        This matters more than most teams realise. When a provider changes pricing, deprecates a model, introduces latency spikes, or goes down, your application should have a tested migration or fallback path. An abstraction reduces the affected code, but it does not remove differences in model behavior, capabilities, or configuration.
      </p>

      <h2>9. Testing, Auditability, and Observability</h2>
      <p>
        AI agents introduce non-determinism into systems that were previously deterministic. That does not mean testing is impossible. It means testing strategy must evolve.
      </p>
      <ul>
        <li><strong>Unit tests</strong> for tool logic, routing, and approval gates — standard JUnit.</li>
        <li><strong>Integration tests</strong> with mock model endpoints (WireMock or a local Ollama instance) that return fixture responses.</li>
        <li><strong>Evaluation tests</strong> that run real model calls against golden datasets and assert output structure, not exact text.</li>
        <li><strong>Regression tests</strong> that replay production traces through the agent and verify decisions match expected outcomes.</li>
      </ul>
      <p>
        The telemetry hook is also different in each framework. These minimal configurations instrument the model or agent call without enabling prompt and completion capture:
      </p>
      <div class="code-tabs" data-code-tabs>
        <div class="code-tab-list" role="tablist" aria-label="Observability implementation">
          <button type="button" role="tab" id="observe-tab-tramai" aria-controls="observe-panel-tramai" aria-selected="true" tabindex="0" data-code-tab="tramai-observe">TramAI</button>
          <button type="button" role="tab" id="observe-tab-spring" aria-controls="observe-panel-spring" aria-selected="false" tabindex="-1" data-code-tab="spring-observe">Spring AI</button>
          <button type="button" role="tab" id="observe-tab-langchain" aria-controls="observe-panel-langchain" aria-selected="false" tabindex="-1" data-code-tab="langchain-observe">LangChain4j</button>
        </div>
        <div role="tabpanel" id="observe-panel-tramai" aria-labelledby="observe-tab-tramai" data-code-panel="tramai-observe">
          <pre><code>var observer = new OpenTelemetryOperationObserver(
    openTelemetry,
    "customer-lead-agent"
);

Tramai tramai = Tramai.builder()
    .provider(openAiProvider, "openai", true)
    .model("gpt-4o", "openai")
    .observer(observer)
    .build();

// Every provider attempt now emits spans and metrics,
// including retries, parse failures, and token usage.</code></pre>
        </div>
        <div role="tabpanel" id="observe-panel-spring" aria-labelledby="observe-tab-spring" data-code-panel="spring-observe" hidden>
          <pre><code>ChatClient client = ChatClient.create(
    openAiModel,
    observationRegistry
);

String response = client.prompt()
    .user("Qualify this lead")
    .call()
    .content();

// With Actuator and a tracing bridge, Spring AI
// emits ChatClient and ChatModel observations.</code></pre>
        </div>
        <div role="tabpanel" id="observe-panel-langchain" aria-labelledby="observe-tab-langchain" data-code-panel="langchain-observe" hidden>
          <pre><code>var listener =
    new MicrometerMetricsChatModelListener(meterRegistry);

ChatModel model = OpenAiChatModel.builder()
    .apiKey(System.getenv("OPENAI_API_KEY"))
    .modelName("gpt-4o")
    .listeners(List.of(listener))
    .build();

String response = model.chat("Qualify this lead");</code></pre>
        </div>
      </div>
      <p>
        Observability is equally critical. Every model call, tool invocation, approval decision, and failure should produce structured logs with trace IDs that span the entire agent lifecycle. TramAI observes each engine attempt through its <code>OperationObserver</code>; Spring AI integrates with Micrometer Observation at the client and model layers; LangChain4j attaches listeners to supported model implementations. Keep prompt and completion payload logging disabled unless you have an explicit redaction and retention policy. See <a href="https://tramai.dev/guides/testing-observability/observability" target="_blank" rel="noopener noreferrer">TramAI observability</a>, <a href="https://docs.spring.io/spring-ai/reference/observability/" target="_blank" rel="noopener noreferrer">Spring AI observability</a>, and <a href="https://docs.langchain4j.dev/tutorials/observability/" target="_blank" rel="noopener noreferrer">LangChain4j observability</a>. An agent that cannot be debugged after the fact is an incident waiting to happen.
      </p>

      <h2>10. Run the Companion Example</h2>
      <p>
        The <a href="https://github.com/GionaGranchelli/cv/tree/main/examples/java-production-ai-agents" target="_blank" rel="noopener noreferrer">companion project on GitHub</a> turns the raw HTTP section into an executable Java 21 example. It starts a local OpenAI-compatible mock endpoint, performs the request, parses the nested structured result with Jackson, validates it as a Java record, and exits. No API key or network call is required.
      </p>
      <pre><code>cd examples/java-production-ai-agents
./run.sh</code></pre>
      <p>
        To exercise the same client against a compatible provider, set <code>AI_API_KEY</code>, <code>AI_BASE_URL</code>, and optionally <code>AI_MODEL</code>, then run <code>./run.sh --live</code>. Keeping the transport example small makes the boundary visible; the framework tabs above show where TramAI, Spring AI, or LangChain4j take over structured mapping and orchestration.
      </p>

      <h2>11. Choosing Between Spring AI, LangChain4j, and TramAI</h2>
      <p>
        The Java AI ecosystem has several options, each with a different scope:
      </p>
      <ul>
        <li><strong>Spring AI</strong> — Best if you are already on Spring Boot. Provides structured output, tool integration, document ingestion, and RAG through the familiar autoconfiguration and bean model. The fastest path from "Java project" to "AI-enabled service."</li>
        <li><strong>LangChain4j</strong> — A framework-agnostic alternative with a broader set of built-in tool integrations, memory providers, and model support. Well-suited if you need flexibility outside the Spring ecosystem or want more connector options out of the box.</li>
        <li><strong>TramAI</strong> — A JVM-native runtime that sits alongside the model layer and provides governance, approval workflows, audit trails, and deployment control. Not an agent framework — it is a bounded orchestration and policy layer for scenarios where you need to know who approved what, which model was used, and where the data went.</li>
      </ul>
      <p>
        These are overlapping choices, not a pipeline. Spring AI and LangChain4j both provide model abstraction and tool integration, so pick one based on your framework and feature requirements. TramAI is an alternative runtime when bounded workflows, approval gates, audit trails, and sovereign deployment controls are central requirements. Do not assume these libraries wrap one another transparently: start with one, and introduce another service or integration boundary only when a concrete requirement justifies the additional framework.
      </p>

      <h2>12. A Small Working Architecture</h2>
      <p>
        Here is what a production-ready Java AI agent architecture looks like in practice:
      </p>
      <pre><code>┌────────────────────────────────────────────────────┐
│                    User / API Gateway                │
└─────────┬──────────────────────────────┬─────────────┘
          │                              │
          ▼                              ▼
┌──────────────────┐   ┌─────────────────────────────┐
│  TramAI Runtime   │   │  Approval Dashboard         │
│                   │   │  (human-in-the-loop UI)     │
│  · Auth & scopes  │   └─────────────────────────────┘
│  · Policy engine  │
│  · Approval gates │
│  · Tool execution │
│  · Audit logging  │
└─────────┬─────────┘
          │
    ┌─────┴─────┐
    ▼           ▼
┌────────┐ ┌──────────┐
│ Model  │ │  Tools   │
│ Layer  │ │  Layer   │
│ OpenAI │ │ Database │
│ Ollama │ │ APIs     │
│ vLLM   │ │ Email    │
│ etc    │ │ Kafka    │
└────────┘ │ Files    │
           └──────────┘</code></pre>
      <p>
        The key insight: the runtime orchestrates both model calls and tool execution through a single policy engine. Approval gates are enforced in the tool-execution path — the runtime intercepts tool invocations, checks the policy, suspends if needed, and only resumes after the gate clears. The model never calls tools directly; it requests them through the runtime.
      </p>

      <h2>13. Where to Go From Here</h2>
      <p>
        If you are a Java developer exploring AI agents, start with the tools you already know. Add Spring AI or LangChain4j to your existing project. Expose one business operation as a tool. Call a model with typed output. See how far you get with just the ecosystem you already have.
      </p>
      <p>
        When approval workflows, audit requirements, provider routing, or deployment control become central to the design, evaluate TramAI as the runtime for that bounded workflow. The <a href="https://tramai.dev" target="_blank" rel="noopener noreferrer">TramAI documentation</a> covers its approval gates, provider orchestration, and deterministic execution engine.
      </p>
      <p>
        If your team needs a production AI agent built on the JVM — with proper governance, typed tools, and an architecture designed for regulated environments — <a href="https://constant-labs.com/services/custom-ai-agents/?utm_source=gionag.com&utm_medium=referral&utm_campaign=java_ai_agents" target="_blank" rel="noopener noreferrer">Constant Labs</a> builds these systems for companies across the Netherlands, Italy, and the EU.
      </p>
      <p>
        The first API call is easy. Everything after that is engineering.
      </p>

      <h2>Sources and Further Reading</h2>
      <ul>
        <li><a href="https://tramai.dev" target="_blank" rel="noopener noreferrer">TramAI documentation</a> — typed services, tool policies, approvals, and runtime architecture.</li>
        <li><a href="https://docs.spring.io/spring-ai/reference/" target="_blank" rel="noopener noreferrer">Spring AI reference documentation</a> — ChatClient, structured output, models, and tools.</li>
        <li><a href="https://docs.langchain4j.dev/" target="_blank" rel="noopener noreferrer">LangChain4j documentation</a> — AI Services, structured outputs, tools, and model integrations.</li>
        <li><a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html" target="_blank" rel="noopener noreferrer">Java 21 HttpClient API</a> — the standard HTTP transport used by the companion example.</li>
        <li><a href="https://opentelemetry.io/docs/languages/java/" target="_blank" rel="noopener noreferrer">OpenTelemetry Java</a> and <a href="https://docs.micrometer.io/micrometer/reference/observation.html" target="_blank" rel="noopener noreferrer">Micrometer Observation</a> — tracing and observation primitives for JVM services.</li>
      </ul>
    `
  },
  {
    slug: 'agentic-workflows-modern-engineering',
    title: 'Agentic Workflows: The Next Frontier in Software Engineering',
    description: 'How autonomous AI agents are changing the way we write, test, and deploy code in complex distributed systems.',
    date: '2025-04-10',
    readingTime: '8 min read',
    tags: ['AI', 'Agentic Workflows', 'Engineering Productivity'],
    content: `
      <h2>The Shift to Agentic Engineering</h2>
      <p>
        Software engineering is moving from simple "human-in-the-loop" assistance toward workflows where agents can plan, execute, verify, and adapt across multiple steps. That does not mean humans disappear. It means the unit of engineering work is changing. Instead of asking a tool to generate a function, we increasingly ask a system to investigate a bug, propose a patch, run tests, interpret failures, update documentation, and surface risks.
      </p>
      <p>
        This is a bigger shift than autocomplete. Autocomplete speeds up typing. Agentic workflows reshape how delivery happens. The difference is architectural, not cosmetic.
      </p>

      <h2>What Makes a Workflow "Agentic"?</h2>
      <p>
        A workflow becomes agentic when the system can operate toward a goal rather than merely respond to a prompt. That usually includes several capabilities: planning tasks, using tools, reading feedback from the environment, revising its approach, and stopping when it reaches a satisfactory result or hits a guardrail.
      </p>
      <p>
        In practice, this might look like an agent that receives a production incident, queries observability tools, inspects recent commits, creates a probable root-cause report, drafts a rollback or fix, and opens a pull request for human review. The point is not magic. The point is bounded autonomy.
      </p>

      <h2>From Code Generation to Delivery Orchestration</h2>
      <p>
        Most teams first encounter AI through code generation. Useful, yes, but limited. The real leverage appears when agents can move across system boundaries: repository, CI pipeline, issue tracker, test suite, logs, metrics, deployment environments, and documentation. At that point, the agent is no longer helping with a line of code. It is participating in the software delivery system.
      </p>
      <p>
        That changes the bottleneck. The bottleneck is no longer "can the model write code?" It becomes "can the surrounding architecture safely support autonomous action?" Teams with well-structured repositories, reliable tests, strong API contracts, and observable systems will benefit disproportionately. Teams with fragile pipelines and tribal knowledge will discover that AI does not remove chaos; it accelerates it.
      </p>

      <h2>Where Agentic Workflows Actually Help</h2>
      <p>
        The strongest near-term use cases are not replacing engineers. They are compressing high-friction work. Incident triage, flaky test analysis, dependency upgrade validation, migration assistance, changelog creation, release note drafting, architecture discovery, and repetitive refactoring are all strong candidates.
      </p>
      <p>
        These tasks share a pattern: they involve multiple steps, tool usage, context gathering, and structured judgment. They are expensive for humans not because they are intellectually impossible, but because they are operationally annoying. Agents thrive in annoying territory.
      </p>

      <h2>The Architectural Requirements</h2>
      <p>
        If you want agentic engineering to work in a serious environment, you need more than a model endpoint. You need an execution architecture. At minimum, that means explicit tool interfaces, auditable permissions, reproducible environments, and deterministic checkpoints. An agent that can modify production infrastructure without tight scope, logging, and rollback is not innovation. It is a beautifully automated outage.
      </p>
      <p>
        There is also a design discipline here: every action an agent can take should be exposed through stable, well-defined contracts. If your deployment process depends on Slack archaeology and one senior engineer's memory, the agent is not your problem. Your operating model is.
      </p>

      <h2>Trust, Verification, and the New Human Role</h2>
      <p>
        The human role does not vanish. It moves up the stack. Engineers become reviewers of intent, policy designers, system decomposers, and exception handlers. The best teams will treat agents the way good organizations treat junior engineers: give them constrained autonomy, clear tasks, fast feedback, and strong review boundaries.
      </p>
      <p>
        Verification becomes central. Not because AI is uniquely flawed, but because software delivery already needed stronger verification. Agents just make the weakness harder to ignore. If a workflow cannot be safely verified, it should not be safely automated.
      </p>

      <h2>The Risks Most Teams Underestimate</h2>
      <p>
        The biggest risk is not hallucinated code. It is false confidence. When an agent produces output in a clean, structured, convincing way, teams may skip the messy but necessary thinking that real engineering demands. Another risk is local optimization: an agent may improve one repository, service, or pipeline step while creating hidden costs somewhere else, especially in distributed systems with shared ownership.
      </p>
      <p>
        There is also organizational drift. If teams outsource too much reasoning too early, they may slowly lose the ability to explain why systems work the way they do. That is survivable in a toy app. In a regulated platform, a bank, or a safety-critical product, it becomes a governance problem.
      </p>

      <h2>How to Adopt Agentic Workflows Without Losing the Plot</h2>
      <p>
        Start with narrow loops, not grand visions. Pick workflows with clear boundaries and measurable pain: pull request summaries, test failure clustering, dependency remediation, runbook drafting, environment diff analysis. Instrument the workflow. Measure cycle time, review burden, failure rate, and rollback frequency. Then increase autonomy only where evidence supports it.
      </p>
      <p>
        The mature pattern is progressive delegation. First the agent suggests. Then it executes in sandboxes. Then it acts on low-risk systems with approval gates. Only much later should it touch critical delivery paths with any meaningful independence.
      </p>

      <h2>The Real Opportunity</h2>
      <p>
        The long-term opportunity is not just faster code generation. It is the creation of engineering systems that can reason about themselves. Systems that can inspect their own health, map their own dependencies, document their own changes, and propose their own improvements will change the economics of software delivery.
      </p>
      <p>
        But that future belongs to teams that invest in structure. Agentic workflows reward explicitness: better contracts, better tooling, better observability, better boundaries. In that sense, AI is not replacing software engineering discipline. It is finally charging interest on whether you had any.
      </p>
    `
  },
  {
    slug: 'modernizing-banking-legacy-to-cloud',
    title: 'Modernizing Banking: A Pragmatic Path from Legacy to Cloud-Native',
    description: 'A deep dive into the challenges and strategies for migrating critical financial data flows to Azure AKS in a regulated environment.',
    date: '2025-03-20',
    readingTime: '12 min read',
    tags: ['Banking', 'Cloud Migration', 'Azure', 'AKS'],
    content: `
      <h2>The Legacy Gravity Well</h2>
      <p>
        Modernizing banking systems is rarely blocked by a lack of cloud services. It is blocked by gravity. Legacy platforms accumulate critical data, fragile dependencies, undocumented assumptions, and organizational fear. Over time, the system becomes so central that every team depends on it, but nobody wants to touch it. That is the gravity well.
      </p>
      <p>
        Moving financial workloads to Azure AKS or any cloud-native platform is therefore not just a migration exercise. It is a structural redesign under regulatory pressure. The goal is not to "lift and shift the old mess into Kubernetes." The goal is to reduce coupling, improve operability, and create a platform that can evolve without requiring six teams, three committees, and a ritual sacrifice for every change.
      </p>

      <h2>Why Banking Modernization Is Different</h2>
      <p>
        In many industries, a failed migration is expensive. In banking, it can also be reportable, auditable, and reputationally damaging. Critical customer data, identity flows, batch processing, reconciliation, downstream integrations, and compliance controls all sit inside the modernization path. You are not only changing technology. You are changing the system of record around money, trust, and accountability.
      </p>
      <p>
        That changes the success criteria. Speed matters, but controlled change matters more. A flashy migration that ignores traceability, rollback design, or data lineage is not modern. It is merely reckless with a cloud bill attached.
      </p>

      <h2>The Wrong Mental Model: Big-Bang Replacement</h2>
      <p>
        The most dangerous modernization fantasy is the clean replacement: rebuild the legacy stack as microservices, migrate everything in phases, then switch it on and enjoy the future. That story looks great on slides and collapses on contact with reality.
      </p>
      <p>
        Legacy banking systems are usually entangled with processes nobody fully owns end to end. There are hidden consumers, operational shortcuts, manual exception flows, and reconciliation logic that only appears at month-end or in production failure scenarios. A big-bang approach assumes understanding you almost never have.
      </p>

      <h2>The Better Approach: Build Paved Roads</h2>
      <p>
        A practical modernization strategy creates paved roads: repeatable, approved ways for teams to migrate safely. Instead of each team reinventing deployment, observability, security, networking, secrets, CI/CD, and runtime configuration, the platform provides golden paths. In Azure AKS, that usually means standardized service templates, secure ingress patterns, managed identity, policy-as-code, logging, tracing, and deployment controls built into the platform from day one.
      </p>
      <p>
        This matters because migration is not just about moving code. It is about making the safe path the easy path. If the cloud-native route is harder than the legacy workaround, the organization will drift back to the workaround every time.
      </p>

      <h2>Start with Flow Decomposition, Not Service Decomposition</h2>
      <p>
        Teams often jump too quickly into carving legacy systems into services. A better starting point is flow decomposition. Identify the critical business flows first: customer onboarding, account updates, payments, reconciliations, notifications, regulatory reporting, and so on. Understand where data originates, where side effects happen, what systems of record exist, and where timing constraints matter.
      </p>
      <p>
        Once the flows are visible, architectural boundaries become more honest. Some components can be extracted early. Others should remain behind stable interfaces until dependencies are understood. A service boundary drawn without operational context is just a future incident diagram.
      </p>

      <h2>Data Is the Hard Part</h2>
      <p>
        Most legacy modernization pain is data pain in disguise. Shared schemas, mainframe-originated identifiers, batch dependencies, mutable reference data, and downstream consumers create a web of coupling that infrastructure upgrades alone cannot fix. This is why many "modernized" platforms still behave like legacy systems in nicer packaging.
      </p>
      <p>
        The answer is not blindly duplicating everything into microservices. The answer is ownership. Decide which domain owns which data, how it is published, which consumers get events versus APIs versus read models, and how reconciliation works when systems inevitably diverge for a period of time. In banking, eventual consistency is often acceptable, but unexplained inconsistency is not.
      </p>

      <h2>AKS Is an Enabler, Not a Strategy</h2>
      <p>
        Azure Kubernetes Service can be an excellent execution platform for modernization, especially when you need portability of deployment patterns, isolation between workloads, mature observability, and strong automation. But AKS by itself does not solve architecture. It gives you a place to run the new system. It does not decide whether the new system is well-designed.
      </p>
      <p>
        Too many programs treat Kubernetes adoption as proof of modernization. It is not. You can absolutely build a distributed legacy platform on AKS if you containerize bad boundaries fast enough.
      </p>

      <h2>Reliability Has to Be Designed In</h2>
      <p>
        Banking modernization must preserve trust while change is happening. That means designing for dual operation, not just target-state elegance. Old and new systems will coexist. Some flows will remain on the legacy platform while new services consume or enrich the same business process. During that phase, reliability depends on clear fallback rules, observability across both worlds, idempotent processing, and disciplined release strategies.
      </p>
      <p>
        Blue-green deployment, canary rollouts, feature flags, replayable events, dead-letter handling, and reconciliation jobs stop being "nice DevOps practices" and become core banking safety mechanisms. The difference between a controlled migration and a production scandal is often whether you planned for partial failure.
      </p>

      <h2>Security and Compliance Cannot Be Bolted On</h2>
      <p>
        Regulated environments demand traceability: who changed what, when, why, and under which authorization model. That has implications far beyond authentication. It affects infrastructure provisioning, runtime access, secrets handling, audit logging, data retention, incident response, and even the shape of service interfaces.
      </p>
      <p>
        The strongest modernization programs treat compliance controls as platform features. Infrastructure as code, policy enforcement, workload identity, network segmentation, and immutable deployment records reduce both risk and cognitive load. Engineers should not have to manually remember every compliance rule. The platform should enforce the important ones by default.
      </p>

      <h2>Migration Is as Much Organizational as Technical</h2>
      <p>
        Legacy systems survive because organizations adapt around them. People learn hidden procedures. Teams optimize locally. Risk committees grow around fragile components. Over time, the technical architecture becomes inseparable from the organizational architecture.
      </p>
      <p>
        That means modernization requires explicit operating model changes. Ownership must become clearer. Cross-team dependencies must become visible. Platform teams need a real mandate. Delivery teams need better documentation, better contracts, and better escalation paths. If you migrate the system without changing the collaboration model, the old dysfunction simply reappears in containers.
      </p>

      <h2>A Pragmatic Migration Sequence</h2>
      <p>
        In practice, the most credible path looks like this: first stabilize and observe the current flows; then establish cloud platform standards; then extract low-risk but high-value components; then isolate domain ownership and interfaces; then gradually move critical flows behind better boundaries. Throughout this process, measure operational improvement, not just migration progress.
      </p>
      <p>
        A migration dashboard that celebrates "number of services moved to AKS" can be dangerously misleading. Better metrics are deployment frequency, rollback rate, mean time to restore, change failure rate, recovery confidence, and reduction in cross-team coordination for routine changes.
      </p>

      <h2>What Success Actually Looks Like</h2>
      <p>
        Successful banking modernization does not feel revolutionary on the surface. Customers still expect their accounts, payments, and identity flows to work every time. The visible outcome is often boring: fewer incidents, faster changes, clearer ownership, better resilience, easier audits, and less fear around release day.
      </p>
      <p>
        That is the paradox. The most successful modernization programs do not look dramatic from the outside. Internally, though, they replace dependence on heroics with dependence on systems. And that is what real modernization is: not newer technology for its own sake, but a safer and more adaptable institution built on better engineering constraints.
      </p>
    `
  }
]
