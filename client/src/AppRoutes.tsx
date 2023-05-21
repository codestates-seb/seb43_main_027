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
import GoogleLogIn from './components/Login/googleLogin';
import Posts from './pages/Posts';
import Page404 from './components/common/404';
import UserInfoPage from './pages/UserInfoPage';

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
        <Route
          path={`${PATH_URL.GAME}:gameId${PATH_URL.POSTING}/:postId`}
          element={<Posts />}
        />
        <Route path={PATH_URL.LOGIN} element={<LogIn />} />
        <Route path={PATH_URL.REGISTER} element={<GameRegister />} />
        <Route path={PATH_URL.GOOGLE} element={<GoogleLogIn />} />
        <Route
          path={`${PATH_URL.GAME}:gameId${PATH_URL.POST}:postId`}
          element={<Posts />}
        />
        <Route path={PATH_URL.ERROR} element={<Page404 />} />
        <Route path={PATH_URL.NOTFOUND} element={<Page404 />} />
        <Route path={`${PATH_URL.USER_INFO}:memberId`} element={<UserInfoPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
