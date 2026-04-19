"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearAuthToken } from "@/lib/auth-token";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        clearAuthToken();
        router.replace("/auth/login");
      }}
    >
      <LogOut data-icon="inline-start" className="size-4" />
      Log out
    </Button>
  );
}
