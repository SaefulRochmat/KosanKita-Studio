"use client";
import { useState } from "react";

export default function useUpdateMoment() {
  const [loading, setLoading] = useState(false);

  const updateMoment = async (id, title, description) => {
    try {
      setLoading(true);
      const res = await fetch("/api/moments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error updating:", err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { updateMoment, loading };
}
