// /app/api/moments/route.js

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import cloudinary from '@/lib/cloudinary.js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


// POST: Upload gambar + simpan ke DB
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    //const created_by = formData.get("created_by");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // convert file ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // deteksi file type (image / video)
    const mime = file.type.startsWith("video") ? "video" : "image";

    // upload ke Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "website-kelas", resource_type: mime }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // insert ke Supabase
    const { data, error } = await supabase
      .from("moments")
      .insert([
        {
          title,
          description,
          image_url: mime === "image" ? uploadResult.secure_url : null,
          video_url: mime === "video" ? uploadResult.secure_url : null,
          video_public_id: mime === "video" ? uploadResult.public_id : null, // simpan public_id
          //created_by,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error insert moment:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: Ambil semua moments
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("moments")
      .select("id, title, description, image_url, video_url, video_public_id, created_at");

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetch moments:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Hapus moment
export async function DELETE(req) {
  try {
    const { id, video_public_id } = await req.json();

    const { error } = await supabase.from("moments").delete().eq("id", id);
    if (error) throw error;

    // hapus video dari Cloudinary jika ada
    if (video_public_id) {
      await cloudinary.uploader.destroy(video_public_id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error delete moment:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Update moment (title & description)
export async function PUT(req) {
  try {
    const { id, title, description } = await req.json();

    const { data, error } = await supabase
      .from("moments")
      .update({ title, description })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error update moment:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

