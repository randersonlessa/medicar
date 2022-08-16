import React, { ButtonHTMLAttributes } from 'react';

import {
  Container, Label, Plus, Remove,
} from './styles';

type IconTypes = 'Plus' | 'Remove';

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconTypes;
  disabled?: boolean;
  variant?: 'solid' | 'text';
}

const getIcon = (iconName: IconTypes, disabled: boolean, variant?: 'solid' | 'text') => {
  switch (iconName) {
    case 'Plus':
      return <Plus variant={variant || 'solid'} disabled={disabled} />;
    case 'Remove':
      return <Remove variant={variant || 'solid'} disabled={disabled} />;
    default:
      return <Plus variant={variant || 'solid'} disabled={disabled} />;
  }
};

export function ButtonIcon({
  iconName, variant = 'solid', disabled = false, children, ...props
}: ButtonIconProps) {
  return (
    <Container variant={variant} disabled={disabled} {...props}>
      {getIcon(iconName, disabled, variant)}
      <Label>{children}</Label>
    </Container>
  );
}
