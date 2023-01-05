/* eslint-disable react/jsx-no-bind */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SpinnerDotted } from 'spinners-react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Entry } from '../redux/entrySlice';
import styles from './faq.module.scss';
import { TableContext } from '../contexts/tableContext';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../components/TextField/TextField';
import TextEditor from '../components/TextEditor/TextEditor';

function Faq() {
  const { editors, setEditors } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const { dashboardStyle } = useContext(TableContext);
  // const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    setDashboardHeader('Edit User Details');

    const actionData = {};
    actionData.actionUrl = `cms/faq`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      setContent(resp.payload.data.content);
      setEditors(resp.payload.data.content.description);
      reset(resp.payload.data.content);
    });
  }, []);
  // eslint-disable-next-line no-unused-vars
  function onSubmitdata(data) {
    setSubmitting(true);
    setError(null);
    const apiData = {
      name: data.name,
      description: editors,
    };
    data.actionUrl = `cms/faq`;
    data.actionMethod = 'patch';
    data.apiData = apiData;
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        // navigate(-1);
        // toast.success('Content updation successfull');
        // eslint-disable-next-line max-len
      } else if (
        resp.payload.code === 401 ||
        resp.payload.code === 400 ||
        resp.payload.code === 403
      ) {
        setError(resp.payload.message);
        toast.error('Error');
      } else {
        // navigate(-1);
      }
    });
  }
  return (
    <div className={styles[bodyStyle]}>
      <div className={styles[dashboardStyle]} style={{ height: '100vh' }}>
        <div className={styles[formthemeStyle]} id={styles.addform}>
          <div className="container-fluid mt-3">
            {content.length !== 0 ? (
              <form onSubmit={handleSubmit(onSubmitdata)}>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    {content && (
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
                          readOnly
                          isRequired
                          mandatory
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <TextEditor content={content.description} />
                  </div>
                </div>
                <br />
                <input
                  className={styles.backbtn}
                  type="button"
                  value="Back"
                  onClick={() => {
                    navigate(-1);
                  }}
                />
                <input
                  className={styles.formbtn}
                  type="submit"
                  disabled={submiting}
                  value={submiting ? 'Please wait..' : 'Submit'}
                />
                {error && <h6 className={styles[errormsgStyle]}>{error}</h6>}
              </form>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '130px' }}>
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

export default Faq;
