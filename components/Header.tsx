
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartIcon from './icons/CartIcon';
import CakeIcon from './icons/CakeIcon';
import ChatIcon from './icons/ChatIcon';

const Header: React.FC = () => {
  const { itemCount } = useCart();

  const linkStyle = "text-text-dark hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyle = "text-accent bg-primary/50";

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-text-dark font-bold text-xl">
              <CakeIcon className="h-8 w-8 text-accent" />
              <span>Dulce Delicia</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>Inicio</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>Postres</NavLink>
              <NavLink to="/support" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>Soporte</NavLink>
            </div>
          </div>
          <div className="flex items-center">
             <NavLink to="/support" className="md:hidden p-2 rounded-full text-text-dark hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
                <ChatIcon />
             </NavLink>
            <NavLink to="/cart" className="relative p-2 rounded-full text-text-dark hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
              <span className="sr-only">Ver carrito</span>
              <CartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                  {itemCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
