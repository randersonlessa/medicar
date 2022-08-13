import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUserContext } from '../../contexts/user';

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
  const { register: registerUser } = useUserContext();
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

  const handleRegister: SubmitHandler<RegisterData> = async ({ name, email, password }) => {
    try {
      await registerUser(name, email, password);
    } catch (error: any) {
      if (error?.status === 400) {
        const apiErrors = error.data?.errors;
        setError(apiErrors[0].field, { message: apiErrors[0].message });
      }
    }
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
          {...register('name')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
          {...register('email')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Senha"
          type="password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
          {...register('password')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Confirmar Senha"
          type="password"
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Spacing height={40} />
        <ButtonArea>
          <Button variant="text" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button onClick={handleSubmit(handleRegister)}>Confirmar</Button>
        </ButtonArea>
      </Form>
    </Container>
  );
}

export default Register;
