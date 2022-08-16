import styled from 'styled-components';

import { ReactComponent as ArrowIconBase } from '../../assets/svgs/ArrowIcon.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  position: relative;
`;

export const SelectBase = styled.select<{isSelected: boolean}>`
  box-sizing: border-box;
  appearance: none;
  outline: none;
  height: 40px;
  width: 100%;
  padding: 0 27px 0 8px;
  color: ${(props) => (props.isSelected
    ? props.theme.colors.black
    : props.theme.colors.gray2
  )};
  background: ${(props) => (props.disabled
    ? props.theme.colors.gray1
    : props.theme.colors.background
  )};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  border-radius: 4px;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }

  ::-ms-expand {
    display: none;
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export const ArrowIcon = styled(ArrowIconBase)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 11px 8px;
  cursor: pointer;
  transition: filter 0.2s;

  & path {
    fill: ${(props) => props.theme.colors.gray2};
  }
`;

export const Option = styled.option`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: ${(props) => props.theme.colors.black};

  :disabled {
    display: none;
  }
`;
