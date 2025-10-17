
import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const ProductsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-secondary mb-10">Todos Nuestros Postres</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
