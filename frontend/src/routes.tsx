import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import { useUserContext } from './contexts/user';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" />;

  return (<div>{children}</div>);
}

function PublicRoute({ children }: PrivateRouteProps): JSX.Element {
  const { user } = useUserContext();

  if (!user) return (<div>{children}</div>);

  return (<Navigate to="/" />);
}

function AppRoutes() {
  const { userContextLoading } = useUserContext();

  if (userContextLoading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
