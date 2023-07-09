import AddCart from '@/app/components/AddCart';
import ProductImage from '@/app/components/ProductImage';
import { formatPrice } from '@/lib/utils';
import Stripe from 'stripe';

type ProductPageProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
  });
  const produto = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: produto.id,
  });

  return {
    id: produto.id,
    price: price.data[0].unit_amount,
    name: produto.name,
    image: produto.images[0],
    description: produto.description,
    currency: price.data[0].currency,
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className='flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 p-10'>
      <ProductImage product={product} />
      <div className='flex flex-col'>
        <div className='pb-4'>
          <h1 className='text-2xl font-bold text-gray-300'>{product.name}</h1>
          <h2 className='text-xl text-teal-600 font-bold'>
            {formatPrice(product.price)}
          </h2>
        </div>
        <div className='pb-4'>
          <p className='text-sm text-gray-400'>{product.description}</p>
        </div>
        <AddCart product={product} />
      </div>
    </div>
  );
}
