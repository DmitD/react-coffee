import React from 'react';
import ContentLoader from 'react-content-loader';

const CoffeeLoader = () => (
    <ContentLoader
      className="coffee-block" 
      speed={2}
      width={260}
      height={367}
      viewBox="0 0 260 367"
      backgroundColor="#f3f3f3"
      foregroundColor="#dddbdb"
    >
    <rect x="65" y="20" rx="10" ry="10" width="129" height="161" /> 
    <rect x="40" y="191" rx="5" ry="5" width="180" height="29" /> 
    <rect x="78" y="230" rx="5" ry="5" width="104" height="20" /> 
    <rect x="90" y="263" rx="5" ry="5" width="80" height="24" /> 
    <rect x="50" y="300" rx="20" ry="20" width="159" height="45" />
    </ContentLoader>
  )
  
  export default CoffeeLoader;