import { getUser } from "../../../../../lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await getUser(request as any);
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }
    
    const user = await response.json();

    return NextResponse.json(user, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error("Error in /api/stats/user:", error);
    if (error instanceof Error) {
      if (error.message === "Not authenticated") {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      if (error.message === "No access token found") {
        return NextResponse.json({ error: "No access token found" }, { status: 401 });
      }
      if (error.message === "Access token expired") {
        return NextResponse.json({ error: "Access token expired" }, { status: 401 });
      }
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 