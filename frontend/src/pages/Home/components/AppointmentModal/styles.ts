import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 19px;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.colors.black};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  @media (${(props) => props.theme.breakpoints.laptop}){
    flex-direction: row;
  }
`;
