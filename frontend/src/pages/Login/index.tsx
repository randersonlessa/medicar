import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addUser } from '../../stores/slices/user';

import { login } from '../../services/api/users';

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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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

  const handleLogin: SubmitHandler<LoginData> = ({ email, password, keepSession }) => {
    toast.promise(
      async () => {
        try {
          setLoading(true);

          const { user, token } = await login(email, password);
          dispatch(addUser({ user, token, keepSession }));
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
        pending: 'Entrando',
        error: 'Parâmetros incorretos',
      },
      {
        toastId: 'login',
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
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
          onKeyEnter={handleSubmit(handleLogin)}
          {...register('email')}
        />
        <Spacing height={20} />
        <Input
          placeholder="Senha"
          type="password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
          onKeyEnter={handleSubmit(handleLogin)}
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
          <Button onClick={handleSubmit(handleLogin)} disabled={loading}>Acessar</Button>
        </ButtonArea>
      </Form>
    </Container>
  );
}

export default Login;
