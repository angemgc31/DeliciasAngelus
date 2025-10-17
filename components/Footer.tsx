
import React from 'react';
import CakeIcon from './icons/CakeIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-background">
      <div className="container mx-auto py-6 px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
            <CakeIcon />
            <p className="font-bold">Dulce Delicia Marketplace</p>
        </div>
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados. Creado con amor y azúcar.</p>
      </div>
    </footer>
  );
};

export default Footer;
