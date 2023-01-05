/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, Suspense, lazy, useContext } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { changePassword } from '../../redux/changePasswordSlice';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';
import styles from './profileEdit.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const PasswordField = lazy(() => import('../../components/PasswordField/PasswordField'));

function ChangePassword() {
  const [submiting, setSubmitting] = useState(false);
  const { bodyStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { settingsgeneralSetStyle, settingsapiSetStyle } = useContext(TableContext);
  const token = `${getCookies('Token')}`;
  const userId = `${getCookies('USERID')}`;
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
  const { changePasswor } = useSelector((state) => ({ ...state.app5 }));
  // This runs on submitted
  const onSubmit = (data) => {
    setErrorMessage(null);
    setSubmitting(true);

    if (Password.current !== data.ConfirmPassword) {
      setSubmitting(false);
      setErrorMessage('Password does not match');
    } else if (!data.Password.match(/\d/) || !data.Password.match(/[a-zA-Z]/)) {
      setSubmitting(false);
      setErrorMessage('Password must contain at least 1 letter and 1 number');
    } else {
      dispatch(changePassword(data)).then(() => {
        setSubmitting(false);
      });
    }
  };
  setDashboardHeader('Profile');
  settingsgeneralSetStyle('settingslinks');
  settingsapiSetStyle('settingsgeneral');
  return (
    <div className={styles[bodyStyle]}>
      <div className={styles[formthemeStyle]} id={styles.addform}>
        <Container fluid>
          {/* <div className={styles.profilepicdiv}>
            <ProfilePic />
          </div> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mt-3">
              <Col lg={4} md={5} sm={6}>
                <PasswordField
                  className={styles.inputbox}
                  classNamedark={styles.inputbox1}
                  labelstyle={styles.formlabel}
                  label="Password"
                  fieldName="Password"
                  register={register}
                  errors={errors}
                  placeHolder="Password"
                  isRequired
                  minimLength={8}
                  eyeiconstyle={styles.eyeicon}
                  mandatory
                />
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={5} sm={6}>
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted style={{ color: '#39979d' }} />
                    </div>
                  }
                >
                  <PasswordField
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    fieldName="ConfirmPassword"
                    labelstyle={styles.formlabel}
                    label="Confirm Password"
                    register={register}
                    errors={errors}
                    placeHolder="Confirm Password"
                    isRequired
                    minimLength={8}
                    eyeiconstyle={styles.eyeicon}
                    mandatory
                  />
                </Suspense>
              </Col>
            </Row>

            {errorMessage && (
              <p style={{ color: 'red' }} className="error">
                {' '}
                {errorMessage}{' '}
              </p>
            )}
            <input type="hidden" {...register('token')} value={token} />
            <input type="hidden" {...register('userid')} value={userId} />
            <input
              className={styles.savebtn}
              type="submit"
              disabled={submiting}
              value={submiting ? 'Please wait...' : 'Save Changes'}
            />
          </form>
          <br />
          <p id="passmatch" value="" />
          <ToastContainer autoClose={2000} />
        </Container>
      </div>
    </div>
  );
}

export default ChangePassword;
