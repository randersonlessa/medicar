import React from 'react';
import { fireEvent, render, screen } from '../../tests/utils';

import { Button } from '.';
import { Default } from '../../themes/defaultTheme';

describe('Button', () => {
  describe('should render correctly', () => {
    it('should render data correctly', () => {
      render(<Button>Test</Button>);

      expect(screen.getByTestId('button-test')).toHaveTextContent('Test');
    });

    it('should render solid styles correctly', () => {
      render(<Button variant="solid">Test</Button>);

      expect(screen.getByTestId('button-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('button-test')).toHaveStyle(`
        background: ${Default.colors.primary};
        color: ${Default.colors.white};
      `);
    });

    it('should render solid and disabled styles correctly', () => {
      render(<Button variant="solid" disabled>Test</Button>);

      expect(screen.getByTestId('button-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('button-test')).toHaveStyle(`
        background: ${Default.colors.secondaryHover};
        color: ${Default.colors.white};
        cursor: not-allowed;
      `);
    });

    it('should render text styles correctly', () => {
      render(<Button variant="text">Test</Button>);

      expect(screen.getByTestId('button-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('button-test')).toHaveStyle(`
        background: transparent;
        color: ${Default.colors.primary};
      `);
    });

    it('should render text and disabled styles correctly', () => {
      render(<Button variant="text" disabled>Test</Button>);

      expect(screen.getByTestId('button-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('button-test')).toHaveStyle(`
        background: transparent;
        color: ${Default.colors.secondaryHover};
        cursor: not-allowed;
      `);
    });

    it('should call onClick', () => {
      const onClick = jest.fn();

      render(<Button onClick={onClick}>Test</Button>);

      fireEvent.click(screen.getByTestId('button-test'));
      expect(onClick.mock.calls.length).toBe(1);
    });
  });
});
