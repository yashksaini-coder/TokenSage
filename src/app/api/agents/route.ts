import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { env } from "@/providers/env";

export async function GET(request: NextRequest) {
    const response = await axios.get(env.backendUrl + "/agents");
    return NextResponse.json({ message: response.data });
}

