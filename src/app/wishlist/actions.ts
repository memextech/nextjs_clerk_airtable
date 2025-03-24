'use server';

import { deleteWishlistItem, updateWishlistItem, createWishlistItem } from '@/lib/airtable';
import { revalidatePath } from 'next/cache';

export async function deleteItem(id: string) {
  try {
    await deleteWishlistItem(id);
    revalidatePath('/wishlist');
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
}

export async function updateItemPurchased(id: string, purchased: boolean) {
  try {
    console.log('Updating item purchased status:', { id, purchased });
    const updated = await updateWishlistItem(id, { purchased });
    console.log('Updated item:', updated);
    revalidatePath('/wishlist');
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
}

export async function createItem(data: { title: string; description?: string; url?: string }) {
  try {
    await createWishlistItem({
      ...data,
      purchased: false,
    });
    revalidatePath('/wishlist');
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('Failed to create item');
  }
}
