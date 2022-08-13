import styled from 'styled-components';

export const ContainerBase = styled.div<{size: 'sm' | 'md'}>`
  max-width: ${(props) => (props.size === 'md' ? '627px' : '400px')};
  margin: 0 8px;

  @media (${(props) => props.theme.breakpoints.tablet}){
    margin: 0 auto;
  }

`;
