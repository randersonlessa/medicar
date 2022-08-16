import React, { forwardRef, SelectHTMLAttributes } from 'react';

import {
  Container, Option, SelectBase, ArrowIcon,
} from './styles';

interface OptionProps {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: OptionProps[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  disabled = false, options, placeholder, value, ...props
}, ref) => (
  <Container>
    <SelectBase
      ref={ref}
      {...props}
      value={value === undefined ? '' : value}
      disabled={disabled}
      isSelected={value !== undefined}
    >
      {value === undefined
      && (
      <Option value="" disabled hidden>
        {placeholder}
      </Option>
      )}
      {options.map((option, index) => (
        <Option
          key={`select-option-${index}-${option.value}`}
          value={option.value}
        >
          {option.label}
        </Option>
      ))}
    </SelectBase>
    <ArrowIcon />
  </Container>
));
