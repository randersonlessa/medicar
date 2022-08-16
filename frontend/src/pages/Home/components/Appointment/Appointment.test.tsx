import React from 'react';
import { render, screen } from '../../../../tests/utils';

import { Appointment } from '.';

import IAppointment from '../../../../interfaces/Appointment';

describe('Appointment', () => {
  const appointment: IAppointment = {
    id: 'appointmentId-test',
    specialty: 'specialty-test',
    doctor: 'doctor-test',
    day: '16/08/2022',
    time: '00:00',
    userId: 'userId-test',
  };

  const onRemove = jest.fn();

  describe('should render correctly', () => {
    it('should render data correctly', () => {
      render(<Appointment className="" appointment={appointment} onRemove={onRemove} />);

      expect(screen.getByTestId('appointment-specialty')).toHaveTextContent('specialty-test');
      expect(screen.getByTestId('appointment-doctor')).toHaveTextContent('doctor-test');
      expect(screen.getByTestId('appointment-day')).toHaveTextContent('16/08/2022');
      expect(screen.getByTestId('appointment-time')).toHaveTextContent('00:00');
      expect(screen.getByTestId('buttonIcon-test')).toHaveTextContent('Desmarcar');
    });
  });
});
