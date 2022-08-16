import React from 'react';
import { render, screen } from '../../tests/utils';

import { Input } from '.';
import { Default } from '../../themes/defaultTheme';

describe('Input', () => {
  describe('should render correctly', () => {
    it('should render data correctly', () => {
      render(<Input placeholder="Test" />);

      expect(screen.getByTestId('input-container-test')).toHaveTextContent('Test');
    });

    it('should render default styles correctly', () => {
      render(<Input placeholder="Test" />);

      expect(screen.getByTestId('input-container-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('input-test')).toHaveStyle(`
        border: 1px solid ${Default.colors.gray2};
        color: ${Default.colors.black};
      `);
    });

    it('should render invalid styles correctly', () => {
      render(<Input placeholder="Test" invalid />);

      expect(screen.getByTestId('input-container-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('input-test')).toHaveStyle(`
        border: 1px solid red;
        color: red;
      `);
    });

    it('should render invalid error text correctly', () => {
      render(<Input placeholder="Test" invalid errorText="Error" />);

      expect(screen.getByTestId('input-container-test')).toHaveTextContent('Error');
    });
  });
});
