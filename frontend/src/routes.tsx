import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import type { RootState } from './stores';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return <Navigate to="/login" />;

  return (<div>{children}</div>);
}

function PublicRoute({ children }: PrivateRouteProps): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return (<div>{children}</div>);

  return (<Navigate to="/" />);
}

function AppRoutes() {
  const loading = useSelector((state: RootState) => state.user.loading);

  if (loading) return null;

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
