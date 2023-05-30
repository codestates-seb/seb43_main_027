import GlobalStyle from './styles/globalStyles';
import AppRoutes from './AppRoutes';
import PATH_URL from './constants/pathUrl';
import { useCheckAuth } from './hooks/useCheckAuth';

const App = () => {
  useCheckAuth(PATH_URL.HOME);
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  );
};

export default App;
