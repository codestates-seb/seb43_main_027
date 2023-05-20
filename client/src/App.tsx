import GlobalStyle from './styles/globalStyles';
import AppRoutes from './AppRoutes';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { setUser } from './slice/userSlice';

import { RootState } from './store/store';
// import PATH_URL from './constants/pathUrl';
// import { useCheckAuth } from './hooks/useCheckAuth';

const App = () => {
  // useCheckAuth(PATH_URL.HOME);

  const userState = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (userState.memberId === -1 && user) {
      dispatch(setUser({ ...JSON.parse(user) }));
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  );
};

export default App;
