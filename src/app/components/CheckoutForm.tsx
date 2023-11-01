'use client';

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;

  }, [clientSecret, stripe])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    stripe.confirmPayment({
      elements,
      redirect: "if_required"
    }).then((result) => {
      if (!result.error) {
        cartStore.setCheckout("success");
      }
      setLoading(false);
    })
    
  }
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: 'tabs'}} />
      <h1 className="py-4 font-bold">Total: {formattedPrice}</h1>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="bg-teal-600 text-white py-2 px-4 rounded-md">
        {isLoading ? 'Carregando...' : 'Finalizar compra'}
      </button>
    </form>
  )
}

export default CheckoutForm;