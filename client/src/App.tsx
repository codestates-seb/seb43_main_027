import React from 'react';
import GlobalStyle from './styles/globalStyles';
import Header from './layouts/Header/Header';
import Nav from './layouts/Nav/Nav';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Nav />
    </>
  );
};

export default App;
