package dev.gionag.article;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;

final class MockOpenAiServer implements AutoCloseable {
    private static final String RESPONSE = """
        {
          "choices": [{
            "message": {
              "role": "assistant",
              "content": "{\\"companyName\\":\\"Example GmbH\\",\\"contactEmail\\":\\"lead@example.com\\",\\"companySize\\":12,\\"interestArea\\":\\"custom CRM\\",\\"qualified\\":true}"
            }
          }]
        }
        """;

    private final HttpServer server;

    private MockOpenAiServer(HttpServer server) {
        this.server = server;
    }

    static MockOpenAiServer start() throws IOException {
        var server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/v1/chat/completions", MockOpenAiServer::respond);
        server.start();
        return new MockOpenAiServer(server);
    }

    URI baseUri() {
        return URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/v1");
    }

    private static void respond(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(405, -1);
            exchange.close();
            return;
        }
        byte[] bytes = RESPONSE.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, bytes.length);
        exchange.getResponseBody().write(bytes);
        exchange.close();
    }

    @Override
    public void close() {
        server.stop(0);
    }
}
