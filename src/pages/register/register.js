/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useState, Suspense, lazy, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { TableContext } from '../../contexts/tableContext';
// import { logIn } from '../Redux/LoginSlice';
import { signUp } from '../../redux/RegistrationSlice';
import { getCookies } from '../../hooks/useCookies';

// import { registeration } from '../Redux/RegistrationSlice';
import styles from './register.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const EmailInput = lazy(() => import('../../components/EmailBox/EmailBox'));
const PasswordField = lazy(() => import('../../components/PasswordField/PasswordField'));
const PhoneNumberInput = lazy(() => import('../../components/PhoneNumberBox/PhoneNumberBox'));
const TextInput = lazy(() => import('../../components/TextField/TextField'));

function Register() {
  const navigate = useNavigate();
  const { logo } = getCookies('SITE_SETTINGS');
  const { errormsgStyle } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ reValidateMode: 'onBlur' });
  // eslint-disable-next-line no-unused-vars
  const { loading, signupData } = useSelector((state) => ({ ...state.app2 }));

  // This runs on submit
  const onSubmit = (data) => {
    setError(null);
    if (!data.password.match(/\d/) || !data.password.match(/[a-zA-Z]/)) {
      setError('Password must contain at least 1 letter and 1 number');
    } else if (data.name.trim().length === 0) {
      document.getElementById('name').focus();
    } else {
      setSubmitting(true);
      const apiData = {
        name: data.name.trim(),
        email: data.email,
        phone: data.phonenumber.trim(),
        password: data.password,
      };
      dispatch(signUp(apiData)).then((resp) => {
        setSubmitting(false);
        if (resp.payload.success) {
          setSubmitting(false);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setError(resp.payload.response.data.message);
        }
      });
    }
  };
  // if (Object.keys(signupData).length !== 0 && signupData.success) {
  //   navigate('/dashboard');
  // }
  return (
    <div>
      <div className={styles.login_section}>
        <Container fluid>
          <Row>
            <Col lg={6} md={6} sm={6} className={styles.loginleftbg}>
              <div className={styles.leftcontent}>
                <h2 className={styles.lefttext}>Start turning your ideas into reality.</h2>
                <p className={styles.leftpara}>A few clicks away from creating your ideas.</p>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12} className={styles.loginrightbg}>
              <div className={styles.rightcontent}>
                <div className={styles.loginimage}>
                  <Image src={logo} alt="logo" className={styles.logo} />
                </div>
                <h4 className={styles.logintitle}>Sign Up</h4>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formsec}>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <TextInput
                      fieldName="name"
                      label="Name"
                      register={register}
                      errors={errors}
                      placeHolder="Enter Name"
                      isRequired
                      charactersOnly
                      maximLength={30}
                      minimLength={3}
                      className={styles.emailbox}
                      labelstyle={styles.labeltext}
                      id="name"
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <EmailInput
                      fieldName="email"
                      label="Email Address"
                      placeHolder="Enter Email Address"
                      register={register}
                      errors={errors}
                      isRequired
                      className={styles.emailbox}
                      labelstyle={styles.labeltext}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <PhoneNumberInput
                      fieldName="phonenumber"
                      label="Phone Number"
                      placeHolder="Enter Phone Number"
                      register={register}
                      errors={errors}
                      className={styles.emailbox}
                      labelstyle={styles.labeltext}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <PasswordField
                      fieldName="password"
                      label="Password"
                      register={register}
                      errors={errors}
                      placeHolder="Enter Password"
                      isRequired
                      minimLength={8}
                      className={styles.emailbox}
                      eyeiconstyle={styles.eyeicon}
                      labelstyle={styles.labeltext}
                    />
                  </Suspense>
                  <p className={styles[errormsgStyle]}>{error !== null && error}</p>
                  <input
                    type="submit"
                    disabled={submiting}
                    value={submiting ? 'Please wait...' : 'Sign up'}
                    id={styles.loginbtn}
                  />
                  <div className={styles.loglinksection}>
                    Already have an account ?{' '}
                    <Link to="/login" className={styles.loglink}>
                      Log in
                    </Link>
                  </div>
                </form>
                <br />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Register;
