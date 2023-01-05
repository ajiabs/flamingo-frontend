/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import TextInput from '../../components/TextField/TextField';
import { Entry } from '../../redux/entrySlice';
import { TableContext } from '../../contexts/tableContext';
import styles from './create.module.scss';
import { CapitalizeFirstLetter } from '../../utilityFunctions/utilsFunctions';

function CreateRoles() {
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle, permissionboxStyle } = useContext(TableContext);
  const { bodyheader } = useContext(TableContext);
  const { errormsgStyle } = useContext(TableContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submiting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState([]);
  const [sections, setSections] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Add Role Details');
    const actionData = {};
    actionData.actionUrl = 'roles/modules ';
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      setSections(resp.payload.data.allModules);
    });
  }, []);
  function onSubmitdata(data) {
    setSubmitting(true);
    const permissionArr = [];
    Object.keys(status).forEach((item) => {
      const tempObject = { section: item };
      const finalObeject = { ...tempObject, ...Object.assign(...status[item]) };
      permissionArr.push(finalObeject);
    });
    data.permissions = permissionArr;
    const apiData = {
      name: data.name,
      permissions: data.permissions,
    };
    data.actionUrl = 'roles/';
    data.actionMethod = 'post';
    data.apiData = apiData;
    setError(null);
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 201) {
        navigate(-1);
      } else if (resp.payload.code === 401 || resp.payload.code === 400) {
        setError(resp.payload.message);
      } else {
        setError(resp.payload.message);
      }
    });
  }
  const actions = [];
  const [checkedState, setCheckedState] = useState(new Array(actions.length).fill(false));

  const handleOnChange = (e, position, name, section) => {
    if (e.target.value === 'select-all') {
      section.forEach((sec) => {
        // eslint-disable-next-line no-unused-expressions
        status[sec] && status[sec].splice(0, sections[sec].length);
        setCheckedState(Array(sections[sec].length).fill(e.target.checked));
        sections[sec].forEach((nam) => {
          const updatedstaus = { [nam]: e.target.checked };
          const removestatus = { [nam]: !e.target.checked };
          if (status[sec]) {
            for (const i in status[sec]) {
              if (JSON.stringify(status[sec][i]) === JSON.stringify(removestatus)) {
                status[sec].splice(i, 1);
                break;
              }
            }
            status[sec].push(updatedstaus);
          } else {
            status[sec] = [updatedstaus];
          }
          for (let i = 0; i < sections[sec].length; i += 1) {
            document.getElementById(`custom-checkbox-${sec}-${i}`).checked = e.target.checked;
          }
          setStatus(status);
        });
      });
    } else {
      // eslint-disable-next-line max-len
      const updatedCheckedState = checkedState.map((item, indexed) =>
        indexed === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
      const updatedstaus = { [name]: e.target.checked };
      const removestatus = { [name]: !e.target.checked };
      if (status[section]) {
        for (const i in status[section]) {
          if (JSON.stringify(status[section][i]) === JSON.stringify(removestatus)) {
            document.getElementById('select-all').checked = false;
            status[section].splice(i, 1);
            break;
          }
        }
        status[section].push(updatedstaus);
      } else {
        status[section] = [updatedstaus];
      }
      let selectAllCount = 0;
      Object.keys(sections).forEach((item) => {
        if (status[item]) {
          let count = 0;
          status[item].forEach((value) => {
            if (Object.values(value)[0]) {
              count += 1;
            } else {
              count -= 1;
            }
          });
          if (count === sections[item].length) {
            selectAllCount += 1;
          }
        }
      });
      if (selectAllCount === Object.keys(sections).length) {
        document.getElementById('select-all').checked = true;
        document.getElementById('select-all').disabled = true;
      } else {
        document.getElementById('select-all').checked = false;
        document.getElementById('select-all').disabled = false;
      }
      setStatus(status);
    }
  };
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
          <div className="container-fluid mt-3">
            <form onSubmit={handleSubmit(onSubmitdata)}>
              <div className="row">
                <div className="col-md-4 col-sm-4" style={{ padding: '0px' }}>
                  <TextInput
                    className={styles.inputbox}
                    classNamedark={styles.inputbox1}
                    labelstyle={styles.formlabel}
                    label="Role Name"
                    fieldName="name"
                    placeHolder="Enter Role Name"
                    register={register}
                    errors={errors}
                    isRequired
                    mandatory
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6" style={{ padding: '0px 12px' }}>
                  <input
                    type="checkbox"
                    id="select-all"
                    name="select-all"
                    value="select-all"
                    onChange={(e) => handleOnChange(e, 0, null, Object.keys(sections))}
                  />
                  <label htmlFor="select-all" className={styles.selectlabel}>
                    Select all
                  </label>
                </div>
              </div>
              <br />
              {sections &&
                Object.keys(sections).map((value) => (
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className={styles[permissionboxStyle]} id={styles.permissionbox}>
                        <h5 className={styles[bodyheader]} id={styles.addheading}>
                          {CapitalizeFirstLetter(value)}
                        </h5>
                        <ul>
                          {sections[value].map((name, index) => (
                            <li>
                              <input
                                type="checkbox"
                                id={`custom-checkbox-${value}-${index}`}
                                name={name}
                                value={name}
                                onChange={(e) => handleOnChange(e, index, name, value)}
                              />
                              <label
                                htmlFor={`custom-checkbox-${value}-${index}`}
                                className={styles.selectlabel}
                              >
                                {name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              <input
                className={styles.formbtn}
                type="submit"
                disabled={submiting}
                value={submiting ? 'Please wait..' : 'Submit'}
              />
              {error && <h6 className={styles[errormsgStyle]}>{error}</h6>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoles;
