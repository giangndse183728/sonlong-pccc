export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  currency: string;
  category_id?: string | null;
  available: boolean;
  created_at: string;
  features?: Record<string, unknown> | null;
  image_url?: string | null;
}
