import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import type { RootState } from '../../../../stores';

import { removeAppointment } from '../../../../services/api/appointment';

import { ButtonIcon } from '../../../../components/ButtonIcon';

import IAppointment from '../../../../interfaces/Appointment';

interface AppointmentProps {
  appointment: IAppointment;
  className: string;
  onRemove: (appointment: IAppointment) => void;
}

function AppointmentElement({
  appointment, className, onRemove, ...props
}: AppointmentProps) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const handleRemove = () => {
    toast.promise(
      async () => {
        try {
          if (user === null) return;

          setLoading(true);

          await removeAppointment(user.id, appointment.id);

          onRemove(appointment);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      {
        pending: 'Desmarcando consulta',
        success: 'Consulta desmarcada com sucesso!',
        error: 'Um erro desconhecido aconteceu',
      },
      {
        toastId: `appointments-remove-${appointment.id}`,
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
  };

  return (
    <tr
      className={className}
      {...props}
    >
      <td>{appointment.specialty}</td>
      <td>{appointment.doctor}</td>
      <td>{appointment.day}</td>
      <td>{appointment.time}</td>
      <td>
        <ButtonIcon
          iconName="Remove"
          variant="text"
          onClick={handleRemove}
          disabled={loading}
        >
          Desmarcar
        </ButtonIcon>
      </td>
    </tr>
  );
}

export const Appointment = memo(AppointmentElement);
