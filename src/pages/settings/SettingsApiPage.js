import React, { useEffect, useState, Suspense, lazy, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col } from 'react-bootstrap';
import { SpinnerDotted } from 'spinners-react';
import { useDispatch } from 'react-redux';
import { TableContext } from '../../contexts/tableContext';
import styles from './settings.module.scss';
import { Entry } from '../../redux/entrySlice';

const TextInput = lazy(() => import('../../components/TextField/TextField'));

function SettingsApi() {
  const [submiting, setSubmitting] = useState(false);
  const { formthemeStyle } = useContext(TableContext);
  const { settingsapiSetStyle, settingsgeneralSetStyle, settingsprefSetStyle } =
    useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [settingsApiData, setSettingsApiData] = useState([]);
  const getSettings = () => {
    const data = {
      actionUrl: 'settings',
      actionMethod: 'get',
    };
    dispatch(Entry(data)).then((resp) => {
      setSettingsApiData(resp.payload[1]);
      reset(resp.payload[1].values);
    });
  };
  useEffect(() => {
    getSettings();
    setDashboardHeader('Settings');
    settingsapiSetStyle('settingsgeneral');
    settingsgeneralSetStyle('settingslinks');
    settingsprefSetStyle('settingslinks');
  }, []);
  const onSubmit = (data) => {
    setSubmitting(true);
    const updationData = {
      values: {
        emailKey: data.emailKey,
        googeApiKey: data.googeApiKey,
      },
    };
    data.actionUrl = 'settings/keys';
    data.actionMethod = 'patch';
    data.updationData = updationData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload) {
        window.location.reload(false);
      }
    });
  };
  return (
    <div>
      {Object.keys(settingsApiData.values).length !== 0 ? (
        <div className={styles[formthemeStyle]} id={styles.addform}>
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
                    fieldName="emailKey"
                    label="Email Key"
                    labelstyle={styles.formlabel}
                    register={register}
                    errors={errors}
                    placeHolder="Enter Email Key"
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
                  <TextInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    label="Google Api Key"
                    labelstyle={styles.formlabel}
                    fieldName="googeApiKey"
                    placeHolder="Enter Google Api Key"
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
                disabled={submiting}
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

export default SettingsApi;
