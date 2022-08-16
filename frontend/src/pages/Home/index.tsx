import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import type { RootState } from '../../stores';
import { removeUser } from '../../stores/slices/user';

import { getAppointments } from '../../services/api/appointment';

import { Spacing } from '../../components/Spacing';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentModal } from './components/AppointmentModal';

import {
  Container, Content, Header, Logo, LogoutButton, NameLabel, Navbar, NavbarUserArea, Table, Title,
} from './styles';

import IAppointment from '../../interfaces/Appointment';
import { Appointment } from './components/Appointment';

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleOnRequestClose = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleOnAppointment = useCallback((appointment: IAppointment) => {
    setAppointments((old) => [...old, appointment]);
  }, []);

  const handleRemove = useCallback((appointment: IAppointment) => {
    setAppointments((old) => [
      ...old.filter((element) => element.id !== appointment.id),
    ]);
  }, []);

  useEffect(() => {
    if (user) {
      toast.promise(
        async () => {
          const result = await getAppointments(user.id);
          setAppointments(result.appointments);
        },
        {
          pending: 'Carregando consultas',
          success: 'Consultas carregadas',
          error: 'Um erro desconhecido aconteceu',
        },
        {
          toastId: 'appointments-load',
          position: toast.POSITION.BOTTOM_CENTER,
        },
      );
    }
  }, [user]);

  return (
    <Container>
      <Spacing height={18} />
      <Navbar>
        <Logo />
        <NavbarUserArea>
          <NameLabel>
            {user?.name}
          </NameLabel>
          <LogoutButton
            variant="text"
            onClick={() => dispatch(removeUser())}
          >
            Desconectar
          </LogoutButton>
        </NavbarUserArea>
      </Navbar>
      <Spacing height={17} />
      <Content>
        <Header>
          <Title>Consulta Clínica</Title>
          <ButtonIcon
            iconName="Plus"
            onClick={() => setModalIsOpen(true)}
          >
            Nova Consulta
          </ButtonIcon>
        </Header>
        <Table>
          <thead>
            <tr>
              <th>ESPECIALIDADE</th>
              <th>PROFISSIONAL</th>
              <th>DATA</th>
              <th>HORA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                className={`${index === 0 && 'first'} ${index % 2 !== 0 && 'secondary-row'}`}
                onRemove={handleRemove}
              />
            ))}
          </tbody>
        </Table>
      </Content>
      <AppointmentModal
        isOpen={modalIsOpen}
        onRequestClose={handleOnRequestClose}
        onAppointment={handleOnAppointment}
      />
    </Container>
  );
}

export default Home;
