import { React, lazy } from 'react';
// import { SpinnerDotted } from 'spinners-react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('../components/Header/Header'));
const Footer = lazy(() => import('../components/Footer/DashFooter'));
const Menu = lazy(() => import('../components/LeftMenu/DashMenu'));
export default function Innerlayout() {
  return (
    <div>
      {/* <Suspense
        fallback={(
          <div>
            <SpinnerDotted />
          </div>
        )}
      > */}
      <Header />
      {/* </Suspense> */}
      {/* <Suspense
        fallback={(
          <div>
            <SpinnerDotted style={{ marginTop: '250px', marginLeft: '80px' }} />
          </div>
        )}
      > */}
      <Menu />
      {/* </Suspense> */}
      {/* <Suspense
        fallback={(
          <div>
            <SpinnerDotted />
          </div>
        )}
      > */}
      <div>
        <Outlet />{' '}
      </div>
      {/* </Suspense> */}
      {/* <Suspense
        fallback={(
          <div>
            <SpinnerDotted />
          </div>
        )}
      > */}
      <Footer />
      {/* </Suspense> */}
    </div>
  );
}
