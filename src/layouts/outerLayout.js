import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from '../components/header/loginHeader';
// import Footer from '../components/Footer/LoginFooter';

function Outerlayout() {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />

      {/* <Footer /> */}
    </div>
  );
}
export default Outerlayout;
