import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:5000/openapi/v1.json", // put your OpenAPI spec URL here
  output: "src/client", // put your output directory here
  plugins: ["@hey-api/client-axios", "@tanstack/react-query"],
});
