package dev.gionag.article;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

final class OpenAiCompatibleClient {
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private final URI completionsUri;
    private final String apiKey;
    private final String model;

    OpenAiCompatibleClient(URI baseUri, String apiKey, String model) {
        this.completionsUri = URI.create(
            baseUri.toString().replaceAll("/$", "") + "/chat/completions"
        );
        this.apiKey = apiKey;
        this.model = model;
    }

    LeadQualification qualify(String description) throws IOException, InterruptedException {
        var body = mapper.createObjectNode();
        body.put("model", model);
        body.putObject("response_format").put("type", "json_object");
        var messages = body.putArray("messages");
        messages.addObject()
            .put("role", "system")
            .put("content", "Return a JSON lead qualification with companyName, contactEmail, companySize, interestArea, and qualified.");
        messages.addObject()
            .put("role", "user")
            .put("content", description);

        var request = HttpRequest.newBuilder(completionsUri)
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + apiKey)
            .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body)))
            .build();

        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() / 100 != 2) {
            throw new IOException("Provider returned HTTP " + response.statusCode() + ": " + response.body());
        }

        JsonNode envelope = mapper.readTree(response.body());
        JsonNode content = envelope.at("/choices/0/message/content");
        if (!content.isTextual()) {
            throw new IOException("Provider response did not contain choices[0].message.content");
        }
        return mapper.readValue(content.textValue(), LeadQualification.class);
    }
}
