import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "server is up and running!",
    time: Date.now(),
  });
}
