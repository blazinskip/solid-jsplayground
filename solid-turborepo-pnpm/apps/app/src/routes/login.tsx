import { signIn } from "@auth/solid-start/client";

export default function LoginPage() {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]">
      <div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div class="flex flex-col items-center gap-2">
          <p class="text-2xl text-white">Sign In</p>
          <div class="flex flex-col items-center justify-center gap-4">
            <button
              class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signIn("discord")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
