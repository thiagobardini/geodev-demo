import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }
  return NextResponse.json({ user: session.user }, { status: 200 });
}
