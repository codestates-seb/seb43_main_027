import { useState } from 'react';
import Header from '../layouts/Header/Header';
import Nav from '../layouts/Nav/Nav';
import Footer from '../layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Template = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Header setShow={setShow} show={show} />
      <StyledFlexBox>
        <Nav show={show} setShow={setShow} />
        <Outlet />
      </StyledFlexBox>
      <Footer />
    </>
  );
};

export default Template;

const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 650px) {
    flex-direction: row;
  }
`;
