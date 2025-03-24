'use server';

import { deleteWishlistItem, updateWishlistItem } from '@/lib/airtable';
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
    await updateWishlistItem(id, { purchased });
    revalidatePath('/wishlist');
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
}