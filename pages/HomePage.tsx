
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center p-8 bg-white rounded-xl shadow-lg" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}>
        <h1 className="text-5xl font-bold text-accent mb-4 font-serif">Bienvenido a Dulce Delicia</h1>
        <p className="text-xl text-secondary mb-8">Tu paraíso de postres y dulces hechos con amor.</p>
        <Link 
          to="/products"
          className="bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-pink-500 transition-transform transform hover:scale-105 duration-300 inline-block"
        >
          Explorar Postres
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold text-center text-secondary mb-8">Nuestros Favoritos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
