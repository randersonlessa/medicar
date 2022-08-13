import styled from 'styled-components';

import { ReactComponent as LogoMedicar } from '../../assets/svgs/Logo.svg';
import { Container as ContainerBase } from '../../components/Container';

export const Container = styled(ContainerBase)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Logo = styled(LogoMedicar)``;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
