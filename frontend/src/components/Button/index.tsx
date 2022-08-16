import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'text';
}

export function Button({ variant = 'solid', children, ...props }: ButtonProps) {
  return (
    <Container variant={variant} {...props} data-testid="button-test">
      {children}
    </Container>
  );
}
