// /api/auth/logout
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const token = cookies.get("session")?.value;

    if (token) {
        // Hapus session dari tabel sessions
        await supabase.from("sessions").delete().eq("token", token);
    }

    // Hapus cookie
    cookies().set("session");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
