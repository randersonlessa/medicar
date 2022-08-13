import styled from 'styled-components';

export const Container = styled.button<{variant: 'solid' | 'text'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 9px 16px 10px 16px;
  min-width: 144px;
  width: auto;
  max-width: 100%;
  height: 40px;
  background: ${(props) => (props.variant === 'solid'
    ? (props.disabled ? props.theme.colors.secondaryHover : props.theme.colors.primary)
    : props.theme.colors.white)};
  color: ${(props) => (props.variant === 'text'
    ? (props.disabled ? props.theme.colors.secondaryHover : props.theme.colors.primary)
    : props.theme.colors.white)};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  transition: filter 0.2s, background 0.2s;

  @media (${(props) => props.theme.breakpoints.tablet}) {
    min-width: 180px;
  }

  :disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${(props) => (props.variant === 'solid'
    ? props.theme.colors.primaryHover
    : props.theme.colors.secondaryHover)};
  }

  &:active:not(:disabled) {
    filter: brightness(0.8);
  }
`;
