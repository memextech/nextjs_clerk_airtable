'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface NewItemFormData {
  title: string;
  description?: string;
  url?: string;
}

export function NewItemDialog({ onSubmit }: { onSubmit: (data: NewItemFormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      url: formData.get('url') as string,
    };

    try {
      await onSubmit(data);
      setOpen(false);
      toast({
        title: "Item created",
        description: "New item has been added to your wishlist",
      });
      (e.target as HTMLFormElement).reset();
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter item title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter item description"
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium mb-1">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
