"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { submitEvent } from "./actions";
import { getDeviceMetadata } from "./utils";
import { EventType } from "./types";

type SessionContextType = {
  sessionId: string;
  submitEvent: (
    event: EventType,
    userMetadata?: Record<string, string>
  ) => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Try to get existing session from localStorage
    const existingSession = localStorage.getItem("pr_site_session_id");
    const finalSessionId = existingSession || uuidv4();

    if (!existingSession) {
      localStorage.setItem("pr_site_session_id", finalSessionId);
    }

    setSessionId(finalSessionId);
  }, []);

  const handleSubmitEvent = async (
    event: EventType,
    userMetadata: Record<string, string> = {}
  ) => {
    if (!sessionId) return;

    // Combine device metadata with user metadata
    const deviceMetadata = getDeviceMetadata();
    const combinedMetadata = {
      ...deviceMetadata,
      ...userMetadata, // User metadata takes precedence
    };
    const path = window.location.pathname;

    await submitEvent(sessionId, event, path, combinedMetadata);
  };
  return (
    <SessionContext.Provider
      value={{
        sessionId,
        submitEvent: handleSubmitEvent,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
