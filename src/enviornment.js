/* eslint-disable import/no-mutable-exports */
const env = process.env.REACT_APP_ENV;
let envValues = {
  PORT: 80,
  REACT_APP_API_ENDPOINT: 'http://localhost:4075/v1',
  REACT_APP_API_FRONT_END: 'http://localhost:4075',
  REACT_APP_API_PERMISSION_DENIED: 'http://localhost:4075/permission',
  REACT_APP_SHOW_COOKIE_BOX: false,
  SOCKET_STATUS: 'ON',
  FIREBASE_CONFIG: {
    apiKey: 'AIzaSyCbPri9KqHOS16Q7JC_N10SdkZ6w8RsRt8',
    authDomain: 'flamingo-ff566.firebaseapp.com',
    databaseURL: 'https://flamingo-ff566-default-rtdb.firebaseio.com/',
    projectId: 'flamingo-ff566',
    storageBucket: 'flamingo-ff566.appspot.com',
    messagingSenderId: '808659627886',
    appId: '1:808659627886:web:736e95e6c5c2e74f989b7f',
    measurementId: 'G-1Z9MZH8CGE',
  },
  COLLECTIONURL: 'notifications',
};
switch (env) {
  case 'staging':
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'https://bp-api.iscriptsdemo.com/v1',
      REACT_APP_API_FRONT_END: 'https://bp.iscriptsdemo.com',
      REACT_APP_API_PERMISSION_DENIED: 'https://bp.iscriptsdemo.com/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
      SOCKET_STATUS: 'ON',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCbPri9KqHOS16Q7JC_N10SdkZ6w8RsRt8',
        authDomain: 'flamingo-ff566.firebaseapp.com',
        databaseURL: 'https://flamingo-ff566-default-rtdb.firebaseio.com/',
        projectId: 'flamingo-ff566',
        storageBucket: 'flamingo-ff566.appspot.com',
        messagingSenderId: '808659627886',
        appId: '1:808659627886:web:736e95e6c5c2e74f989b7f',
        measurementId: 'G-1Z9MZH8CGE',
      },
      COLLECTIONURL: 'notifications',
    };
    break;
  case 'production':
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'https://bp-api.prod.com/v1',
      REACT_APP_API_FRONT_END: 'https://bp-api.prod.com',
      REACT_APP_API_PERMISSION_DENIED: 'https://bp-api.prod.com/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
      SOCKET_STATUS: 'ON',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCbPri9KqHOS16Q7JC_N10SdkZ6w8RsRt8',
        authDomain: 'flamingo-ff566.firebaseapp.com',
        databaseURL: 'https://flamingo-ff566-default-rtdb.firebaseio.com/',
        projectId: 'flamingo-ff566',
        storageBucket: 'flamingo-ff566.appspot.com',
        messagingSenderId: '808659627886',
        appId: '1:808659627886:web:736e95e6c5c2e74f989b7f',
        measurementId: 'G-1Z9MZH8CGE',
      },
      COLLECTIONURL: 'notifications',
    };
    break;
  case 'development':
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'http://localhost:4075/v1',
      REACT_APP_API_FRONT_END: 'http://localhost:4075',
      REACT_APP_API_PERMISSION_DENIED: 'http://localhost:4075/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
      SOCKET_STATUS: 'ON',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCbPri9KqHOS16Q7JC_N10SdkZ6w8RsRt8',
        authDomain: 'flamingo-ff566.firebaseapp.com',
        databaseURL: 'https://flamingo-ff566-default-rtdb.firebaseio.com/',
        projectId: 'flamingo-ff566',
        storageBucket: 'flamingo-ff566.appspot.com',
        messagingSenderId: '808659627886',
        appId: '1:808659627886:web:736e95e6c5c2e74f989b7f',
        measurementId: 'G-1Z9MZH8CGE',
      },
      COLLECTIONURL: 'notifications',
    };
    break;
  default:
    envValues = {
      PORT: 80,
      REACT_APP_API_ENDPOINT: 'http://localhost:4075/v1',
      REACT_APP_API_FRONT_END: 'http://localhost:4075',
      REACT_APP_API_PERMISSION_DENIED: 'http://localhost:4075/permission',
      REACT_APP_SHOW_COOKIE_BOX: false,
      SOCKET_STATUS: 'ON',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCbPri9KqHOS16Q7JC_N10SdkZ6w8RsRt8',
        authDomain: 'flamingo-ff566.firebaseapp.com',
        databaseURL: 'https://flamingo-ff566-default-rtdb.firebaseio.com/',
        projectId: 'flamingo-ff566',
        storageBucket: 'flamingo-ff566.appspot.com',
        messagingSenderId: '808659627886',
        appId: '1:808659627886:web:736e95e6c5c2e74f989b7f',
        measurementId: 'G-1Z9MZH8CGE',
      },
      COLLECTIONURL: 'notifications',
    };
    break;
}

export default envValues;
