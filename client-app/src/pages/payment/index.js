import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51OKUz3GghcrNY4DgU2cNCU5iFabyzHUz6HDzew97l768AnMQXqAoTxZGNhQt5ZD4uPRbC3KAWZ7PGDBKUeS12JjB00t0yLXhGz'
);

export default function App() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    let userCartItems = localStorage.getItem('userCartItems');

    if (!userCartItems) {
      userCartItems = [
        {
          itemName: 'Car',
          itemPrice: 2309,
          quantity: 1,
        },
      ];
    }
    fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: userCartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        // Handle any errors
        // console.error("Error:", error);
      });
  }, []);

  return (
    <div id="checkout" className="mx-auto h-screen py-20 max-w-7xl">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-5xl">
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout className=" px-4 sm:px-6 lg:px-8 bg-gray-900" />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </div>
  );
}
