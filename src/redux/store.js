import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice';
import forgetPasswordReducer from './forgetPasswordSlice';
import signupReducer from './RegistrationSlice';
import resetPasswordReducer from './ResetPasswordSlice';
import changePasswordReducer from './changePasswordSlice';
import sockerReducer from './SocketSlice';

export default configureStore({
  reducer: {
    app: loginReducer,
    app2: signupReducer,
    app3: forgetPasswordReducer,
    app4: resetPasswordReducer,
    app5: changePasswordReducer,
    socket: sockerReducer,
  },
});
