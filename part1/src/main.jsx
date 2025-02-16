import ReactDOM from "react-dom/client";
import App from "./App";
import { NotContextProvider } from "./notificationContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
<NotContextProvider>
<App />
</NotContextProvider>
</QueryClientProvider>
);
