"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors", { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    },
  });
}

export function useCreateDoctor() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("Doctor added");
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => toast.error("Email already exists"),
  });
}

export function useUpdateDoctor() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("Doctor updated");
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => toast.error("Update failed"),
  });
}

export function useDeleteDoctor() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("Doctor deactivated");
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: () => toast.error("Delete failed"),
  });
}
