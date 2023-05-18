import GlobalStyle from './styles/globalStyles';
import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './slice/userSlice';
import { RootState } from './store/store';

const App = () => {
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
