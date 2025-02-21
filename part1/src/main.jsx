import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotContextProvider } from "./notificationContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
<NotContextProvider>
<Router>
<App />
</Router>
</NotContextProvider>
</QueryClientProvider>
);
