import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
// import { useNavigate } from 'react-router-dom';
// import './index.css';
// import './styles/header.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SERVER_BASE_URL } from './redux/apiConstants';
import { getCookies, setCookies } from './hooks/useCookies';
import envValues from './enviornment';

// const navigate = useNavigate();

axios.interceptors.request.use(
  (config) => config,
  (res) => {
    if (res.response.status === 403) {
      window.location.assign(envValues.REACT_APP_API_PERMISSION_DENIED);
    }
    return res;
  },
  (req) => {
    if (req.response.status === 403) {
      window.location.assign(envValues.REACT_APP_API_PERMISSION_DENIED);
    }
    return req;
  },
  (err) => {
    if (err.response.status === 403) {
      window.location.assign(envValues.REACT_APP_API_PERMISSION_DENIED);
    }

    Promise.reject(err);
  }
);
axios.interceptors.response.use((res) => {
  if (res.status === 403) {
    window.location.assign(envValues.REACT_APP_API_PERMISSION_DENIED);
  }
  return res;
});
axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (
      err.response.status === 401 &&
      err.response.data.message === 'Please authenticate' &&
      getCookies('Token')
    ) {
      try {
        const headers = {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${getCookies('Token')}`,
        };
        const rs = await axios.post(
          `${SERVER_BASE_URL}/auth/refresh-tokens`,
          {
            refreshToken: getCookies('refreshToken'),
          },
          { headers }
        );
        setCookies('Token', rs.data.data.access.token);
        setCookies('refreshToken', rs.data.data.refresh.token);
        axios.defaults.headers.common.Authorization = `Bearer ${getCookies('Token')}`;
        originalConfig.headers.Authorization = `Bearer ${rs.data.data.access.token}`;
        return axios(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    } else if (err.response.status === 403) {
      // navigate('/permission');
      window.location.assign(envValues.REACT_APP_API_PERMISSION_DENIED);
    }
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
