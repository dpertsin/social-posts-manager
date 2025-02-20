import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
