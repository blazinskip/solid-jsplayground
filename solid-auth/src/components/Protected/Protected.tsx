import { type Session } from "@auth/core";
import { getToken } from "@auth/core/jwt";
import { getSession } from "@solid-auth/next";
import { Component, Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { serverEnv } from "~/env/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";

const Protected = (Comp: IProtectedComponent) => {
  const routeData = () => {
    return createServerData$(
      async (_, event) => {
        const token = await getToken({
          req: event.request,
          secret: serverEnv.AUTH_SECRET,
          raw: false,
        });
        console.log({ token });

        const session = await getSession(event.request, authOpts);
        if (!session || !session.user) {
          throw redirect("/");
        }
        return session;
      },
      { key: () => ["auth_user"] }
    );
  };

  return {
    routeData,
    Page: () => {
      const session = useRouteData<typeof routeData>();
      return (
        <Show when={session()} keyed>
          {(sess) => <Comp {...sess} />}
        </Show>
      );
    },
  };
};

type IProtectedComponent = Component<Session>;

export default Protected;
