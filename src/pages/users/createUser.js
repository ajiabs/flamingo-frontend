import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import EmailInput from '../../components/EmailBox/EmailBox';
import TextInput from '../../components/TextField/TextField';
import SelectBox from '../../components/SelectBox/SelectBox';
import PhoneNumberInput from '../../components/PhoneNumberBox/PhoneNumberBox';
import { Entry } from '../../redux/entrySlice';
import PasswordField from '../../components/PasswordField/PasswordField';
import MultipleFileUpload from '../../components/MultipleFileUpload/MultipleFileUpload';
import DatePickerComponent from '../../components/DatePicker/DatePicker';
import { TableContext } from '../../contexts/tableContext';
import styles from './createUser.module.scss';
import { REACT_APP_API_ROLES_DROPDOWN } from '../../redux/apiConstants';

function UserCreate() {
  const { dashboardStyle } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [perror, setPerror] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Add User Details');
    const url = REACT_APP_API_ROLES_DROPDOWN; // api url
    fetch(url)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => setRoles(resp.data.role.selectdata)); // setting response to state roles
  }, []);
  const dispatch = useDispatch();
  const { files } = useContext(TableContext);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  function onSubmitdata(data) {
    if (!data.password.match(/\d/) || !data.password.match(/[a-zA-Z]/)) {
      setPerror('Password must contain at least 1 letter and 1 number');
    } else if (data.name.trim().length === 0) {
      document.getElementById('name').focus();
    }
    setSubmitting(true);
    setError(null);
    const apiData = {
      name: data.name,
      dateOfBirth: moment(data.dateOfBirth).format('MM/DD/YYYY'),
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
      role: data.role.value,
      isVerified: true,
      File: files,
    };
    data.actionUrl = 'user';
    data.actionMethod = 'post';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        navigate(-1);
        toast.success('User creation successfull');
      } else if (resp.payload.code === 401 || resp.payload.code === 400) {
        setError(resp.payload.message);
      } else {
        setError('Something went wrong!');
      }
    });
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
              toast.success('User creation successfull');
            }}
            className={styles.arrowback}
          />
          <div className="container-fluid mt-5">
            <form onSubmit={handleSubmit(onSubmitdata)}>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
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
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <EmailInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Email"
                    placeHolder="Enter Email Address"
                    fieldName="email"
                    register={register}
                    errors={errors}
                    isRequired
                    mandatory
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <PasswordField
                    fieldName="password"
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Password"
                    register={register}
                    errors={errors}
                    placeHolder="Enter Password"
                    isRequired
                    minimLength={8}
                    eyeiconstyle={styles.eyeicon}
                    mandatory
                  />
                  {perror && <p className={styles[errormsgStyle]}>{perror}</p>}
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <SelectBox
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    name="role"
                    label="Role"
                    labelstyle={styles.formlabel}
                    control={control}
                    register={register}
                    values={roles}
                    errors={errors}
                    placeholder="Choose Role"
                    mandatory
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <PhoneNumberInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Phone Number"
                    placeHolder="Phone Number"
                    fieldName="phoneNumber"
                    register={register}
                    errors={errors}
                    mandatory
                    isRequired
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <Label className={styles.formlabel}>Date of Birth</Label>
                  <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
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
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <MultipleFileUpload />
                </div>
              </div>
              <div className="d-flex">
                <input
                  className={styles.formbtn}
                  type="submit"
                  disabled={submiting}
                  value={submiting ? 'Please wait..' : 'Submit'}
                />
                <input
                  className={styles.resetbtn}
                  type="button"
                  value="Reset"
                  onClick={() => {
                    reset();
                  }}
                />
              </div>
              <br />
              {error && (
                <h6 className={styles[errormsgStyle]} style={{ float: 'right' }}>
                  {error}
                </h6>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCreate;
