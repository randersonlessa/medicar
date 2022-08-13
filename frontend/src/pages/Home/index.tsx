import React from 'react';
import { Button } from '../../components/Button';
import { useUserContext } from '../../contexts/user';

function Home() {
  const { logout } = useUserContext();

  return (
    <div>
      <h1>Home</h1>
      <Button variant="text" onClick={logout}>Desconectar</Button>
    </div>
  );
}

export default Home;
