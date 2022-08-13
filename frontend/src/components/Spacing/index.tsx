import React from 'react';

import { Container } from './styles';

interface SpacingProps {
  height: number;
}

export function Spacing({ height, ...props }: SpacingProps) {
  return (
    <Container height={height} {...props} />
  );
}
