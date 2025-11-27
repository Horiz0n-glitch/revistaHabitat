import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    if (!url) return new NextResponse('Missing URL', { status: 400 });

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
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error: any) {
        console.error("Proxy error:", error);
        return new NextResponse(`Proxy Error: ${error.message}`, { status: 500 });
    }
}
