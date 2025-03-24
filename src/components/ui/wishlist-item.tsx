'use client';

import { useState } from 'react';
import { WishlistItem } from '@/lib/airtable';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { ExternalLink, Trash2, Check, X, Loader2 } from 'lucide-react';
import { useToast } from './use-toast';

interface WishlistItemCardProps {
  item: WishlistItem;
  onDelete: (id: string) => Promise<void>;
  onPurchasedChange: (id: string, purchased: boolean) => Promise<void>;
}

export function WishlistItemCard({ item, onDelete, onPurchasedChange }: WishlistItemCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  console.log('Rendering WishlistItemCard:', { 
    id: item.id, 
    title: item.title, 
    purchased: item.purchased 
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(item.id);
      toast({
        title: "Item deleted",
        description: "The item has been removed from your wishlist",
      });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to delete the item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePurchasedChange = async () => {
    try {
      setIsUpdating(true);
      await onPurchasedChange(item.id, !item.purchased);
      toast({
        title: item.purchased ? "Marked as not purchased" : "Marked as purchased",
        description: `${item.title} has been updated`,
      });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to update the item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Card className={`w-full ${item.purchased ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{item.title}</CardTitle>
          <div className="flex items-center gap-2">
            {item.purchased ? (
              <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                <Check className="w-4 h-4" />
                Purchased
              </span>
            ) : (
              <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-sm">
                <X className="w-4 h-4" />
                Not Purchased
              </span>
            )}
          </div>
        </div>
        {item.description && (
          <CardDescription>{item.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:underline"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Item
          </a>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant={item.purchased ? 'secondary' : 'default'}
          onClick={handlePurchasedChange}
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : item.purchased ? (
            'Mark as Not Purchased'
          ) : (
            'Mark as Purchased'
          )}
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
