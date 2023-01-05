import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { toast } from 'react-toastify';
import EmailInput from '../../components/EmailBox/EmailBox';
import TextInput from '../../components/TextField/TextField';
import SelectBox from '../../components/SelectBox/SelectBox';
import PhoneNumberInput from '../../components/PhoneNumberBox/PhoneNumberBox';
import CheckBox from '../../components/CheckBox/CheckBox';
import { Entry } from '../../redux/entrySlice';
import { TableContext } from '../../contexts/tableContext';
import styles from './create.module.scss';

function EmployeeCreate() {
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const [formIsReset, setFormIsReset] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Add Employee Details');
  }, []);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  function onSubmitdata(data) {
    setSubmitting(true);
    setError(null);
    const skills = [];
    if (data.skills) {
      for (let i = 0; i < data.skills.length; i += 1) {
        skills.push(data.skills[i]);
      }
    }

    const apiData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation.value,
      skills,
      status: data.status.value,
      permanent: data.permanent,
    };
    data.designation = data.designation.value;
    data.actionUrl = 'employee';
    data.actionMethod = 'post';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        navigate(-1);
        toast.success('Employee creation successfull');
      } else if (resp.payload.code === 401 || resp.payload.code === 400) {
        setError(resp.payload.message);
      } else {
        setError('Something went wrong!');
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
                    charactersOnly
                    resetCount={formIsReset}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <EmailInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    fieldName="email"
                    label="Email"
                    register={register}
                    errors={errors}
                    isRequired
                    placeHolder="Email"
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
                    placeHolder="Phone Number"
                    label="Phone Number"
                    fieldName="phone"
                    register={register}
                    errors={errors}
                    maxLength={15}
                    mandatory
                    isRequired
                  />
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <SelectBox
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    name="designation"
                    label="Designation"
                    labelstyle={styles.formlabel}
                    control={control}
                    register={register}
                    values={desigValues}
                    errors={errors}
                    placeholder="Choose Designation"
                    mandatory
                    isRequired
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <SelectBox
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    name="status"
                    label="Status"
                    labelstyle={styles.formlabel}
                    control={control}
                    register={register}
                    values={status}
                    errors={errors}
                    placeholder="Choose Status"
                    mandatory
                    isRequired
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <CheckBox
                    className={styles.inputbox}
                    fieldName="permanent"
                    label="Permanent"
                    labelstyle={styles.formlabel}
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
                value={submiting ? 'Please wait...' : 'Submit'}
              />
              <input
                className={styles.resetbtn}
                type="button"
                value="Reset"
                onClick={() => {
                  setFormIsReset(true);
                  reset();
                }}
              />
              {error && <h6 className={styles[errormsgStyle]}>{error}</h6>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCreate;
