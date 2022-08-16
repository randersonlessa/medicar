import React, { forwardRef, InputHTMLAttributes } from 'react';

import {
  Container, Input, Check,
} from './styles';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ label, ...props }, ref) => (
  <Container data-testid="checkBox-test">
    <Input ref={ref} {...props} type="checkbox" />
    <Check />
    {label}
  </Container>
));
