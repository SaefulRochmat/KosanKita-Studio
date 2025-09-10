"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
   const [url, setUrl] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUrl(data.url);
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <input type="file" onChange={handleUpload} />
      {url && <Image src={url} width={100} height={100} alt="uploaded" className="w-40 mt-4" />}
    </div>
  );
}
