import Airtable from 'airtable';

export interface WishlistItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  purchased: boolean;
}

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID!);
const table = base.table(process.env.AIRTABLE_TABLE_NAME!);

export async function getWishlistItems(): Promise<WishlistItem[]> {
  console.log('Fetching wishlist items');
  const records = await table.select().all();
  console.log('Raw Airtable records:', records.map(r => ({ id: r.id, fields: r.fields })));
  
  const items = records.map((record) => {
    const item = {
      id: record.id,
      title: record.fields.title as string || '',
      description: record.fields.description as string || '',
      url: record.fields.url as string || '',
      purchased: Boolean(record.fields.purchased),
    };
    console.log('Processed item:', item);
    return item;
  });
  
  console.log('All processed items:', items);
  return items;
}

export async function createWishlistItem(item: Omit<WishlistItem, 'id'>): Promise<WishlistItem> {
  const record = await table.create({
    title: item.title,
    description: item.description || '',
    url: item.url || '',
    purchased: item.purchased || false,
  });

  return {
    id: record.id,
    title: record.fields.title as string || '',
    description: record.fields.description as string || '',
    url: record.fields.url as string || '',
    purchased: record.fields.purchased as boolean || false,
  };
}

export async function updateWishlistItem(id: string, fields: Partial<Omit<WishlistItem, 'id'>>): Promise<WishlistItem> {
  console.log('Updating Airtable item:', { id, updates: fields });
  
  const records = await table.update([{
    id,
    fields
  }]);

  console.log('Airtable response:', records[0]);

  return {
    id: records[0].id,
    title: records[0].fields.title as string || '',
    description: records[0].fields.description as string || '',
    url: records[0].fields.url as string || '',
    purchased: records[0].fields.purchased as boolean || false,
  };
}

export async function deleteWishlistItem(id: string): Promise<void> {
  await table.destroy(id);
}
