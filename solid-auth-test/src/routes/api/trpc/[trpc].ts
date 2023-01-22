import { createSolidAPIHandler } from "solid-start-trpc";
import { appRouter } from "~/server/api/root";
import { createContext } from "~/server/api/trpc";

const handler = createSolidAPIHandler({
  router: appRouter,
  createContext,
});

export const GET = handler;
export const POST = handler;
