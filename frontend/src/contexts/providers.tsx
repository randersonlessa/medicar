import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from './theme';
// import { UserProvider } from './user';

interface ProvidersProps {
  children?: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {
        /* Possibilidade de usar o context User ao invés do redux */
      }
      {/* <UserProvider> */}
      {children}
      <ToastContainer />
      {/* </UserProvider> */}
    </ThemeProvider>
  );
}

export default Providers;
