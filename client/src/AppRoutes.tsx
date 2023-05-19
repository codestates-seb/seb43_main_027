import { Route, Routes } from 'react-router-dom';
import Template from './pages/Template';
import Home from './pages/Home';
import CategoryGames from './pages/CategoryGames';
import GameChannel from './pages/GameChannel';
import SignUp from './pages/Signup';
import Posting from './pages/Posting';
import LogIn from './pages/Login';
import PATH_URL from './constants/pathUrl';
import GameRegister from './pages/GameRegister';

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
        <Route path={PATH_URL.SIGNUP} element={<SignUp />} />
        <Route
          path={`${PATH_URL.GAME}:gameId${PATH_URL.POSTING}`}
          element={<Posting />}
        />
        <Route
          path={`${PATH_URL.GAME}:gameId${PATH_URL.POSTING}/:postId${PATH_URL.EDIT}`}
          element={<Posting />}
        />
        <Route path={PATH_URL.LOGIN} element={<LogIn />} />
        <Route path={PATH_URL.REGISTER} element={<GameRegister />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
