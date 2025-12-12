import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

    if (!url) return new NextResponse('Missing URL', { status: 400 });
    if (!directusUrl) return new NextResponse('Server configuration error', { status: 500 });

    // SECURITY: Only allow proxying images from our own Directus instance
    if (!url.startsWith(directusUrl)) {
        console.error(`[Security] Blocked proxy request to external URL: ${url}`);
        return new NextResponse('Forbidden: External URLs not allowed', { status: 403 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`,
            },
        });
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);

        const blob = await response.blob();
        return new NextResponse(blob, {
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error: any) {
        console.error("Image proxy error:", error);
        return new NextResponse(`Image Proxy Error: ${error.message}`, { status: 500 });
    }
}
