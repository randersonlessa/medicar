import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

import {
  Container, InputBase, Label, PasswordIcon, ErrorText,
} from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  errorText?: string;
  type?: 'text' | 'password';
  onKeyEnter?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  invalid = false, errorText, type = 'text', placeholder, onKeyEnter = () => {}, ...props
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
        onKeyDown={
          (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) { onKeyEnter(); }
          }
        }
      />
      <Label $invalid={invalid} type={type}>{placeholder}</Label>
      {(type === 'password' || showPassword)
      && <PasswordIcon $invalid={invalid} onClick={() => setShowPassword((old) => !old)} />}
      {errorText && <ErrorText $invalid={invalid}>{errorText}</ErrorText>}
    </Container>
  );
});
