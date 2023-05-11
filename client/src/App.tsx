import GlobalStyle from './styles/globalStyles';

import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import CategoryGames from './pages/CategoryGames';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/' element={<Home />} />
          <Route path='/category/:id' element={<CategoryGames />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
