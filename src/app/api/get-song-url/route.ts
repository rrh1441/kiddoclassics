import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("sessions")
    .select("song_url, status")
    .eq("session_id", sessionId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No record found" }, { status: 404 });
  }

  return NextResponse.json({ songUrl: data.song_url, status: data.status });
}
