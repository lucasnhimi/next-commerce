'use client'

import { useCartStore } from "@/store";
import { useEffect } from "react";

function OrderCompleted() {
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Pedido concluído com sucesso</h1>
      <button className="bg-teal-600 text-white py-2 px-4 rounded-md" onClick={() => {
        setTimeout(() => {
          cartStore.setCheckout("cart");          
        }, 1000);
        cartStore.toggleCart();
      }}>
        Voltar para a loja
      </button>

    </div>
  )
}

export default OrderCompleted;