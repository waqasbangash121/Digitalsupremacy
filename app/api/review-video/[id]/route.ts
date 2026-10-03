import { reviews } from "@/lib/reviews";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!reviews.some(review => review.video === id)) return new Response("Not found", { status: 404 });
  const range = request.headers.get("range");
  if (range && !/^bytes=\d*-\d*$/.test(range)) return new Response("Invalid range", { status: 416 });
  try {
    const upstream = await fetch(`https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`, {
      headers: range ? { Range: range } : {}, cache: "no-store", signal: request.signal,
    });
    if (upstream.status === 416) return new Response(null, { status: 416, headers: { "Content-Range": upstream.headers.get("content-range") || "bytes */*" } });
    const contentType = upstream.headers.get("content-type") || "";
    if (!upstream.ok || !(contentType.startsWith("video/") || contentType === "application/octet-stream")) {
      await upstream.body?.cancel();
      return new Response("Video unavailable", { status: 502 });
    }
    const headers = new Headers({ "Content-Type": contentType === "application/octet-stream" ? "video/mp4" : contentType, "Cache-Control": "private, max-age=3600" });
    for (const name of ["content-length", "content-range", "accept-ranges"]) {
      const value = upstream.headers.get(name);
      if (value) headers.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return new Response("Video unavailable", { status: 502 });
  }
}
