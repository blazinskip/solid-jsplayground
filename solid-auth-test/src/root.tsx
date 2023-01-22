// @refresh reload
import "./root.css";
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { api, client, queryClient } from "./utils/api";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Create JD App</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <api.Provider client={client} queryClient={queryClient}>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </api.Provider>
        <Scripts />
      </Body>
    </Html>
  );
}
