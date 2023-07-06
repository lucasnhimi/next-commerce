import { ProductType } from '@/types/ProductType';

type ProductProps = {
  product: ProductType;
};
export default function Product({ product }: ProductProps) {
  return (
    <div className='flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300'>
      <div className='relative max-h-72 flex-1'>IMG</div>
      <div className='flex justify-between font-bold my-3'>{product.title}</div>
      <button className='rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center'>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
