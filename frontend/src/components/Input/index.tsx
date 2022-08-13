import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

import {
  Container, InputBase, Label, PasswordIcon, ErrorText,
} from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  errorText?: string;
  type?: 'text' | 'password';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  invalid = false, errorText, type = 'text', placeholder, ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <InputBase
        ref={ref}
        {...props}
        placeholder=" "
        $invalid={invalid}
        type={showPassword ? 'text' : type}
        showPassword={showPassword}
      />
      <Label $invalid={invalid} type={type}>{placeholder}</Label>
      {(type === 'password' || showPassword)
      && <PasswordIcon $invalid={invalid} onClick={() => setShowPassword((old) => !old)} />}
      {errorText && <ErrorText $invalid={invalid}>{errorText}</ErrorText>}
    </Container>
  );
});
