/**
 * This is the client-side entrypoint for your tRPC API.
 * It's used to create the `api` object which contains the Next.js App-wrapper
 * as well as your typesafe react-query hooks.
 *
 * We also create a few inference helpers for input and output types
 */
import { QueryClient } from "@tanstack/query-core";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { createTRPCSolid } from "solid-trpc";
import superjson from "superjson";

import { type AppRouter } from "../server/api/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

/**
 * A set of typesafe react-query hooks for your tRPC API
 */
export const api = createTRPCSolid<AppRouter>({});

export const client = api.createClient({
  /**
   * Transformer used for data de-serialization from the server
   * @see https://trpc.io/docs/data-transformers
   **/
  transformer: superjson,

  /**
   * Links used to determine request flow from client to server
   * @see https://trpc.io/docs/links
   * */
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
export const queryClient = new QueryClient();

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
