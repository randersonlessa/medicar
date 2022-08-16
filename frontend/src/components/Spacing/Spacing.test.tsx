import React from 'react';
import { render, screen } from '../../tests/utils';

import { Spacing } from '.';

describe('Spacing', () => {
  describe('should render correctly', () => {
    it('should render size correctly', () => {
      render(<Spacing height={16} />);

      expect(screen.getByTestId('spacing-test')).toHaveStyle('min-height: 16px;');
    });
  });
});
