// /app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import path from "path";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Cari user di database
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .limit(1);

    if (error || users.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const user = users[0];

    //check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //generate token
    const token = crypto.randomUUID();

    //simpan ke tabel sessions
    await supabase
        .from("sessions")
        .insert([{ token, user_id: user.id, expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }]);

    //set cookie HttpOnly
    const cookieStore = await cookies();
        cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 hari
        path: "/",
    });

    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
