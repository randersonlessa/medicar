import React from 'react';
import { fireEvent, render, screen } from '../../tests/utils';

import { CheckBox } from '.';

describe('CheckBox', () => {
  describe('should render correctly', () => {
    it('should render data correctly', () => {
      render(<CheckBox label="Test" />);

      expect(screen.getByTestId('checkBox-test')).toHaveTextContent('Test');
    });

    it('should call onClick and onChange', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      let checked = false;

      render(<CheckBox
        checked={checked}
        label="Test"
        onClick={onClick}
        onChange={(e) => {
          onChange();
          checked = e.target.checked;
        }}
      />);

      fireEvent.click(screen.getByTestId('checkBox-test'));
      expect(onClick.mock.calls.length).toBe(1);
      expect(onChange.mock.calls.length).toBe(1);
      expect(checked).toBe(true);
    });
  });
});
