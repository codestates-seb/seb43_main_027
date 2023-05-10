import GlobalStyle from './styles/globalStyles';

import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import CategoryGames from './pages/CategoryGames';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Template />}>
          <Route path='/category/:id' element={<CategoryGames />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
