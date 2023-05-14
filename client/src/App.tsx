import GlobalStyle from './styles/globalStyles';

import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import CategoryGames from './pages/CategoryGames';
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import GameChannel from './pages/GameChannel';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/' element={<Home />} />
          <Route path='/categories/:categoryId' element={<CategoryGames />} />
          <Route path='/games/:gameId' element={<GameChannel />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
