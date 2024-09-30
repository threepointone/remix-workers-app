import { createRequestHandler, logDevReady } from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: Env;
  }
}

const handleRemixRequest = createRequestHandler(build);

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export default {
  async fetch(request: Request, env: Env) {
    return handleRemixRequest(request, {
      env: env,
    });
  },
} satisfies ExportedHandler<Env>;
