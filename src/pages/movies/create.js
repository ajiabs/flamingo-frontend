/* eslint-disable react/function-component-definition */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { toast } from 'react-toastify';
import TextInput from '../../components/TextField/TextField';
import TextAreaField from '../../components/TextArea/TextArea';
import { Entry } from '../../redux/entrySlice';
import { TableContext } from '../../contexts/tableContext';
import styles from './create.module.scss';
import MultipleFileUpload from '../../components/MultipleFileUpload/MultipleFileUpload';

const MoviesCreate = React.memo(() => {
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const [formIsReset, setFormIsReset] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { files } = useContext(TableContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Add Movie Details');
  }, []);
  const dispatch = useDispatch();
  const {
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
      description: data.description,
      year: data.year,
      others: data.others,
      File: files,
    };
    data.actionUrl = 'movies';
    data.actionMethod = 'post';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        navigate(-1);
        toast.success('Movie creation successfull');
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
                  <TextInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Description"
                    fieldName="description"
                    placeHolder="Enter Description"
                    register={register}
                    errors={errors}
                    isRequired
                    mandatory
                    charactersOnly
                    resetCount={formIsReset}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <TextInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Year"
                    fieldName="year"
                    placeHolder="Enter Year"
                    register={register}
                    errors={errors}
                    isRequired
                    mandatory
                    resetCount={formIsReset}
                  />
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <TextAreaField
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Others"
                    fieldName="others"
                    placeHolder="Enter Others"
                    register={register}
                    errors={errors}
                    isRequired
                    mandatory
                    resetCount={formIsReset}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <MultipleFileUpload />
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
});

export default MoviesCreate;
