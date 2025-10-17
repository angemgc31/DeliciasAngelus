
import React from 'react';

const CakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21V19C20 17.8954 19.1046 17 18 17H6C4.89543 17 4 17.8954 4 19V21M16 3C16 4.10457 15.1046 5 14 5C12.8954 5 12 4.10457 12 3C12 1.89543 12.8954 1 14 1C15.1046 1 16 1.89543 16 3ZM12 7H12.01M8 3C8 4.10457 7.10457 5 6 5C4.89543 5 4 4.10457 4 3C4 1.89543 4.89543 1 6 1C7.10457 1 8 1.89543 8 3ZM12 14H12.01M16 11H8V14H16V11Z" />
  </svg>
);

export default CakeIcon;
