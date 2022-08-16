import React from 'react';
import { render, screen } from '../../tests/utils';

import { Select } from '.';
import { Default } from '../../themes/defaultTheme';

describe('Select', () => {
  const options = [
    {
      label: 'label-test-1',
      value: 'value-test-1',
    },
    {
      label: 'label-test-2',
      value: 'value-test-2',
    },
  ];

  const onChange = jest.fn();

  describe('should render correctly', () => {
    it('should render data correctly', () => {
      render(
        <Select
          placeholder="Test"
          value={undefined}
          onChange={onChange}
          options={options}
        />,
      );

      expect(screen.getByTestId('select-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('select-test')).toHaveTextContent('label-test-1');
      expect(screen.getByTestId('select-test')).toHaveTextContent('label-test-2');
    });

    it('should render default styles correctly', () => {
      render(
        <Select
          placeholder="Test"
          value={undefined}
          onChange={onChange}
          options={options}
        />,
      );

      expect(screen.getByTestId('select-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('select-test')).toHaveStyle(`
        background: ${Default.colors.background};
        cursor: pointer;
      `);
    });

    it('should render disabled styles correctly', () => {
      render(
        <Select
          placeholder="Test"
          value={undefined}
          onChange={onChange}
          options={options}
          disabled
        />,
      );

      expect(screen.getByTestId('select-test')).toHaveTextContent('Test');
      expect(screen.getByTestId('select-test')).toHaveStyle(`
        background: ${Default.colors.gray1};
        cursor: not-allowed;
      `);
    });
  });
});
