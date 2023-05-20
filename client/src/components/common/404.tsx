import React from 'react';
import styled from 'styled-components';
import ButtonEl from '../elements/Button';
import Img404 from '../../asset/404.png';
import { useNavigate } from 'react-router-dom';

interface Prop404 {
  message404?: string;
  buttonMessage?: string;
  where?: string;
}

const Page404: React.FunctionComponent<Prop404> = ({
  message404 = '페이지를 찾을 수 없습니다.',
  buttonMessage = 'Back to Home',
  where = ''
}: Prop404) => {
  const navigate = useNavigate();

  const moveSomewhere = (where: string) => {
    navigate(`/${where}`);
  };

  return (
    <Styled404Wrapper>
      <StyledBackgroudContainer>
        <StyledBackground src={Img404} />
      </StyledBackgroudContainer>
      <StyledContainer>
        <StyledMessageContainer>
          <StyledMessage>{message404}</StyledMessage>
        </StyledMessageContainer>
        <ButtonContainer>
          <Button onClick={() => moveSomewhere(where)}>{buttonMessage}</Button>
        </ButtonContainer>
      </StyledContainer>
    </Styled404Wrapper>
  );
};

export default Page404;

const Styled404Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
`;

const StyledBackgroudContainer = styled.div`
  display: flex;
  padding-top: 10rem;
`;
const StyledBackground = styled.img`
  width: 63.4rem;
  height: 42.3rem;
  @media screen and (max-width: 650px) {
    width: 50.72rem;
    height: 33.84rem;
  }
`;

const StyledMessage = styled.div`
  margin-bottom: 2rem;
  font-size: 3.2rem;
  @media screen and (max-width: 650px) {
    font-size: 2.56rem;
  }
`;
const Button = ButtonEl({
  fontColor: 'white',
  fontSize: '2rem'
});
const ButtonContainer = styled.div`
  background-color: transparent;
`;

const StyledMessageContainer = styled.div`
  display: flex;
  background-color: transparent;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  z-index: 2;
`;
