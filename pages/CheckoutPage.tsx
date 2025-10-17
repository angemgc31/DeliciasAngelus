
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CheckoutPage: React.FC = () => {
  const { totalPrice, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemCount === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }, 2500);
  };

  if (paymentSuccess) {
    return (
      <div className="text-center bg-white p-12 rounded-lg shadow-xl max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-500 mb-4">¡Pago Exitoso!</h1>
        <p className="text-gray-700">Gracias por tu compra. Tu pedido está en camino. Serás redirigido a la página de inicio en breve.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-secondary mb-6">Proceso de Pago</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">Nombre Completo</label>
            <input type="text" className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input type="email" className="w-full p-2 border rounded" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">Dirección de Envío</label>
            <input type="text" className="w-full p-2 border rounded" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">Información de la Tarjeta (Simulado)</label>
            <div className="p-3 bg-gray-100 border rounded">
              <p className="text-sm text-gray-600">Esto es una simulación. No introduzcas datos reales.</p>
              <input type="text" placeholder="1234 5678 9101 1121" className="w-full p-2 border rounded mt-2" required />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-right">
          <h2 className="text-2xl font-bold">Total a Pagar: <span className="text-accent">${totalPrice.toFixed(2)}</span></h2>
          <button 
            type="submit" 
            disabled={isProcessing || itemCount === 0}
            className="mt-4 w-full md:w-auto bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-pink-500 transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
