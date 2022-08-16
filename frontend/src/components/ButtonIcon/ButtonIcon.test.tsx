import React from 'react';
import { fireEvent, render, screen } from '../../tests/utils';

import { ButtonIcon } from '.';
import { Default } from '../../themes/defaultTheme';

describe('ButtonIcon', () => {
  describe('should render correctly', () => {
    it('should render data correctly', () => {
      render(<ButtonIcon iconName="Plus">Test</ButtonIcon>);

      expect(screen.getByTestId('buttonIcon-test')).toHaveTextContent('Test');
    });

    it('should render solid styles correctly', () => {
      render(<ButtonIcon iconName="Plus" variant="solid">Test</ButtonIcon>);

      expect(screen.getByTestId('buttonIcon-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('buttonIcon-test')).toHaveStyle(`
        background: ${Default.colors.primary};
        color: ${Default.colors.white};
      `);
    });

    it('should render solid and disabled styles correctly', () => {
      render(<ButtonIcon iconName="Plus" variant="solid" disabled>Test</ButtonIcon>);

      expect(screen.getByTestId('buttonIcon-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('buttonIcon-test')).toHaveStyle(`
        background: ${Default.colors.secondaryHover};
        color: ${Default.colors.white};
        cursor: not-allowed;
      `);
    });

    it('should render text styles correctly', () => {
      render(<ButtonIcon iconName="Plus" variant="text">Test</ButtonIcon>);

      expect(screen.getByTestId('buttonIcon-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('buttonIcon-test')).toHaveStyle(`
        background: transparent;
        color: ${Default.colors.primary};
      `);
    });

    it('should render text and disabled styles correctly', () => {
      render(<ButtonIcon iconName="Plus" variant="text" disabled>Test</ButtonIcon>);

      expect(screen.getByTestId('buttonIcon-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('buttonIcon-test')).toHaveStyle(`
        background: transparent;
        color: ${Default.colors.secondaryHover};
        cursor: not-allowed;
      `);
    });

    it('should call onClick', () => {
      const onClick = jest.fn();

      render(<ButtonIcon iconName="Plus" onClick={onClick}>Test</ButtonIcon>);

      fireEvent.click(screen.getByTestId('buttonIcon-test'));
      expect(onClick.mock.calls.length).toBe(1);
    });
  });
});
