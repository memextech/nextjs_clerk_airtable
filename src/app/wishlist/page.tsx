import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { WishlistItemCard } from "@/components/ui/wishlist-item";
import { getWishlistItems } from "@/lib/airtable";
import { deleteItem, updateItemPurchased, createItem } from "@/app/wishlist/actions";
import { NewItemDialog } from "@/components/new-item-dialog";
import { PurchasedItemsToggle } from "@/components/purchased-items-toggle";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WishlistPage({
  searchParams: params,
}: PageProps) {
  const { userId } = auth();
  const searchParams = await params;

  if (!userId) {
    redirect("/");
  }

  try {
    const showPurchased = searchParams.showPurchased === 'true';
    const allItems = await getWishlistItems();
    console.log('Show purchased:', showPurchased);
    console.log('All items:', allItems);
    
    const items = showPurchased 
      ? allItems // Show all items when showPurchased is true
      : allItems.filter(item => !item.purchased); // Only show unpurchased items when showPurchased is false

    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            <PurchasedItemsToggle />
          </div>
          <NewItemDialog onSubmit={createItem} />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Your wishlist is empty. Start adding items!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <WishlistItemCard 
                key={item.id} 
                item={item} 
                onDelete={deleteItem}
                onPurchasedChange={updateItemPurchased}
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error loading wishlist</div>;
  }
}
