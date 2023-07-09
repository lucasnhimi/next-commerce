'use client';
import { useCartStore } from '@/store';

export default function Cart() {
  const useStore = useCartStore();
  return (
    <>
      <div
        onClick={() => useStore.toggleCart()}
        className='flex items-center cursor-pointer relative'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
        <span
          className='
            bg-teal-600 
            text-sm 
            font-bold 
            rounded-full 
            h-5 w-5
            flex items-center justify-center
            absolute
            left-3
            bottom-3'
        >
          2
        </span>
      </div>
      {!useStore.isOpen && (
        <div
          onClick={() => useStore.toggleCart()}
          className='fixed w-full h-screen bg-black/25 left-0 top-0 z-50'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-12 overflow-y-scroll'
          >
            <h1>Meu carrinho</h1>
            {useStore.cart.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
