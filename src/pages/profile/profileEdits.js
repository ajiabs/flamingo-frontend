/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, Suspense, lazy, useContext, useEffect, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ProfilePic from '../../components/ProfilePic/profilePic';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';
import styles from './profileEdit.module.scss';
import { ProfileEdits } from '../../redux/profileEditSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Entry } from '../../redux/entrySlice';

const EmailInput = lazy(() => import('../../components/EmailBox/EmailBox'));
const PhoneNumberInput = lazy(() => import('../../components/PhoneNumberBox/PhoneNumberBox'));
const TextInput = lazy(() => import('../../components/TextField/TextField'));
const ProfileEdit = React.memo(() => {
  const [submiting, setSubmitting] = useState(false);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  // eslint-disable-next-line no-unused-vars
  const [profileData, setProfileData] = useState(null);
  const token = `${getCookies('Token')}`;
  const userId = `${getCookies('USERID')}`;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Edit Profile');
    const actionData = {};
    actionData.actionUrl = `user/${userId}`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      if (resp.payload.code === 200) {
        setProfileData(resp.payload.data.user);
        reset(resp.payload.data.user);
      } else if (resp.payload.code === 401 || resp.payload.code === 400) {
        setError(resp.payload.message);
      } else {
        setError('Something went wrong!');
      }
    });
  }, []);
  const Password = useRef({});
  Password.current = watch('Password', '');
  const onSubmit = (data) => {
    setSubmitting(true);
    setError(null);
    if (Password.current === data.ConfirmPassword) {
      const apiData = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        token: data.token,
        userid: data.userid,
      };
      dispatch(ProfileEdits(apiData)).then((resp) => {
        setSubmitting(false);
        if (resp.payload.code === 200) {
          window.location.assign('/profile');
        } else {
          setError(resp.payload.data.message);
        }
      });
    }
  };
  return (
    <div className={styles[bodyStyle]}>
      <div className={styles[formthemeStyle]} id={styles.addform}>
        <Container fluid>
          <div className={styles.profilepicdiv}>
            <ProfilePic />
          </div>
          {profileData != null ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-5">
                <Col md={6} sm={6}>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <TextInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      fieldName="name"
                      label="Name"
                      labelstyle={styles.formlabel}
                      register={register}
                      errors={errors}
                      placeHolder="Enter Your Name"
                      isRequired
                      maximLength={20}
                      minimLength={3}
                      mandatory
                    />
                  </Suspense>
                </Col>
                <Col md={6} sm={6}>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <EmailInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      label="Email"
                      labelstyle={styles.formlabel}
                      fieldName="email"
                      placeHolder="Enter Email Address"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                    />
                  </Suspense>
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6}>
                  <Suspense
                    fallback={
                      <div>
                        <SpinnerDotted style={{ color: '#39979d' }} />
                      </div>
                    }
                  >
                    <PhoneNumberInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      labelstyle={styles.formlabel}
                      label="Phone Number"
                      fieldName="phone"
                      placeHolder="Enter Phone Number"
                      register={register}
                      errors={errors}
                      mandatory
                    />
                  </Suspense>
                </Col>
              </Row>
              <input type="hidden" {...register('token')} value={token} />
              <input type="hidden" {...register('userid')} value={userId} />
              <input
                className={styles.savebtn}
                type="submit"
                disabled={submiting}
                value={submiting ? 'Please wait...' : 'Save Changes'}
              />
            </form>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '160px' }}>
              <SpinnerDotted style={{ color: '#39979d' }} />
            </div>
          )}
          <br />
          {error && <h6 className={styles[errormsgStyle]}>{error}</h6>}
          <ToastContainer autoClose={2000} />
        </Container>
      </div>
    </div>
  );
});

export default ProfileEdit;
