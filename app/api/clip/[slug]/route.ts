import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const MAX_CLIP_SIZE = 50_000; // 50KB limit
const TTL_SECONDS = 86_400; // 24 hours

function clipKey(slug: string) {
    return `clip:${slug}`;
}

// GET — Retrieve clip content
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const content = await redis.get<string>(clipKey(slug));

        return NextResponse.json({
            slug,
            content: content ?? null,
            exists: content !== null,
        });
    } catch (error) {
        console.error("GET clip error:", error);
        return NextResponse.json(
            { error: "Failed to retrieve clip" },
            { status: 500 }
        );
    }
}

// POST — Save clip content (with 24h TTL)
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { content } = body;

        if (typeof content !== "string") {
            return NextResponse.json(
                { error: "Content must be a string" },
                { status: 400 }
            );
        }

        if (content.length > MAX_CLIP_SIZE) {
            return NextResponse.json(
                { error: `Content exceeds maximum size of ${MAX_CLIP_SIZE} characters` },
                { status: 413 }
            );
        }

        await redis.set(clipKey(slug), content, { ex: TTL_SECONDS });

        return NextResponse.json({
            slug,
            saved: true,
            expiresIn: TTL_SECONDS,
        });
    } catch (error) {
        console.error("POST clip error:", error);
        return NextResponse.json(
            { error: "Failed to save clip" },
            { status: 500 }
        );
    }
}

// DELETE — Remove clip
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await redis.del(clipKey(slug));

        return NextResponse.json({
            slug,
            deleted: true,
        });
    } catch (error) {
        console.error("DELETE clip error:", error);
        return NextResponse.json(
            { error: "Failed to delete clip" },
            { status: 500 }
        );
    }
}
