import { SolidAuth, type SolidAuthConfig } from "@solid-auth/next";
import GitHub from "@auth/core/providers/github";
import { serverEnv } from "~/env/server";
import { type APIEvent } from "solid-start";

console.log({ serverEnv });

export const authOpts: SolidAuthConfig = {
  secret: serverEnv.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      console.log({ session, token });

      return {
        ...session,
        token,
      };
    },
    async jwt({ token, user }) {
      console.log({ token, user });

      if (user) {
        return user;
      }

      return token;
    },
  },
  providers: [
    GitHub({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_SECRET,
    }),
  ],
  debug: true,
};

export const { GET, POST } = SolidAuth(authOpts);
