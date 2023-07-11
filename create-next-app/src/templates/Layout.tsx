import type { ReactNode } from 'react';

type ILayoutProps = {
  children: ReactNode;
};

const Layout = (props: ILayoutProps) => (
  <>
    {/* header */}
    {props.children}
    {/* footer */}
  </>
);

export default Layout;
