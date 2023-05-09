import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import SignUp from './pages/SignUp/SignUp';
import Header from './layouts/Header/Header';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <SignUp />
    </>
  );
};

export default App;
