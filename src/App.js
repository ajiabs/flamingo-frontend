/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import Routers from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableContextProvider from './contexts/tableContext';
import { getCookies, setCookies } from './hooks/useCookies';
import envValues from './enviornment';

function App() {
  const [showBanner, setShowBanner] = useState(true);
  const cookieBannerControl = () => {
    setShowBanner(!showBanner);
    setCookies('showCookieBanner', false);
  };
  return (
    <Provider store={store}>
      <div className="App">
        <TableContextProvider>
          <Routers />
        </TableContextProvider>
        <ToastContainer autoClose={2000} />
      </div>
      {showBanner &&
      envValues.REACT_APP_SHOW_COOKIE_BOX &&
      getCookies('showCookieBanner') !== 'false' ? (
        <div className="cookie-banner">
          <p>This website uses cookies to enhance user experience.</p>
          <button type="button" className="close" onClick={cookieBannerControl}>
            I Understand
          </button>
        </div>
      ) : null}
    </Provider>
  );
}
export default App;
