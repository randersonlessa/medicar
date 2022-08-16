import React from 'react';
import { render, screen } from '../../tests/utils';

import { Container } from '.';

describe('Container', () => {
  describe('should render correctly', () => {
    it('should render children correctly', () => {
      render(<Container><div>Test</div></Container>);

      expect(screen.getByTestId('container-test')).toHaveTextContent('Test');
    });

    it('should render sm size correctly', () => {
      render(<Container size="sm"><div>Test</div></Container>);

      expect(screen.getByTestId('container-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('container-test')).toHaveStyle('max-width: 400px;');
    });

    it('should render md size correctly', () => {
      render(<Container size="md"><div>Test</div></Container>);

      expect(screen.getByTestId('container-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('container-test')).toHaveStyle('max-width: 627px;');
    });
  });
});
