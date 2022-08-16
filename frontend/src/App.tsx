import React, { useEffect } from 'react';

import { useAppDispatch } from './stores';
import { loadUser } from './stores/slices/user';

import Providers from './contexts/providers';
import AppRoutes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
