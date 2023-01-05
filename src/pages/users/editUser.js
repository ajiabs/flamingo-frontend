import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Label } from 'reactstrap';
import { SpinnerDotted } from 'spinners-react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { Entry } from '../../redux/entrySlice';
import SelectBox from '../../components/SelectBox/SelectBox';
import PhoneNumberInput from '../../components/PhoneNumberBox/PhoneNumberBox';
import styles from './editUser.module.scss';
import { TableContext } from '../../contexts/tableContext';
import MultipleFileUpload from '../../components/MultipleFileUpload/MultipleFileUpload';
import DatePickerComponent from '../../components/DatePicker/DatePicker';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../../components/TextField/TextField';
import EmailInput from '../../components/EmailBox/EmailBox';
import { REACT_APP_API_ROLES_DROPDOWN } from '../../redux/apiConstants';

function UserEdit() {
  let userId;
  const [submiting, setSubmitting] = useState(false);
  const { dashboardStyle } = useContext(TableContext);
  // const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const params = useParams();
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const { files } = useContext(TableContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Edit User Details');
    userId = params.userId;
    const url2 = REACT_APP_API_ROLES_DROPDOWN; // api url
    fetch(url2)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => {
        setRoles(resp.data.role);
      }); // setting response to state posts

    const actionData = {};
    actionData.actionUrl = `user/${userId}`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      console.log(resp);
      // delete resp.payload.id;
      setUser(resp.payload.data.user);
      reset(resp.payload.data.user);
    });
  }, []);
  // eslint-disable-next-line no-unused-vars
  function onSubmitdata(data) {
    if (data.name.trim().length === 0) {
      document.getElementById('name').focus();
    } else {
      setSubmitting(true);
      setError(null);
      const apiData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: moment(data.dateOfBirth).format('MM/DD/YYYY'),
        role: data.role.id ? data.role.id : data.role.value,
        isVerified: true,
        File: files,
      };
      data.actionUrl = `user/${params.userId}`;
      data.actionMethod = 'patch';
      data.apiData = apiData;
      dispatch(Entry(data)).then((resp) => {
        setSubmitting(false);
        if (resp.payload.code === 200) {
          navigate(-1);
          toast.success('User updation successfull');
          // eslint-disable-next-line max-len
        } else if (
          resp.payload.code === 401 ||
          resp.payload.code === 400 ||
          resp.payload.code === 403
        ) {
          setError(resp.payload.message);
          toast.error('Error');
        } else {
          navigate(-1);
        }
      });
    }
  }
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ minHeight: '100vh' }}
        id={styles.dashboardcont2}
      >
        <div className={styles[formthemeStyle]} id={styles.addform}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            value="Back"
            onClick={() => {
              navigate(-1);
            }}
            className={styles.arrowback}
          />
          <div className="container-fluid mt-5 edituserform">
            {user.length !== 0 ? (
              <form onSubmit={handleSubmit(onSubmitdata)}>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    {user && (
                      <div>
                        <TextInput
                          className={styles.inputbox}
                          classNamedark={styles.inputbox1}
                          labelstyle={styles.formlabel}
                          label="Name"
                          fieldName="name"
                          placeHolder="Enter Name"
                          register={register}
                          errors={errors}
                          isRequired
                          mandatory
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <EmailInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      labelstyle={styles.formlabel}
                      label="Email"
                      fieldName="email"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                      placeHolder="Email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <PhoneNumberInput
                      labelstyle={styles.formlabel}
                      classNamedark={styles.inputbox1}
                      label="Phone Number"
                      placeHolder="Phone Number"
                      className={styles.inputbox}
                      fieldName="phone"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <SelectBox
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      name="role"
                      label="Role"
                      labelstyle={styles.formlabel}
                      control={control}
                      register={register}
                      values={roles.selectdata}
                      errors={errors}
                      placeholder="Choose Role"
                      defaultvalue={user.role.id}
                      mandatory
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <Label className={styles.formlabel}>Date of Birth</Label>
                    <span style={{ color: 'red' }}>*</span>
                    <DatePickerComponent
                      className={styles.dateinputbox}
                      classNamedark={styles.dateinputbox1}
                      control={control}
                      name="dateOfBirth"
                      isRequired
                      errors={errors}
                      label="Date Of Birth"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 col-sm-6">
                    <MultipleFileUpload editFiles={user.files} section="user" />
                  </div>
                </div>
                <br />
                <input
                  className={styles.formbtn}
                  type="submit"
                  disabled={submiting}
                  value={submiting ? 'Please wait..' : 'Update'}
                />
                {error && <h6 className={styles[errormsgStyle]}>{error}</h6>}
              </form>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '130px', color: '#39979d' }}>
                <SpinnerDotted />
              </div>
            )}
            <br />
            <ToastContainer autoClose={2000} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
