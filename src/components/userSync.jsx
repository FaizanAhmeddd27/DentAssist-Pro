"use client";

import React, { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUser } from "@/lib/actions/users"; // adjust path if different

export default function UserSync() {
  const { isSignedIn, isLoaded } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    const handleUserSync = async () => {
      if (!isLoaded || !isSignedIn) return;
      if (hasSynced.current) return;

      hasSynced.current = true;

      try {
        await syncUser();
      } catch (error) {
        console.error("User sync failed:", error);
        // allow retry if it fails
        hasSynced.current = false;
      }
    };

    handleUserSync();
  }, [isLoaded, isSignedIn]);

  return null;
}
