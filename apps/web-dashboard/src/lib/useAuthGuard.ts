"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { isAuthenticated } from "./auth";

export function useAuthGuard(): { locale: string } {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(`/${locale}/login`);
    }
  }, [locale, router]);

  return { locale };
}
