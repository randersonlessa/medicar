import { HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';

import { ReactComponent as EyeIcon } from '../../assets/svgs/EyeIcon.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  position: relative;
`;

export const InputBase = styled.input<{$invalid: boolean; showPassword: boolean}>`
  height: 40px;
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => (props.$invalid ? 'red' : props.theme.colors.gray2)};
  border-radius: 4px;

  color: ${(props) => (props.$invalid ? 'red' : props.theme.colors.black)};
  padding: 8px;
  padding-right: ${(props) => (
    (props?.type === 'password' || props.showPassword)
      ? '46px' : '8px')};

  transition: all .3s ease-out;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -webkit-appearance:none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: transparent;
  }
  :-ms-input-placeholder {
    color: transparent;
  }

  :not(:placeholder-shown) + label{
    margin-top: -8px;
  }

  &:focus {
    border: 1px solid ${(props) => (props.$invalid ? 'red' : props.theme.colors.primary)};
  }

  &:focus + label{
    margin-top: -8px;
  }
`;

export const Label = styled.label<{$invalid: boolean; type?: HTMLInputTypeAttribute}>`
  max-width: ${(props) => (props?.type === 'password' ? '84%' : '92%')};
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  margin: 13px 8px 0 8px;
  transition: all .3s ease-out;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  color: ${(props) => (props.$invalid ? 'red' : props.theme.colors.gray2)};
  background: ${(props) => props.theme.colors.background};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;

  &:before {
    content: '';
    margin-left: 2px;
  }

  &:after {
    content: '';
    margin-right: 6px;
  }
`;

export const PasswordIcon = styled(EyeIcon)<{$invalid: boolean;}>`
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px 12px 12px 8px;
  cursor: pointer;
  transition: filter 0.2s;

  & path {
    fill: ${(props) => (props.$invalid ? 'red' : props.theme.colors.gray2)};
  }

  &:hover {
    filter: brightness(0.8);
  }

  &:active {
    filter: brightness(0.5);
  }
`;

export const ErrorText = styled.div<{$invalid: boolean}>`
  display: flex;
  flex: 1;
  height: 16px;
  margin: 2px 16px 0 16px;
  color: ${(props) => (props.$invalid ? 'red' : props.theme.colors.gray2)};
`;
