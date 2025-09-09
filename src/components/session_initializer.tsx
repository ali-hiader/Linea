"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth_store";
import { Session } from "better-auth";

interface Props {
  session: Session | undefined;
}

export function SessionInitializer({ session }: Props) {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    if (session) {
      setSession(session);
    } else setSession(null);
  }, [session, setSession]);

  return null;
}
