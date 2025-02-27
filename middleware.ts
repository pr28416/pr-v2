import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { submitEvent } from "@/lib/actions";
import { EventType } from "@/lib/types";

export async function middleware(request: NextRequest) {
    // Only process GET requests for HTML pages
    if (
        request.method !== "GET" ||
        !request.headers.get("accept")?.includes("text/html") ||
        request.headers.get("purpose") === "prefetch" ||
        // Skip if it's a client-side navigation
        request.headers.get("x-nextjs-data")
    ) {
        return NextResponse.next();
    }

    // Get or create session ID
    let sessionId = request.cookies.get("pr_site_session_id")?.value;
    if (!sessionId) {
        sessionId = uuidv4();
    }

    // Create response
    const response = NextResponse.next();

    // Set cookie if it doesn't exist
    if (!request.cookies.get("pr_site_session_id")) {
        response.cookies.set("pr_site_session_id", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    // Only track initial page loads, not client-side navigation
    if (!request.headers.get("x-nextjs-data")) {
        const destination = new URL(request.url);
        const source = request.headers.get("referer")
            ? new URL(request.headers.get("referer")!)
            : null;

        await submitEvent(
            sessionId,
            EventType.PageVisit,
            destination.pathname,
            {
                destination: destination.pathname,
                source: source?.pathname || "",
                source_domain: source?.host || "",
                query: destination.search || "",
                navigation_type: "initial",
            },
        );
    }

    return response;
}

// Only run middleware on actual page routes
export const config = {
    matcher: [
        /*
         * Match all page routes:
         * - `/`
         * - `/about`
         * - `/projects`
         * - `/work`
         * But exclude:
         * - API routes
         * - Static files
         * - Assets
         * - Images
         * - Favicon
         */
        "/((?!_next|api|static|public|favicon.ico).*)",
    ],
};
