import { createTRPCRouter } from "./trpc";
import { todosRouter } from "./routers/todosRoute";
import { projectsRoutes } from "./routers/projectsRoutes";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  todos: todosRouter,
  projects: projectsRoutes,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
