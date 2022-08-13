import styled from 'styled-components';

export const Container = styled.div<{height: number}>`
  min-height: ${(props) => `${props.height}px`};
`;
