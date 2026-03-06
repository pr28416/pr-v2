"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "@/lib/sessionContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useSession } from "@/lib/sessionContext";
import { EventType } from "@/lib/types";

function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { submitEvent } = useSession();

  useEffect(() => {
    submitEvent(EventType.PageVisit, {
      destination: pathname,
      source: window.location.pathname,
      query: searchParams.toString(),
      navigation_type: "client",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Analytics />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
        disableTransitionOnChange
      >
        <Suspense>
          <NavigationEvents />
        </Suspense>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
