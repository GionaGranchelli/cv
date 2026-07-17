package dev.gionag.article;

import java.net.URI;

public final class Main {
    private static final String LEAD =
        "A Berlin startup with 12 employees needs a custom CRM. Contact lead@example.com.";

    private Main() {
    }

    public static void main(String[] args) throws Exception {
        boolean live = args.length > 0 && "--live".equals(args[0]);
        if (live) {
            runLive();
            return;
        }

        try (var server = MockOpenAiServer.start()) {
            var client = new OpenAiCompatibleClient(server.baseUri(), "local-test-key", "mock-model");
            System.out.println(client.qualify(LEAD));
        }
    }

    private static void runLive() throws Exception {
        String apiKey = requiredEnvironmentVariable("AI_API_KEY");
        URI baseUri = URI.create(System.getenv().getOrDefault(
            "AI_BASE_URL",
            "https://api.openai.com/v1"
        ));
        String model = System.getenv().getOrDefault("AI_MODEL", "gpt-4o-mini");

        var client = new OpenAiCompatibleClient(baseUri, apiKey, model);
        System.out.println(client.qualify(LEAD));
    }

    private static String requiredEnvironmentVariable(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(name + " is required in live mode");
        }
        return value;
    }
}
