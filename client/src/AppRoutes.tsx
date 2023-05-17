import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import Home from './pages/Home';
import CategoryGames from './pages/CategoryGames';
import GameChannel from './pages/GameChannel';
import SignUp from './pages/SignUp/SignUp';
import Posting from './pages/Posting';
import LogIn from './pages/LogIn/LogIn';
import PATH_URL from './constants/pathUrl';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Template />}>
        <Route path='/' element={<Home />} />
        <Route
          path={`${PATH_URL.CATEGORY}:categoryId`}
          element={<CategoryGames />}
        />
        <Route path={`${PATH_URL.GAME}:gameId`} element={<GameChannel />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/post' element={<Posting />} />
        <Route path='/login' element={<LogIn />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
