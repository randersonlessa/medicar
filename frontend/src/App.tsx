import React from 'react';
import Providers from './contexts/providers';
import AppRoutes from './routes';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
