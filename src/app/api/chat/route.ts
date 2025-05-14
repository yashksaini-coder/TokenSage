import { NextResponse } from "next/server";
import {env} from "@/providers/env";

export async function POST(req: Request) {
    const { query } = await req.json();

    if (!query) {
        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    const response = await fetch(`${env.backendUrl}/v1/agents/finance_agent/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: query,
            stream: false,
            model: "gemini-1.5-flash"
        })
    });

    const data = await response.json();

    return NextResponse.json(data);
}
