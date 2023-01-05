/* eslint-disable global-require */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Container } from 'react-bootstrap';
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import styles from './resetPassword.module.scss';
import { resetPassword } from '../../redux/ResetPasswordSlice';
// import { registeration } from '../Redux/RegistrationSlice';
import PasswordField from '../../components/PasswordField/PasswordField';
import LoginBg from '../../assets/login_bg.svg';
import 'react-toastify/dist/ReactToastify.css';
import { Entry } from '../../redux/entrySlice';
import { getCookies } from '../../hooks/useCookies';

function ResetPassword() {
  const { logo } = getCookies('SITE_SETTINGS');
  const navigate = useNavigate();
  const [submiting, setSubmitting] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const Password = useRef({});
  Password.current = watch('Password', '');
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const { loading, resetPasswordData, error } = useSelector((state) => ({ ...state.app4 }));
  // This runs on submit
  const onSubmit = (data) => {
    setSubmitting(true);
    if (Password.current !== data.ConfirmPassword) {
      setSubmitting(false);
      setErrorMessage('Passwords does not match');
    } else if (!data.ConfirmPassword.match(/\d/) || !data.ConfirmPassword.match(/[a-zA-Z]/)) {
      setErrorMessage('Password must contain at least 1 letter and 1 number');
    } else {
      setErrorMessage('');
      dispatch(resetPassword(data)).then(() => {
        setSubmitting(false);
        navigate('/login');
      });
    }
  };
  const validateToken = (data) => {
    setSubmitting(true);
    const apiData = {
      token: params.id,
    };
    data.actionUrl = 'auth/validatetoken';
    data.actionMethod = 'post';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      if (resp.payload.code === 401) {
        toast.error('Link expired');
        navigate('/login');
      } else {
        setSubmitting(false);
      }
    });
  };
  // if (Object.keys(resetPasswordData.success === true)) {
  //   navigate('/signin');
  // }

  useEffect(() => {
    validateToken({});
  }, []);
  return (
    <div>
      <div className={styles.pwbg}>
        <Container fluid>
          <Row>
            <Col lg={6} md={6} sm={6} className={styles.loginleftbg}>
              <Image src={LoginBg} alt="bg" className={styles.loginimage} layout="fill" />
            </Col>
            <Col lg={6} md={6} sm={6} xs={12} className={styles.loginrightbg}>
              <Row>
                <Col lg={2} />
                <Col lg={8}>
                  <div className={styles.logodiv}>
                    <Image src={logo} alt="logo" className={styles.logo} layout="fill" />
                  </div>
                  <div className={styles.loginbg}>
                    <h5 className={styles.forgotpwtext}>Reset Password </h5>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.pwform}>
                      <PasswordField
                        fieldName="Password"
                        register={register}
                        errors={errors}
                        placeHolder="Password"
                        isRequired
                        minimLength={8}
                        className={styles.emailbox}
                        labelstyle={styles.labeltext}
                        eyeiconstyle={styles.eyeicon}
                      />
                      <PasswordField
                        fieldName="ConfirmPassword"
                        register={register}
                        errors={errors}
                        placeHolder="Confirm Password"
                        label="Confirm Password"
                        isRequired
                        minimLength={8}
                        className={styles.emailbox}
                        labelstyle={styles.labeltext}
                        eyeiconstyle={styles.eyeicon}
                      />

                      {errorMessage && (
                        <p style={{ color: 'red', fontSize: '14px' }} className="error">
                          {' '}
                          {errorMessage}{' '}
                        </p>
                      )}
                      <input type="hidden" {...register('token')} value={params.id} />
                      <input
                        type="submit"
                        value={submiting ? 'Please wait..' : 'Reset Password'}
                        id={styles.continuebtn}
                      />
                    </form>
                    <br />
                    <p id="passmatch" value="" />
                    <br />
                    {/* {userName === null ? (
                    <h3>Please signup to continue</h3>
                  ) : (
                    <h3>
                      signup completed <br /> you name is {userName}
                    </h3>
                  )}

                  <h4>{err}</h4> */}
                  </div>
                </Col>
                <Col lg={2} />
              </Row>
            </Col>
          </Row>
          <ToastContainer autoClose={2000} />
        </Container>
      </div>
    </div>
  );
}

export default ResetPassword;
