// /app/hooks/useUploadMoments.js

'use client'
import { useState } from "react";

export default function useUploadMoments() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("created_by", "uuid-admin-disini"); // nanti isi sesuai login admin
    
    try {
      setIsLoading(true); //mulai loading
      const res = await fetch("/api/moments", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Moment created:", data);

      if (res.ok) {
        setTitle("");
        setDescription("");
        e.target.reset();
      }
      return data;

    } catch (error) {
      console.error("upload gagal:", error);
    } finally {
      setIsLoading(false);
    }

  }; return { handleSubmit, title, setTitle, description, setDescription, isLoading }
}