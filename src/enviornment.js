/* eslint-disable import/no-mutable-exports */
const env = process.env.REACT_APP_ENV;
let envValues = {
  PORT: 80,
  REACT_APP_API_ENDPOINT: 'http://localhost:4075/v1',
  REACT_APP_API_FRONT_END: 'http://localhost:4075',
  REACT_APP_API_PERMISSION_DENIED: 'http://localhost:4075/permission',
  REACT_APP_SHOW_COOKIE_BOX: false,
};
switch (env) {
  case 'staging':
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'https://bp-api.iscriptsdemo.com/v1',
      REACT_APP_API_FRONT_END: 'https://bp.iscriptsdemo.com',
      REACT_APP_API_PERMISSION_DENIED: 'https://bp.iscriptsdemo.com/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
    };
    break;
  case 'production':
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'https://bp-api.prod.com/v1',
      REACT_APP_API_FRONT_END: 'https://bp-api.prod.com',
      REACT_APP_API_PERMISSION_DENIED: 'https://bp-api.prod.com/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
    };
    break;
  case 'development':
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'http://localhost:4075/v1',
      REACT_APP_API_FRONT_END: 'http://localhost:4075',
      REACT_APP_API_PERMISSION_DENIED: 'http://localhost:4075/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
    };
    break;
  default:
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'https://bp-api.iscriptsdemo.com/v1',
      REACT_APP_API_FRONT_END: 'http://localhost:3000',
      REACT_APP_API_PERMISSION_DENIED: 'http://localhost:3000/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
    };
    break;
}

export default envValues;
