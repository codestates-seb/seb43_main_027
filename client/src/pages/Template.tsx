import Header from '../layouts/Header/Header';
import Nav from '../layouts/Nav/Nav';
import Footer from '../layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import WithScrollTop from '../components/common/WithScrollTop';

const Template = () => {
  return (
    <>
      <Header />
      <StyledFlexBox>
        <Nav />
        <WithScrollTop>
          <Outlet />
        </WithScrollTop>
      </StyledFlexBox>
      <Footer />
    </>
  );
};

export default Template;

const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
  @media screen and (min-width: 650px) {
    flex-direction: row;
    > div {
      margin-left: 50px;
    }
  }
`;
