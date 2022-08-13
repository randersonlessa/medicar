import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUserContext } from '../../contexts/user';

import { Button } from '../../components/Button';
import { CheckBox } from '../../components/CheckBox';
import { Input } from '../../components/Input';
import { Spacing } from '../../components/Spacing';

import {
  Container, Logo, Form, ButtonArea,
} from './styles';

type LoginData = {
  email: string;
  password: string;
  keepSession: boolean;
}

const schema = yup.object({
  email: yup.string().trim().email('Email inválido').required('Email obrigatório'),
  password: yup.string().trim().required('Senha obrigatória'),
  keepSession: yup.boolean(),
});

function Login() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      keepSession: false,
    },
  });

  const handleLogin: SubmitHandler<LoginData> = async ({ email, password, keepSession }) => {
    try {
      await login(email, password, keepSession);
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
      <Spacing height={40} />
      <Form>
        <Input
          placeholder="Email ou Login"
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
        <Spacing height={8} />
        <Controller
          control={control}
          name="keepSession"
          render={({ field: { onChange, value, ...rest } }) => (
            <CheckBox
              label="Lembrar minha senha"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              {...rest}
            />
          )}
        />
        <Spacing height={39} />
        <ButtonArea>
          <Button variant="text" onClick={() => navigate('/register')}>Criar Conta</Button>
          <Button onClick={handleSubmit(handleLogin)}>Acessar</Button>
        </ButtonArea>
      </Form>
    </Container>
  );
}

export default Login;
