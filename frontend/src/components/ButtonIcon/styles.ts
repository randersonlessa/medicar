import styled from 'styled-components';

import { ReactComponent as PlusIcon } from '../../assets/svgs/PlusIcon.svg';
import { ReactComponent as RemoveIcon } from '../../assets/svgs/RemoveIcon.svg';

export const Container = styled.button<{variant: 'solid' | 'text'}>`
  display: flex;
  align-items: center;
  padding: 6px 12px 5px 12px;
  min-width: 138px;
  width: auto;
  max-width: 100%;
  height: 24px;
  background: ${(props) => (props.variant === 'solid'
    ? (props.disabled ? props.theme.colors.secondaryHover : props.theme.colors.primary)
    : 'transparent')};
  color: ${(props) => (props.variant === 'text'
    ? (props.disabled ? props.theme.colors.secondaryHover : props.theme.colors.primary)
    : props.theme.colors.white)};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  transition: filter 0.2s, background 0.2s;

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

export const Label = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  margin-left: 8px;
`;

type IconProps = {variant: 'solid' | 'text'; disabled: boolean};

export const Plus = styled(PlusIcon)<IconProps>`
  & path {
    fill: ${(props) => (props.variant === 'text'
    ? (props.disabled ? props.theme.colors.secondaryHover : props.theme.colors.primary)
    : props.theme.colors.white)};
  }
`;

export const Remove = styled(RemoveIcon)<IconProps>`
  & path {
    fill: ${(props) => (props.variant === 'text'
    ? (props.disabled ? props.theme.colors.secondaryHover : props.theme.colors.primary)
    : props.theme.colors.white)};
  }
`;
