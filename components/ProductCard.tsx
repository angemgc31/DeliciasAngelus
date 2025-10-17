
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import CartIcon from './icons/CartIcon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToCart(product);
    };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
        <div className="relative">
          <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
          <div className="absolute top-0 right-0 bg-accent text-white py-1 px-3 m-2 rounded-full text-sm font-bold">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-text-dark mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description.substring(0, 80)}...</p>
          <div className="mt-auto">
            <button onClick={handleAddToCart} className="w-full bg-primary hover:bg-accent text-text-dark font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              <CartIcon className="h-5 w-5" />
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
