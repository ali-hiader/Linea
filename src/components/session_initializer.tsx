"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/stores/auth_store";

export function SessionInitializer() {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res.data?.session ?? null);
    });
  }, [setSession]);

  return null;
}
