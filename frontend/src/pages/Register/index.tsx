import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addUser } from '../../stores/slices/user';

import { register as registerUser } from '../../services/api/users';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Spacing } from '../../components/Spacing';

import {
  Container, Logo, Form, ButtonArea, Title,
} from './styles';

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().trim().required('Nome obrigatório'),
  email: yup.string().trim().email('Email inválido').required('Email obrigatório'),
  password: yup.string().trim().required('Senha obrigatória'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirmação de senha obrigatório'),
});

function Register() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister: SubmitHandler<RegisterData> = ({ name, email, password }) => {
    toast.promise(
      async () => {
        try {
          setLoading(true);

          const { user, token } = await registerUser(name, email, password);
          dispatch(addUser({ user, token, keepSession: false }));
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          if (error?.status === 400) {
            const apiErrors = error.data?.errors;
            setError(apiErrors[0].field, { message: apiErrors[0].message });
          }
          throw error;
        }
      },
      {
        pending: 'Criando conta',
        error: 'Parâmetros incorretos',
      },
      {
        toastId: 'register',
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
  };

  return (
    <Container>
      <Logo />
      <Spacing height={20} />
      <Title>Crie sua conta</Title>
      <Spacing height={20} />
      <Form>
        <Input
          placeholder="Nome"
          invalid={!!errors.name}
          errorText={errors.name?.message}
          onKeyEnter={handleSubmit(handleRegister)}
          {...register('name')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
          onKeyEnter={handleSubmit(handleRegister)}
          {...register('email')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Senha"
          type="password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
          onKeyEnter={handleSubmit(handleRegister)}
          {...register('password')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Confirmar Senha"
          type="password"
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
          onKeyEnter={handleSubmit(handleRegister)}
          {...register('confirmPassword')}
        />
        <Spacing height={40} />
        <ButtonArea>
          <Button variant="text" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button onClick={handleSubmit(handleRegister)} disabled={loading}>Confirmar</Button>
        </ButtonArea>
      </Form>
    </Container>
  );
}

export default Register;
