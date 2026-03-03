import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("rsvp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, attendance, guests } = body;

  if (!name || !attendance) {
    return NextResponse.json({ error: "Name and attendance required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("rsvp")
    .insert({ name, attendance, guests: guests || 1 })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
