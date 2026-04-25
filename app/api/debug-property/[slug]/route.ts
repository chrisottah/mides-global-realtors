import { NextResponse } from 'next/server';
import { getPropertyBySlug } from '@/lib/sanity';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // In Next.js 15, params are asynchronous, so we must await them.
    const { slug } = await params;
    const property = await getPropertyBySlug(slug);
    return NextResponse.json({ success: true, property });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}