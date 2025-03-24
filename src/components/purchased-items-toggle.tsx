'use client';

import { Toggle } from "@/components/ui/toggle";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function PurchasedItemsToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showPurchased = searchParams.get('showPurchased') === 'true';

  const togglePurchased = () => {
    console.log('Current showPurchased state:', showPurchased);
    const params = new URLSearchParams(searchParams);
    const newShowPurchased = !showPurchased;
    console.log('New showPurchased state:', newShowPurchased);
    
    if (newShowPurchased) {
      params.set('showPurchased', 'true');
    } else {
      params.delete('showPurchased');
    }
    
    const newUrl = `/wishlist?${params.toString()}`;
    console.log('Navigating to:', newUrl);
    router.push(newUrl);
  };

  return (
    <Toggle 
      pressed={showPurchased}
      onPressedChange={togglePurchased}
      variant="outline"
      className="gap-2"
    >
      {showPurchased ? (
        <>
          <EyeOff className="h-4 w-4" />
          Hide Purchased
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          Show Purchased
        </>
      )}
    </Toggle>
  );
}
