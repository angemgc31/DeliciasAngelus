
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-secondary mb-4">Tu Carrito está Vacío</h1>
        <p className="text-gray-600 mb-6">Parece que no has añadido ningún postre. ¡Date un capricho!</p>
        <Link to="/products" className="bg-accent text-white font-bold py-2 px-6 rounded-full hover:bg-pink-500 transition-colors">
          Ver Postres
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-secondary mb-6 border-b pb-4">Tu Carrito de Compras</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h2 className="text-lg font-bold text-text-dark">{item.name}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold">-</button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t text-right">
        <h2 className="text-2xl font-bold">Total: <span className="text-accent">${totalPrice.toFixed(2)}</span></h2>
        <p className="text-gray-500">({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})</p>
        <Link to="/checkout" className="mt-4 inline-block bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-pink-500 transition-colors text-lg">
          Proceder al Pago
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
