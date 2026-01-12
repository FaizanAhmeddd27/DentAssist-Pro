"use client";

import { useQuery } from "@tanstack/react-query";

export function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await fetch("/api/appointments", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return res.json();
    },
    initialData: [],
  });
}
