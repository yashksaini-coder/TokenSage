import { NextResponse } from "next/server";
import { env } from "@/providers/env";

export async function GET() {
  try {
    const endpoint = `https://api.covalenthq.com/v1/${env.chainName}/address/${env.walletAddress}/portfolio_v2/`;
    const res = await fetch(endpoint, {
      headers: {
        "Authorization": `Basic ${btoa(env.apiKey + ':')}`,
      },
    });
    const data = await res.json();
    return NextResponse.json({ data: data.data.items });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}
