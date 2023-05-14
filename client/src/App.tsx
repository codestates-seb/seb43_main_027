import GlobalStyle from './styles/globalStyles';

import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import CategoryGames from './pages/CategoryGames';
import SignUp from './pages/SignUp/SignUp';
import GameRegister from './pages/GameRegister/GameRegister';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/category/:id' element={<CategoryGames />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/games' element={<GameRegister />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
