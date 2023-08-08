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
import TextInput from '../../components/TextField/TextField';
import SelectBox from '../../components/SelectBox/SelectBox';
import CheckBoxField from '../../components/CheckBox/CheckBox';
import { TableContext } from '../../contexts/tableContext';
import styles from './edit.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Decrypt } from '../../utilityFunctions/utilsFunctions';
import { REACT_APP_API_SKILLS } from '../../redux/apiConstants';
import TextAreaField from '../../components/TextArea/TextArea';
import MultipleFileUpload from '../../components/MultipleFileUpload/MultipleFileUpload';

const MoviesEdit = React.memo(() => {
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const [loading, setLoading] = useState(false);
  let userId;
  const [defaultDesignation, setDefaultDesignation] = useState();
  const [defaultStatus, setDefaultStatus] = useState();
  const params = useParams();
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
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
    setDashboardHeader('Edit Movies Details');
    setLoading(true);
    userId = params.userId;
    const url2 = REACT_APP_API_SKILLS; // api url
    fetch(url2)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => setPosts(resp)); // setting response to state posts

    const actionData = {};
    actionData.actionUrl = `movies/${userId}`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      setLoading(false);
      delete resp.payload.id;
      setDefaultDesignation(resp.payload.data.user.designation);
      setDefaultStatus(resp.payload.status);
      setMovies(resp.payload.data.user);
      reset(resp.payload.data.user);
    });
  }, []);
  function onSubmitdata(data) {
    setSubmitting(true);
    const apiData = {
      name: data.name,
      description: data.description,
      year: data.year,
      others: data.others,
      File: files,
    };
    data.actionUrl = `movies/${params.userId}`;
    data.actionMethod = 'patch';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        navigate('/movies');
        toast.success('Movie updation successfull');
      } else if (resp.payload.code === 401 || resp.payload.code === 400) {
        setError(resp.payload.message);
        toast.error('Error');
      } else {
        navigate(-1);
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
                    {movies && (
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
                    <TextInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      labelstyle={styles.formlabel}
                      fieldName="description"
                      label="Description"
                      placeHolder="Enter Description"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <TextInput
                      className={styles.inputbox}
                      classNamedark={styles.inputbox1}
                      labelstyle={styles.formlabel}
                      fieldName="year"
                      label="Year"
                      placeHolder="Enter Year"
                      register={register}
                      errors={errors}
                      isRequired
                      mandatory
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
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
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-md-6 col-sm-6">
                    <MultipleFileUpload editFiles={movies.files} section="movies" />
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

export default MoviesEdit;
