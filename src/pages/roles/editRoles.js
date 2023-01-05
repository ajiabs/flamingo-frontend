/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { TableContext } from '../../contexts/tableContext';
import TextInput from '../../components/TextField/TextField';
import { Entry } from '../../redux/entrySlice';
import { CapitalizeFirstLetter } from '../../utilityFunctions/utilsFunctions';
import styles from './edit.module.scss';
import { getCookies, setCookies } from '../../hooks/useCookies';

function EditRoles() {
  let RoleId;
  const [submiting, setSubmitting] = useState(false);
  const params = useParams();
  const {
    dashboardStyle,
    setDashboardHeader,
    bodyStyle,
    formthemeStyle,
    bodyheader,
    errormsgStyle,
    permissionboxStyle,
  } = useContext(TableContext);
  const [permissions, setPermisisons] = useState();
  const [modules, setModules] = useState();
  // eslint-disable-next-line no-unused-vars
  const [defaultSelectall, setDefaultSelectall] = useState([]);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [status, setStatus] = useState([]);
  const [role, setRole] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Edit Role Details');
    setLoading(true);
    RoleId = params.roleId;
    const actionData = {};
    actionData.actionUrl = `roles/${RoleId}`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      console.log(resp);
      const permissionsObj = {};
      resp.payload.data.response.result.permissions.forEach((permission) => {
        const clonedObj = JSON.parse(JSON.stringify(permission));
        delete clonedObj.section;
        const arr = [];
        Object.keys(clonedObj).forEach((key) => {
          const newObj = {};
          newObj[key] = clonedObj[key];
          arr.push(newObj);
        });
        permissionsObj[permission.section] = arr;
      });
      const perm = resp.payload.data.response.result.permissions;
      const mod = resp.payload.data.response.modules;
      const permi = [];
      Object.keys(mod).forEach((module) => {
        let isAvailable = false;
        perm.forEach((item) => {
          const itemName = item.section;
          if (module === itemName.toLowerCase()) {
            permi.push({
              create: item.create,
              edit: item.edit,
              section: itemName.toLowerCase(),
              view: item.view,
              delete: item.delete,
            });
            isAvailable = true;
          }
        });
        if (!isAvailable) {
          permi.push({
            create: false,
            edit: false,
            section: module.toLowerCase(),
            view: false,
            delete: false,
          });
        }
      });
      const temp = [];
      temp.push(permissionsObj);
      let selectAllCount = 0;
      Object.keys(resp.payload.data.response.modules).forEach((item) => {
        temp.forEach((ele) => {
          if (ele[item]) {
            let count = 0;
            ele[item].forEach((value) => {
              if (Object.values(value)[0]) {
                count += 1;
              }
            });
            if (count === ele[item].length) {
              selectAllCount += 1;
            }
          }
        });
      });
      setDefaultSelectall(selectAllCount);
      setModules(resp.payload.data.response.modules);
      setPermisisons(permi);
      setRole(resp.payload.data.response.result);
      setStatus(permissionsObj);
      reset(resp.payload.data.response.result);
      setLoading(false);
    });
  }, []);
  function onSubmitdata(data) {
    setSubmitting(true);
    RoleId = params.roleId;
    const permissionArr = [];
    Object.keys(status).forEach((item) => {
      const tempObject = { section: item };
      const finalObeject = { ...tempObject, ...Object.assign(...status[item]) };
      permissionArr.push(finalObeject);
    });
    const apiData = {
      name: data.name,
      permissions: permissionArr,
    };
    data.actionUrl = `roles/${RoleId}`;
    data.actionMethod = 'patch';
    data.apiData = apiData;
    // console.log(data);
    setError(null);
    dispatch(Entry(data)).then((resp) => {
      console.log(resp);
      setSubmitting(false);
      if (resp.payload.code === 200) {
        const currentUserRole = getCookies('USERROLE');
        if (resp.payload.role.name.toLowerCase() === currentUserRole.toLowerCase()) {
          setCookies('USERPERMISSION', resp.payload.role.permissions);
          setCookies('USERMENU', resp.payload.userMenu.userMenu);
        }
        navigate(-1);
      } else if (
        resp.payload.code === 401 ||
        resp.payload.code === 400 ||
        resp.payload.code === 500
      ) {
        setError(resp.payload.message);
      } else {
        setError('Something went wrong!');
      }
    });
  }
  const actions = [
    { name: 'create' },
    {
      name: 'view',
    },
    {
      name: 'edit',
    },
    {
      name: 'delete',
    },
  ];
  const [checkedState, setCheckedState] = useState([]);

  const handleOnChange = (e, position, name, section) => {
    // eslint-disable-next-line max-len
    if (e.target.value === 'select-all') {
      section.forEach((sec) => {
        // eslint-disable-next-line no-unused-expressions
        status[sec] && status[sec].splice(0, modules[sec].length);
        setCheckedState(Array(modules[sec].length).fill(e.target.checked));
        modules[sec].forEach((nam) => {
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
          for (let i = 0; i < modules[sec].length; i += 1) {
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
            if (section !== 'dashboard') {
              document.getElementById('select-all').checked = false;
            }
            status[section].splice(i, 1);
            break;
          }
        }
        status[section].push(updatedstaus);
      } else {
        status[section] = [updatedstaus];
      }
      let selectAllCount = 0;
      Object.keys(modules).forEach((item) => {
        let count = 0;
        status[item].forEach((val) => {
          if (item === 'dashboard') {
            if (Object.keys(val)[0] === 'view') {
              if (Object.values(val)[0]) {
                count += 1;
              }
            }
          } else if (Object.keys(val)[0] !== 'list') {
            if (Object.values(val)[0]) {
              count += 1;
            }
          }
        });
        if (count === modules[item].length) {
          selectAllCount += 1;
        }
      });
      if (selectAllCount === Object.keys(modules).length) {
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
        {loading ? (
          <SpinnerDotted style={{ marginLeft: '250px', marginTop: '50px', color: '#39979d' }} />
        ) : (
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
                    {role && (
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
                    )}
                  </div>
                </div>
                <div>
                  <input
                    defaultChecked={modules && Object.keys(modules).length === defaultSelectall}
                    type="checkbox"
                    id="select-all"
                    name="select-all"
                    value="select-all"
                    onChange={(e) => handleOnChange(e, 0, actions, Object.keys(modules))}
                  />
                  <label htmlFor="select-all" className={styles.selectlabel}>
                    Select all
                  </label>
                </div>
                <br />
                {permissions &&
                  permissions.map((item) => (
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className={styles[permissionboxStyle]} id={styles.permissionbox}>
                          <h5 className={styles[bodyheader]} id={styles.addheading}>
                            {CapitalizeFirstLetter(item.section)}
                          </h5>
                          <ul>
                            {modules[item.section].map((act, index) => (
                              <li key={act}>
                                <div>
                                  <div>
                                    {/* {item.section === 'dashboard' && act.name === 'view' ? (
                                          <>
                                            <input
                                              defaultChecked={!!item[act.name]}
                                              type="checkbox"
                                              id={`custom-checkbox-${item.section}-${index}`}
                                              name={act.name}
                                              value={act.name}
                                              // eslint-disable-next-line max-len
                                              onChange={(e) =>
                                                handleOnChange(e, index, act.name, item.section)
                                              }
                                            />
                                            <label
                                              htmlFor={`custom-checkbox-${item.section}-${index}`}
                                              className={styles.selectlabel}
                                            >
                                              {act.name}
                                            </label>
                                          </>
                                        ) : (
                                          item.section !== 'dashboard' && (
                                            <> */}
                                    <input
                                      defaultChecked={!!item[act]}
                                      type="checkbox"
                                      id={`custom-checkbox-${item.section}-${index}`}
                                      name={act}
                                      value={act}
                                      // eslint-disable-next-line max-len
                                      onChange={(e) => handleOnChange(e, index, act, item.section)}
                                    />
                                    <label
                                      htmlFor={`custom-checkbox-${item.section}-${index}`}
                                      className={styles.selectlabel}
                                    >
                                      {act}
                                    </label>
                                    {/* </>
                                          )
                                        )} */}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <ul>
                      {actions.map(({ name }, index) => (
                        <li>
                          <div>
                            <div>
                              <input
                                defaultChecked={!!item[act.name]}
                                type="checkbox"
                                id={`custom-checkbox-${item.section}-${index}`}
                                name={act.name}
                                value={act.name}
                                onChange={(e) => handleOnChange(e, index, act.name, item.section)}
                              />
                              <label htmlFor={`custom-checkbox-${item.section}-${index}`}>
                                {act.name}
                              </label>
                            </div>
                          </div>
                        </li>
                      ))}
                      </ul> */}
                {/* ))} */}

                {/* <CheckBoxGroup checkname={item.sectionName}
              actions={actions} length={actions.length} /> */}

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
        )}
      </div>
    </div>
  );
}

export default EditRoles;
