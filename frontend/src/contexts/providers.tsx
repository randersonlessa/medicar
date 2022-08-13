import React from 'react';
import { ThemeProvider } from './theme';
import { UserProvider } from './user';

interface ProvidersProps {
  children?: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}

export default Providers;
