import { NextResponse } from "next/server";

const url = process.env.PARSE_SERVER_URL ?? "";
const appId = process.env.PARSE_APP_ID ?? "";
const key = process.env.PARSE_JAVASCRIPT_KEY ?? "";
const configured = Boolean(url && appId && key);

const headers = {
  "Content-Type": "application/json",
  "X-Parse-Application-Id": appId,
  "X-Parse-Javascript-Key": key,
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      commentId?: string;
      visitorId?: string;
    };

    const commentId = typeof body.commentId === "string" ? body.commentId.trim().slice(0, 80) : "";
    const visitorId = typeof body.visitorId === "string" ? body.visitorId.trim().slice(0, 80) : "";

    if (!commentId || !visitorId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!configured) {
      // Local optimistic update - return success
      return NextResponse.json({ liked: true, likeCount: 1 }, { status: 200 });
    }

    // Check if user already liked this comment
    const checkResponse = await fetch(
      `${url}/classes/CommentLike?${new URLSearchParams({
        where: JSON.stringify({ commentId, visitorId }),
        limit: "1",
      })}`,
      { headers }
    );

    if (!checkResponse.ok) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const checkData = (await checkResponse.json()) as { results?: unknown[] };
    const existingLike = checkData.results?.[0] as { objectId?: string } | undefined;

    let liked = false;

    if (existingLike?.objectId) {
      // Unlike - delete the like
      const deleteResponse = await fetch(`${url}/classes/CommentLike/${existingLike.objectId}`, {
        method: "DELETE",
        headers,
      });

      if (!deleteResponse.ok) {
        return NextResponse.json({ error: "Failed to unlike" }, { status: 500 });
      }
      liked = false;
    } else {
      // Like - create new like
      const createResponse = await fetch(`${url}/classes/CommentLike`, {
        method: "POST",
        headers,
        body: JSON.stringify({ commentId, visitorId }),
      });

      if (!createResponse.ok) {
        return NextResponse.json({ error: "Failed to like" }, { status: 500 });
      }
      liked = true;
    }

    // Get updated like count
    const countResponse = await fetch(
      `${url}/classes/CommentLike?${new URLSearchParams({
        where: JSON.stringify({ commentId }),
        count: "1",
        limit: "0",
      })}`,
      { headers }
    );

    const countData = (await countResponse.json()) as { count?: number };
    const likeCount = Math.max(0, countData.count ?? 0);

    return NextResponse.json({ liked, likeCount }, { status: 200 });
  } catch (error) {
    console.error("Like API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
