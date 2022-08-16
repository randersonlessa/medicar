import React, { ReactNode } from 'react';

import { ContainerBase } from './styles';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md';
}

export function Container({ children, size = 'sm', ...props }: ContainerProps) {
  return (
    <ContainerBase size={size} {...props} data-testid="container-test">{children}</ContainerBase>
  );
}
