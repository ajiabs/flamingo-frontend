/* eslint-disable global-require */
import React, { Suspense, lazy, useState, useContext } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Row, Col, Image, Container } from 'react-bootstrap';
import styles from './forgetPassword.module.scss';
import { forgetPassword } from '../../redux/forgetPasswordSlice';
import 'react-toastify/dist/ReactToastify.css';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';

const EmailInput = lazy(() => import('../../components/EmailBox/EmailBox'));

function ForgetPassword() {
  const { logo } = getCookies('SITE_SETTINGS');
  const [submiting, setSubmitting] = useState(false);
  const { errormsgStyle } = useContext(TableContext);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError(null);
    setSubmitting(true);
    dispatch(forgetPassword(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload && resp.payload.success) {
        setSubmitting(false);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(
          resp.payload.response.data.message
            ? resp.payload.response.data.message
            : 'Something went wrong!'
        );
      }
    });
  };
  return (
    <div>
      <div className={styles.pwbg}>
        <Container fluid>
          <Row>
            <Col lg={6} md={6} sm={6} className={styles.loginleftbg}>
              <div className={styles.leftcontent}>
                <h2 className={styles.lefttext}>Start turning your ideas into reality.</h2>
                <p className={styles.leftpara}>A few clicks away from creating your ideas.</p>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12} className={styles.loginrightbg}>
              <Row>
                <Col lg={2} />
                <Col lg={8}>
                  <div className={styles.logodiv}>
                    <Image src={logo} alt="logo" className={styles.logo} layout="fill" />
                  </div>
                  <div className={styles.loginbg}>
                    <h5 className={styles.forgotpwtext}>Forgot Password ? </h5>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.pwform}>
                      <Suspense
                        fallback={
                          <div>
                            <SpinnerDotted style={{ color: '#39979d' }} />
                          </div>
                        }
                      >
                        <EmailInput
                          fieldName="email"
                          placeHolder="Enter Email Address"
                          register={register}
                          errors={errors}
                          isRequired
                          className={styles.emailbox}
                          labelstyle={styles.labeltext}
                        />
                      </Suspense>
                      <input
                        type="submit"
                        value={submiting ? 'Please wait..' : 'Continue'}
                        id={styles.continuebtn}
                      />
                      <div className={styles.login_linksection}>
                        <Link to="/login" className={styles.login_link}>
                          Back to Login
                        </Link>
                      </div>
                    </form>
                    {error !== null && <h6 className={styles[errormsgStyle]}>{error}</h6>}
                    <br />
                    {/* {forgetPassword.success === true ? (
                        <h3> please check your mail for the reset link</h3>
                      ) : (
                        <h3>please fill up the fields</h3>
                      )} */}
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

export default ForgetPassword;
