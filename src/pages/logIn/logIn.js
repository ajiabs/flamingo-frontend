/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { TableContext } from '../../contexts/tableContext';
import PasswordField from '../../components/PasswordField/PasswordField';
import { logIn } from '../../redux/LoginSlice';
import { Entry } from '../../redux/entrySlice';

// import ProfilePic from './profilePicture/profilePicComponent';
import EmailInput from '../../components/EmailBox/EmailBox';
import styles from './logIn.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { setCookies } from '../../hooks/useCookies';

function LogIn() {
  // eslint-disable-next-line no-unused-vars
  const { errormsgStyle } = useContext(TableContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(null);
  const [load, setLoaded] = useState(false);
  const [submiting, setSubmitting] = useState(false);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function CookiesClearedError(value) {
    return (
      value === 'true' &&
      confirmAlert({
        title: 'We use cookies',
        message:
          'We use cookies for the smooth working of this website.You are logged out as you cleared those cookies!',
        buttons: [
          {
            label: 'Ok',
            onClick: () => sessionStorage.setItem('cookiesCleared', false),
          },
        ],
      })
    );
  }
  const getSettings = () => {
    const data = {
      actionUrl: 'settings',
      actionMethod: 'get',
    };
    dispatch(Entry(data)).then((resp) => {
      setCookies('dateFormat', resp.payload[0].dateFormat);
      setCookies('SITE_SETTINGS', JSON.stringify(resp.payload[0]));
      setLogo(resp.payload[0].logo);
    });
  };

  useEffect(() => {
    getSettings();
    CookiesClearedError(sessionStorage.getItem('cookiesCleared'));
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 0);
  }, []);
  // eslint-disable-next-line no-unused-vars
  const { loading, loginData, error } = useSelector((state) => ({ ...state.app }));

  // This runs on submit
  const onSubmit = (data) => {
    setErr(null);
    setSubmitting(true);
    dispatch(logIn(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        navigate(resp.payload.data.userMenu[0].urlPath);
      } else {
        toast.error(resp.payload.response.data.message);
        setTimeout(() => {
          setErr('');
        }, 3000);
      }
    });
  };
  return (
    <div>
      {loader ? (
        <>
          <br />
          <SpinnerDotted
            style={{
              left: '50%',
              position: 'relative',
              textAlign: 'center',
              top: '50%',
              color: '#39979d',
            }}
          />
        </>
      ) : (
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
                    {!load && <Skeleton height={74} width={164} />}
                    <Image src={logo} className={styles.logo} onLoad={() => setLoaded(true)} />
                  </div>
                  <h4 className={styles.logintitle}>Log In</h4>
                  <form onSubmit={handleSubmit(onSubmit)} className={styles.formsec}>
                    <EmailInput
                      fieldName="email"
                      label="Email"
                      placeHolder="Enter email address"
                      register={register}
                      errors={errors}
                      isRequired
                      className={styles.emailbox}
                      labelstyle={styles.labeltext}
                    />
                    <PasswordField
                      fieldName="Password"
                      label="Password"
                      register={register}
                      errors={errors}
                      placeHolder="Enter password"
                      isRequired
                      minimLength={8}
                      className={styles.emailbox}
                      eyeiconstyle={styles.eyeicon}
                      labelstyle={styles.labeltext}
                    />
                    <p className={styles[errormsgStyle]}>{err !== null && err}</p>
                    <div className="mb-2" id={styles.forgottext}>
                      <Link to="/forgetpassword" className={styles.forgotpw}>
                        Forgot password?
                      </Link>
                    </div>

                    <input
                      type="submit"
                      disabled={submiting}
                      value={submiting ? 'Please wait...' : 'Log in'}
                      id={styles.loginbtn}
                    />
                    <div className={styles.loglinksection}>
                      Don&apos;t have an account ?{' '}
                      <Link to="/register" className={styles.loglink}>
                        Sign Up
                      </Link>
                    </div>
                  </form>
                  <br />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
const onSubmit = () => {
  // const { response } = passQueries(axios.get('https://foodish-api.herokuapp.com/api/'));
};
export default LogIn;
export { onSubmit };
