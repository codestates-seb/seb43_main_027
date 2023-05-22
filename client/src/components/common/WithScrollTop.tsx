import { ReactElement, useEffect } from 'react';

const WithScrollTop = ({ children }: { children: ReactElement }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <>{children}</>;
};

export default WithScrollTop;
