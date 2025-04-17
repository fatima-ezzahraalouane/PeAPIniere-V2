import React, { useEffect, useState } from "react";

export default function Panier() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">🛒 Mon Panier</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-700">{item.price} DH</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline ml-4">
                Supprimer
              </button>
            </div>
          ))}
          <div className="text-right text-lg font-bold text-green-700">Total : {total} DH</div>
        </div>
      )}
    </div>
  );
}
