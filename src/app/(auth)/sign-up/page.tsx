import { signUp } from "@/actions/user-actions";

export default function Page() {
  return (
    <main className="flex items-center justify-center mt-10">
      <form action={signUp}>
        <input type="text" />
        <input type="email" />
        <input type="password" />
      </form>
    </main>
  );
}
