import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  align-items: center;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Input = styled.input`
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  :checked + span {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const Check = styled.span`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray2};
  color: ${(props) => props.theme.colors.gray2};
  border-radius: 4px;
`;
