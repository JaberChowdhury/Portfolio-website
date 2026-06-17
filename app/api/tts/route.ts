import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");

    if (!text) {
      return NextResponse.json(
        { error: "Missing text parameter" },
        { status: 400 },
      );
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;

    const res = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error(`Google TTS API returned status ${res.status}`);
      return NextResponse.json(
        { error: "Failed to fetch TTS audio" },
        { status: res.status },
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", "audio/mpeg");
    headers.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=3600",
    );

    return new NextResponse(res.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error in TTS proxy API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
