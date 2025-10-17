
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import Notification from '../components/Notification';
import CartIcon from '../components/icons/CartIcon';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === parseInt(id || '0'));
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  if (!product) {
    return <div className="text-center text-2xl">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      {showNotification && <Notification message="¡Añadido al carrito!" onClose={() => setShowNotification(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-text-dark mb-4 font-serif">{product.name}</h1>
          <p className="text-secondary text-lg mb-6">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-accent">${product.price.toFixed(2)}</span>
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-accent text-text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-lg"
          >
            <CartIcon className="h-6 w-6" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
