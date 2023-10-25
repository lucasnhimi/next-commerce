'use server';

import { ProductType } from '@/types/ProductType';
import { stripe } from '@/lib/stripe';

export async function fetchProducts({
  lastProductId,
}: {
  lastProductId?: string | undefined;
}) {
  const params = lastProductId
    ? { starting_after: lastProductId, limit: 12 }
    : { limit: 12 };

  const { data: products, has_more } = await stripe.products.list(params);

  const formatedProducts = await Promise.all(
    products.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      };
    })
  );
  return { formatedProducts, has_more };
}
