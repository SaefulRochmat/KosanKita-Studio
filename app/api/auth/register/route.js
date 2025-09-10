// /app/api/auth/register/route.js

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke tabel users
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password: hashedPassword }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}