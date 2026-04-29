import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const queryClient = new QueryClient();

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <>
      <CursorGlow />
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  ),
});

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// Route tree
const routeTree = rootRoute.addChildren([homeRoute]);

// 🔥 IMPORTANT FIX (GitHub Pages ke liye)
const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

// Types (leave as it is)
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// App
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
