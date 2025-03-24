import { NextResponse } from 'next/server';
import { createWishlistItem, getWishlistItems } from '@/lib/airtable';

export async function GET() {
  try {
    const items = await getWishlistItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    return NextResponse.json({ error: 'Failed to fetch wishlist items', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await createWishlistItem(body);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating wishlist item:', error);
    return NextResponse.json({ error: 'Failed to create wishlist item', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
