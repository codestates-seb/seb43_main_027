import GlobalStyle from './styles/globalStyles';

import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import CategoryGames from './pages/CategoryGames';
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import GameChannel from './pages/GameChannel';
import Posting from './pages/Posting';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/' element={<Home />} />
          <Route path='/category/:id' element={<CategoryGames />} />
          <Route path='/games/:id' element={<GameChannel />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/post' element={<Posting />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
