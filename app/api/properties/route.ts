import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

export async function GET() {
  try {
    // Simple query to check connection
    const result = await sanityClient.fetch('*[_type == "property"]');
    
    return NextResponse.json({
      success: true,
      message: 'Connected to Sanity!',
      propertyCount: result.length,
      properties: result
    });
  } catch (error) {
    console.error('Sanity connection error:', error);
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}