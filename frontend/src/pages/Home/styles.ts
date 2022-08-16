import styled from 'styled-components';

import { ReactComponent as LogoMedicar } from '../../assets/svgs/Logo.svg';

import { Button } from '../../components/Button';
import { Container as ContainerBase } from '../../components/Container';

export const Container = styled(ContainerBase).attrs(() => ({
  size: 'md',
}))<any>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Navbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 8px;

  @media (${(props) => props.theme.breakpoints.tablet}){
    flex-direction: row;
  }
`;

export const Logo = styled(LogoMedicar)`
  height: 25px;
  width: 91px;
`;

export const NavbarUserArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media (${(props) => props.theme.breakpoints.tablet}){
    max-width: 80%;
    margin-top: 0;
    justify-content: flex-end;
  }
`;

export const NameLabel = styled.p`
  max-width: 50%;
  text-align: center;
  color: ${(props) => props.theme.colors.gray2};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
`;

export const LogoutButton = styled(Button)`
  margin-left: 40px;
  height: 13px;
  min-width: auto;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const Content = styled.div`
  overflow-y: auto;
  min-height: 688px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export const Header = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px 16px;
  padding-top: 16px;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.colors.black};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding-left: 16px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.gray2};

    &:last-child {
      padding-right: 16px;
    }
  }

  td {
    height: 48px;
    text-align: left;
    padding-left: 16px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: ${(props) => props.theme.colors.black};

    &:last-child {
      padding-right: 16px;
    }
  }

  tr.first td {
    height: 44px;
  }

  tr.secondary-row td {
    height: 32px;
    background: ${(props) => props.theme.colors.gray1};
  }



  thead th:nth-child(1) {
    width: 23.13%;
  }

  thead th:nth-child(2) {
    width: 29.19%;
  }

  thead th:nth-child(3) {
    width: 18.34%;
  }

  thead th:nth-child(4) {
    width: 12.05%;
  }

  thead th:nth-child(5) {
    width: 17.29%;
  }

`;
