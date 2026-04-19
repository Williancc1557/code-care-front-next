"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { getAuthToken } from "@/lib/auth-token";

const HOME_PATH = "/";

export function RequireGuest({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (getAuthToken()) {
      router.replace(HOME_PATH);
      return;
    }
    setShow(true);
  }, [router]);

  if (!show) {
    return null;
  }

  return <>{children}</>;
}
