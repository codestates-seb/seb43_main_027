import { ReactElement } from 'react';

const WithScrollTop = ({ children }: { children: ReactElement }) => {
  window.scrollTo(0, 0);
  return <>{children}</>;
};

export default WithScrollTop;
