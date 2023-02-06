import { Suspense, type VoidComponent } from "solid-js";
import { trpc } from "../utils/trpc";
import { signOut, signIn } from "@auth/solid-start/client";
import { createServerData$, redirect } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { authOpts } from "./api/auth/[...solidauth]";

const Home: VoidComponent = () => {
	const hello = trpc.example.hello.useQuery(() => ({ name: "from tRPC" }));

	return (
		<main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]">
			<div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<div class="flex flex-col items-center gap-2">
					<p class="text-2xl text-white">
						{hello.data ?? "Loading tRPC query"}
					</p>
					<Suspense>
						<AuthShowcase />
					</Suspense>
				</div>
			</div>
		</main>
	);
};

export default Home;

const AuthShowcase: VoidComponent = () => {
	const sessionData = createSession();
	return (
		<div class="flex flex-col items-center justify-center gap-4">
			<p class="text-center text-2xl text-white">
				{sessionData() && <span>Logged in as {sessionData()?.user?.name}</span>}
			</p>
			<button
				class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
				onClick={
					sessionData() ? () => void signOut() : () => void signIn("discord")
				}
			>
				{sessionData() ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
};

const createSession = () => {
	return createServerData$(async (_, event) => {
		const session = await getSession(event.request, authOpts);
		if (!session) {
			throw redirect("/login");
		}

		return session;
	});
};
