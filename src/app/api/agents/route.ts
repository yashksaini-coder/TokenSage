import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { env } from "@/providers/env";

export async function GET(request: NextRequest) {
    try {
        const response = await axios.get(env.backendUrl + "/v1/agents/list-agents");
        return NextResponse.json({ message: response.data });
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch agents' },
            { status: 500 }
        );
    }
}
