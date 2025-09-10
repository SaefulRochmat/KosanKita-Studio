// hooks/useMomentTable.js
"use client";
import { useState, useMemo } from "react";

export default function useMomentTable(moments) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Filter berdasarkan tab (image/video)
  const filterByType = (type) => {
    if (type === "image") {
      return moments.filter((m) => m.image_url);
    }
    if (type === "video") {
      return moments.filter((m) => m.video_url || m.video_public_id);
    }
    return [];
  };

  // Filter pencarian case-insensitive
  const filterBySearch = (data) => {
    return data.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Data paginasi
  const paginate = (data) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  // Final data setelah filter
  const getData = (type) => {
    const filtered = filterBySearch(filterByType(type));
    const paginated = paginate(filtered);
    return {
      data: paginated,
      totalPages: Math.ceil(filtered.length / itemsPerPage),
    };
  };

  return { search, setSearch, page, setPage, getData };
}
