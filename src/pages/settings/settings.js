/* eslint-disable global-require */
import React, { useEffect, useState, Suspense, lazy, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Row, Col } from 'react-bootstrap';
import { Label } from 'reactstrap';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { SpinnerDotted } from 'spinners-react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TableContext } from '../../contexts/tableContext';
import styles from './settings.module.scss';
import { Entry } from '../../redux/entrySlice';
import envValues from '../../enviornment';
import { setCookies } from '../../hooks/useCookies';

const EmailInput = lazy(() => import('../../components/EmailBox/EmailBox'));
const TextInput = lazy(() => import('../../components/TextField/TextField'));

function Settings() {
  const [submiting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { formthemeStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { settingsgeneralSetStyle, settingsapiSetStyle, settingsprefSetStyle } =
    useContext(TableContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [settingsData, setSettingsData] = useState([]);
  const { bodyheader } = useContext(TableContext);
  const [loader, setLoader] = useState(false);
  const imageupload = (files) => {
    setLoader(true);
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('File', files);
    axios
      .post(`${envValues.REACT_APP_API_ENDPOINT}/settings/logo`, formData, [headers])
      .then((response) => {
        setLoader(false);
        if (response.status === 200) {
          toast.success('Logo Updated Successfully');
          setSettingsData(response.data.data.settings);
          setCookies('SITE_SETTINGS', JSON.stringify(JSON.stringify(response.data.data.settings)));
        }
        return response.data;
      })
      .catch((e) => e);
  };
  const removePic = () => {
    setLoader(true);
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };
    const body = {
      logo: 'https://boilerplate-armia.s3.amazonaws.com/downloads/r512ndohjf0.png-1653567387848',
    };
    axios
      .post(`${envValues.REACT_APP_API_ENDPOINT}/settings/logoremove`, body, [headers])
      .then((response) => {
        setLoader(false);
        if (response.status === 200) {
          setSettingsData(response.data.data.settings);
          setCookies('SITE_SETTINGS', JSON.stringify(JSON.stringify(response.data.data.settings)));
          toast.success('Logo Updated Successfully');
        }
        return response.data;
      })
      .catch((e) => e);
  };
  const getSettings = () => {
    const data = {
      actionUrl: 'settings',
      actionMethod: 'get',
    };
    dispatch(Entry(data)).then((resp) => {
      setSettingsData(resp.payload[0]);
      reset(resp.payload[0].values);
    });
  };
  useEffect(() => {
    getSettings();
    setDashboardHeader('Settings');
    settingsgeneralSetStyle('settingsgeneral');
    settingsapiSetStyle('settingslinks');
    settingsprefSetStyle('settingslinks');
  }, []);
  const onSubmit = (data) => {
    setSubmitting(true);
    const updationData = {
      values: {
        sitename: data.sitename,
        adminEmail: data.adminEmail,
      },
    };
    data.actionUrl = 'settings/general';
    data.actionMethod = 'patch';
    data.apiData = updationData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload) {
        window.location.reload(false);
      }
    });
  };
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setImg(reader.result);
        const files = e.target.files[0];
        imageupload(files);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return loader ? (
    <>
      <br />
      <SpinnerDotted style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }} />
    </>
  ) : (
    <div>
      {Object.keys(settingsData.values).length !== 0 ? (
        <div className={styles[formthemeStyle]} id={styles.addform}>
          {/* <Image src={settingsData.logo} alt="Site logo" /> */}
          <Image src={settingsData.logo} className={styles.logo} alt="Site logo" />
          {/* <h6 className={styles.sitetitle}>Site Name : {settingsData.values.sitename}</h6>
          <h6 className={styles.sitetitle}>Admin Email : {settingsData.values.adminEmail}</h6> */}
          <Popup
            trigger={
              <div className={styles.editbtnsection}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={styles[bodyheader]}
                  id={styles.penicon}
                />
              </div>
            }
            position="bottom left"
          >
            <div className={styles.upload}>
              <Label htmlFor="input">
                <FontAwesomeIcon
                  name="image upload"
                  onChange={imageHandler}
                  icon={faArrowUpFromBracket}
                  className={styles.uploadicon}
                />
              </Label>
              <input
                id="input"
                type="file"
                name="image upload"
                style={{ display: 'none' }}
                accept="image/*"
                placeholder="Update New Pic"
                onChange={imageHandler}
              />
              <FontAwesomeIcon
                onClick={removePic}
                icon={faUserXmark}
                className={styles.crossicon}
              />
            </div>
          </Popup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mt-3">
              <Col md={4} sm={4}>
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
                    fieldName="sitename"
                    label="Site Name"
                    labelstyle={styles.formlabel}
                    register={register}
                    errors={errors}
                    placeHolder="Enter First Name"
                    isRequired
                    maximLength={20}
                    minimLength={3}
                  />
                </Suspense>
              </Col>
            </Row>
            <Row>
              <Col md={4} sm={4}>
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
                    label="Admin Email"
                    labelstyle={styles.formlabel}
                    fieldName="adminEmail"
                    placeHolder="Enter Email Address"
                    register={register}
                    errors={errors}
                    isRequired
                  />
                </Suspense>
              </Col>
            </Row>
            <div className={styles.savebtnsection}>
              <input
                className={styles.savebtn}
                type="submit"
                value={submiting ? 'Please wait..' : 'Save Changes'}
              />
            </div>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '160px', color: '#7a68c2' }}>
          <SpinnerDotted style={{ color: '#39979d' }} />
        </div>
      )}
    </div>
  );
}

export default Settings;
