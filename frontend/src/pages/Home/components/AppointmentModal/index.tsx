import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import type { RootState } from '../../../../stores';

import {
  createAppointment, getDoctors, getSchedules, getSpecialties,
} from '../../../../services/api/appointment';

import { Button } from '../../../../components/Button';
import { Spacing } from '../../../../components/Spacing';
import { Select } from '../../../../components/Select';

import {
  ButtonArea, Container, Form, Title,
} from './styles';

import IAppointment from '../../../../interfaces/Appointment';
import ISpecialty from '../../../../interfaces/Specialties';
import IDoctor from '../../../../interfaces/Doctor';
import ISchedule from '../../../../interfaces/Schedule';

interface AppointmentModalProps {
  isOpen: boolean;
  onRequestClose: (
    event?: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  onAppointment: (appointment: IAppointment) => void;
}

Modal.setAppElement('#root');

export function AppointmentModal({
  isOpen, onRequestClose, onAppointment, ...props
}: AppointmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [specialtySelected, setSpecialtySelected] = useState<string | undefined>(undefined);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [doctorSelected, setDoctorSelected] = useState<string | undefined>(undefined);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [scheduleSelected, setScheduleSelected] = useState<string | undefined>(undefined);
  const [times, setTimes] = useState<string[]>([]);
  const [timeSelected, setTimeSelected] = useState<string | undefined>(undefined);
  const user = useSelector((state: RootState) => state.user.user);

  const handleCancel = (
    event?: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => {
    setSpecialtySelected(undefined);
    setDoctorSelected(undefined);
    setScheduleSelected(undefined);
    setTimeSelected(undefined);
    onRequestClose(event);
  };

  const handleCreate = async () => {
    toast.promise(
      async () => {
        try {
          if (!user?.id || !doctorSelected || !scheduleSelected || !timeSelected) return;

          setLoading(true);

          const appointment = await createAppointment(
            user.id,
            doctorSelected,
            scheduleSelected,
            timeSelected,
          );
          onAppointment(appointment);
          handleCancel();
          setLoading(false);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      {
        pending: 'Marcando consulta',
        success: 'Consulta marcada com sucesso!',
        error: 'Um erro desconhecido aconteceu',
      },
      {
        toastId: 'appointment-create',
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
  };

  const handleSpecialty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specialty = e.target.value;

    if (specialtySelected !== specialty) {
      setDoctors([]);
      setDoctorSelected(undefined);
      setSchedules([]);
      setScheduleSelected(undefined);
      setTimes([]);
      setTimeSelected(undefined);
      setSpecialtySelected(specialty);
    }
  };

  const handleDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctor = e.target.value;

    if (doctorSelected !== doctor) {
      setSchedules([]);
      setScheduleSelected(undefined);
      setTimes([]);
      setTimeSelected(undefined);
      setDoctorSelected(doctor);
    }
  };

  const handleSchedule = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const schedule = e.target.value;

    if (scheduleSelected !== schedule) {
      const schedulesIndex = schedules.find((element) => element.id === schedule);
      setTimes(schedulesIndex ? schedulesIndex.schedules : []);
      setTimeSelected(undefined);
      setScheduleSelected(schedule);
    }
  };

  useEffect(() => {
    const loadSpecialties = async () => {
      const result = await getSpecialties();
      setSpecialties(result.specialties);
    };

    if (isOpen) {
      toast.promise(
        loadSpecialties,
        {
          pending: 'Carregando especialidades',
          success: 'Especialidades carregadas',
          error: 'Um erro desconhecido aconteceu',
        },
        {
          toastId: 'specialties-load',
          position: toast.POSITION.BOTTOM_CENTER,
        },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const loadDoctors = async () => {
      const result = await getDoctors(String(specialtySelected));
      setDoctors(result.doctors);
    };

    if (specialtySelected) {
      const doctorSpecialty = specialties.find(
        (specialty) => specialty.id === specialtySelected,
      )?.name;

      toast.promise(
        loadDoctors,
        {
          pending: `Carregando médicos ${doctorSpecialty}`,
          success: `Médicos ${doctorSpecialty} carregados`,
          error: 'Um erro desconhecido aconteceu',
        },
        {
          toastId: 'doctors-load',
          position: toast.POSITION.BOTTOM_CENTER,
        },
      );
    }
  }, [specialties, specialtySelected]);

  useEffect(() => {
    const loadSchedules = async () => {
      const result = await getSchedules(String(specialtySelected));
      setSchedules(result.schedules);
    };

    if (doctorSelected) {
      const doctorName = doctors.find(
        (doctor) => doctor.id === doctorSelected,
      )?.name;

      toast.promise(
        loadSchedules,
        {
          pending: `Carregando datas de ${doctorName}`,
          success: `Datas de ${doctorName} carregadas`,
          error: 'Um erro desconhecido aconteceu',
        },
        {
          toastId: 'schedules-load',
          position: toast.POSITION.BOTTOM_CENTER,
        },
      );
    }
  }, [doctorSelected, doctors, specialtySelected]);

  return (
    <Modal
      {...props}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Container>
        <Title>Nova Consulta</Title>
        <Spacing height={40} />
        <Form>
          <Select
            placeholder="Especialidade"
            value={specialtySelected}
            onChange={handleSpecialty}
            options={
            [
              ...specialties.map(
                (specialty) => ({ label: specialty.name, value: specialty.id }),
              ),
            ]
          }
          />
          <Spacing height={20} />
          <Select
            placeholder="Médico"
            disabled={specialtySelected === undefined}
            value={doctorSelected}
            onChange={handleDoctor}
            options={
            [
              ...doctors.map(
                (doctor) => ({ label: doctor.name, value: doctor.id }),
              ),
            ]
          }
          />
          <Spacing height={20} />
          <Select
            placeholder="Data"
            disabled={doctorSelected === undefined}
            value={scheduleSelected}
            onChange={handleSchedule}
            options={
            [
              ...schedules.map(
                (schedule) => ({ label: schedule.day, value: schedule.id }),
              ),
            ]
          }
          />
          <Spacing height={20} />
          <Select
            placeholder="Hora"
            disabled={scheduleSelected === undefined}
            value={timeSelected}
            onChange={(e) => setTimeSelected(e.target.value)}
            options={
            [
              ...times.map(
                (time) => ({ label: time, value: time }),
              ),
            ]
            }
          />
          <Spacing height={40} />
          <ButtonArea>
            <Button variant="text" onClick={handleCancel}>Cancelar</Button>
            <Spacing height={20} />
            <Button
              onClick={handleCreate}
              disabled={timeSelected === undefined || loading}
            >
              Confirmar
            </Button>
          </ButtonArea>
        </Form>
      </Container>
    </Modal>
  );
}
