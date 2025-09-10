"use client";
import { useState } from "react";

export default function useDeleteMoment() {
  const [loading, setLoading] = useState(false);

  const deleteMoment = async (id, video_public_id) => {
    try {
      setLoading(true);
      const res = await fetch("/api/moments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, video_public_id }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error deleting:", err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteMoment, loading };
}
