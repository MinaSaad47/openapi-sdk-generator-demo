import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { client } from "./client/client.gen.ts";
import "./index.css";

client.setConfig({
  baseURL: "http://localhost:5000",
});

const queryCLient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryCLient}>
    <App />
  </QueryClientProvider>
);
