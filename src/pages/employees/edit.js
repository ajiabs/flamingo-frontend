/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { Entry } from '../../redux/entrySlice';
import EmailInput from '../../components/EmailBox/EmailBox';
import TextInput from '../../components/TextField/TextField';
import SelectBox from '../../components/SelectBox/SelectBox';
import PhoneNumberInput from '../../components/PhoneNumberBox/PhoneNumberBox';
import CheckBoxField from '../../components/CheckBox/CheckBox';
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import { TableContext } from '../../contexts/tableContext';
import styles from './edit.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Decrypt } from '../../utilityFunctions/utilsFunctions';
import { REACT_APP_API_SKILLS } from '../../redux/apiConstants';

const EmployeeEdit = React.memo(() => {
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const [loading, setLoading] = useState(false);
  let empId;
  const [defaultDesignation, setDefaultDesignation] = useState();
  const [defaultStatus, setDefaultStatus] = useState();
  const params = useParams();
  const [error, setError] = useState(null);
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Edit Employee Details');
    setLoading(true);
    empId = params.empId;
    const url2 = REACT_APP_API_SKILLS; // api url
    fetch(url2)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => setPosts(resp)); // setting response to state posts

    const actionData = {};
    actionData.actionUrl = `employee/${empId}`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      setLoading(false);
      delete resp.payload.id;
      setDefaultDesignation(resp.payload.data.user.designation);
      setDefaultStatus(resp.payload.status);
      setEmployee(resp.payload.data.user);
      reset(resp.payload.data.user);
    });
  }, []);
  function onSubmitdata(data) {
    setSubmitting(true);
    const skills = [];
    for (let i = 0; i < data.skills.length; i += 1) {
      skills.push(data.skills[i]);
    }
    const apiData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation.value ? data.designation.value : defaultDesignation,
      skills,
      status: data.status instanceof Object ? data.status.value : data.status,
    };
    data.actionUrl = `employee/${params.empId}`;
    data.actionMethod = 'patch';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        navigate('/employee');
        toast.success('Employee updation successfull');
      } else if (resp.payload.code === 401 || resp.payload.code === 400) {
        setError(resp.payload.message);
        toast.error('Error');
      } else {
        navigate(-1);
      }
    });
  }
  const desigValues = [
    {
      value: 'TL',
      label: 'Team Lead',
    },
    {
      value: 'SE',
      label: 'Software Engineer',
    },
    {
      value: 'UI',
      label: 'Designer',
    },
  ];
  const status = [
    {
      value: true,
      label: 'Active',
    },
    {
      value: false,
      label: 'InActive',
    },
  ];
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
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
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '160px',
                marginBottom: '160px',
                color: '#7a68c2',
              }}
            >
              <SpinnerDotted style={{ color: '#39979d' }} />
            </div>
          ) : (
            <div className="container-fluid mt-5">
              <form onSubmit={handleSubmit(onSubmitdata)}>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    {employee && (
                      <div>
                        <TextInput
                          className={styles.inputbox}
                          classNamedark={styles.inputbox1}
                          labelstyle={styles.formlabel}
                          fieldName="name"
                          label="First Name"
                          placeHolder="First Name"
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
                      placeHolder="Email"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <PhoneNumberInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      labelstyle={styles.formlabel}
                      label="Phone Number"
                      fieldName="phone"
                      placeHolder="Phone Number"
                      register={register}
                      errors={errors}
                      mandatory
                      isRequired
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <SelectBox
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      labelstyle={styles.formlabel}
                      name="designation"
                      label="Designation"
                      control={control}
                      values={desigValues}
                      errors={errors}
                      placeholder="Choose Designation"
                      mandatory
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <SelectBox
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      name="status"
                      label="Status"
                      labelstyle={styles.formlabel}
                      control={control}
                      register={register}
                      errors={errors}
                      values={status}
                      placeholder="Choose Status"
                      mandatory
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <CheckBoxField
                      className={styles.inputbox}
                      labelstyle={styles.formlabel}
                      fieldName="status"
                      label="Permanent"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                    />
                  </div>
                </div>
                <input
                  className={styles.formbtn}
                  type="submit"
                  disabled={submiting}
                  value={submiting ? 'Please wait..' : 'Update'}
                />
              </form>
              <br />
              <ToastContainer autoClose={2000} />
            </div>
          )}
          {error && <h6 className={styles[errormsgStyle]}>{error}</h6>}
        </div>
      </div>
    </div>
  );
});

export default EmployeeEdit;
