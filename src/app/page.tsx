import Image from "next/image";
import { LogoutButton } from "@/components/auth/logout-button";
import { RequireAuth } from "@/components/auth/require-auth";

export default function Home() {
  return (
    <RequireAuth>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex w-full max-w-3xl justify-end px-16 pt-8">
          <LogoutButton />
        </div>
      </div>
    </RequireAuth>
  );
}
