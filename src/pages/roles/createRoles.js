/* eslint-disable react/function-component-definition */
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

const CreateRoles = React.memo(() => {
  const permissions = ['create', 'edit', 'view', 'delete'];
  const viewOnly = 'view';
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
  // const actions = [];
  // const [checkedState, setCheckedState] = useState(new Array(actions.length).fill(false));

  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Add Role Details');
    const actionData = {};
    actionData.actionUrl = 'roles/modules ';
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      setSections(resp.payload.data.Menu);
      const tempData = [];
      resp.payload.data.Menu.forEach((element) => {
        const newObj = {};
        newObj.section = `${element.modules}`;
        if (element.subMenu) {
          newObj.submenu = [];
          element.subMenu.forEach((subItem) => {
            const subObj = {};
            subObj.section = `${subItem.modules}`;
            permissions.forEach((permission) => {
              subObj[`${permission}`] = false;
            });
            newObj.submenu.push(subObj);
            newObj[`${viewOnly}`] = false;
          });
        } else if (element.modules === 'dashboard') {
          newObj[`${viewOnly}`] = false;
        } else {
          permissions.forEach((permission) => {
            newObj[`${permission}`] = false;
          });
        }
        tempData.push(newObj);
      });
      setStatus(tempData);
    });
  }, []);
  function onSubmitdata(data) {
    setSubmitting(true);
    data.permissions = status;
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

  const handleOnChange = (e, permission, section, subSection, isSubmenu = false) => {
    if (e.target.value === 'select-all') {
      status.forEach((element, index) => {
        document.getElementById(`select-all-${element.section}`).checked = e.target.checked;
        if (element.submenu) {
          status[index][`${viewOnly}`] = e.target.checked;
          document.getElementById(`custom-checkbox-${element.section}-${viewOnly}`).checked =
            e.target.checked;
          element.submenu.forEach((subItem, subIndex) => {
            permissions.forEach((permissionItem) => {
              status[index].submenu[subIndex][`${permissionItem}`] = e.target.checked;
              document.getElementById(
                `custom-checkbox-${element.section}-${subItem.section}-${permissionItem}`
              ).checked = e.target.checked;
            });
          });
        } else if (element.section === 'dashboard') {
          status[index][`${viewOnly}`] = e.target.checked;
          document.getElementById(`custom-checkbox-${element.section}-${viewOnly}`).checked =
            e.target.checked;
        } else
          permissions.forEach((permissionItem) => {
            status[index][`${permissionItem}`] = e.target.checked;
            document.getElementById(
              `custom-checkbox-${element.section}-${permissionItem}`
            ).checked = e.target.checked;
          });
        setStatus(status);
      });
    } else if (e.target.value === `select-all-${section}`) {
      status.forEach((element, index) => {
        if (element.section === section) {
          if (element.submenu) {
            status[index][`${viewOnly}`] = e.target.checked;
            document.getElementById(`custom-checkbox-${section}-${viewOnly}`).checked =
              e.target.checked;
            element.submenu.forEach((subItem, subIndex) => {
              permissions.forEach((permissionItem) => {
                status[index].submenu[subIndex][`${permissionItem}`] = e.target.checked;
                document.getElementById(
                  `custom-checkbox-${section}-${subItem.section}-${permissionItem}`
                ).checked = e.target.checked;
              });
            });
          } else if (element.section === 'dashboard') {
            status[index][`${viewOnly}`] = e.target.checked;
            document.getElementById(`custom-checkbox-${element.section}-${viewOnly}`).checked =
              e.target.checked;
          } else
            permissions.forEach((permissionItem) => {
              status[index][`${permissionItem}`] = e.target.checked;
              document.getElementById(`custom-checkbox-${section}-${permissionItem}`).checked =
                e.target.checked;
            });
          if (e.target.checked === false)
            document.getElementById('select-all').checked = e.target.checked;
          else {
            const falseFlag = [];
            status.forEach((sectionItems) => {
              if (document.getElementById(`select-all-${sectionItems.section}`).checked === false) {
                document.getElementById('select-all').checked = false;
                falseFlag.push(`select-all-${sectionItems.section}`);
              }
            });
            if (falseFlag.length === 0)
              document.getElementById('select-all').checked = e.target.checked;
          }

          setStatus(status);
        }
      });
    } else {
      status.forEach((element, index) => {
        if (element.section === section) {
          if (isSubmenu) {
            element.submenu.forEach((subItem, subIndex) => {
              if (subItem.section === subSection)
                status[index].submenu[subIndex][`${permission}`] = e.target.checked;
            });
          } else {
            status[index][`${permission}`] = e.target.checked;
          }
          if (e.target.checked === false) {
            document.getElementById('select-all').checked = e.target.checked;
            document.getElementById(`select-all-${element.section}`).checked = e.target.checked;
          } else {
            const falseFlag = [];
            status.forEach((sectionItems, sectionIndex) => {
              if (sectionItems.submenu) {
                const falsesubFlag = [];
                if (!status[sectionIndex][`${viewOnly}`])
                  falsesubFlag.push(status[sectionIndex][`${viewOnly}`]);
                sectionItems.submenu.forEach((subItem) => {
                  permissions.forEach((permissionItem) => {
                    if (
                      !document.getElementById(
                        `custom-checkbox-${sectionItems.section}-${subItem.section}-${permissionItem}`
                      ).checked
                    )
                      falsesubFlag.push(
                        `custom-checkbox-${sectionItems.section}-${subItem.section}-${permissionItem}`
                      );
                  });
                });
                if (falsesubFlag.length === 0)
                  document.getElementById(`select-all-${sectionItems.section}`).checked =
                    e.target.checked;
              } else if (sectionItems.section === 'dashboard') {
                if (status[sectionIndex][`${viewOnly}`])
                  document.getElementById(`select-all-${sectionItems.section}`).checked =
                    e.target.checked;
              } else {
                const falsesubFlag = [];
                permissions.forEach((permissionItem) => {
                  if (
                    !document.getElementById(
                      `custom-checkbox-${sectionItems.section}-${permissionItem}`
                    ).checked
                  )
                    falsesubFlag.push(`custom-checkbox-${sectionItems.section}-${permissionItem}`);
                });
                if (falsesubFlag.length === 0)
                  document.getElementById(`select-all-${sectionItems.section}`).checked =
                    e.target.checked;
              }
              if (document.getElementById(`select-all-${sectionItems.section}`).checked === false) {
                document.getElementById('select-all').checked = false;
                falseFlag.push(`select-all-${sectionItems.section}`);
              }
            });
            if (falseFlag.length === 0)
              document.getElementById('select-all').checked = e.target.checked;
          }
          setStatus(status);
        }
      });
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
          <div className="container-fluid mt-5">
            <form onSubmit={handleSubmit(onSubmitdata)}>
              <div className="row">
                <div className="col-md-4 col-sm-4">
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
                <div className="col-md-6 col-sm-12" style={{ padding: '0px 12px' }}>
                  <input
                    type="checkbox"
                    id="select-all"
                    name="select-all"
                    value="select-all"
                    onChange={(e) => handleOnChange(e, 'all', 'all')}
                  />
                  <label htmlFor="select-all" className={styles.selectlabel}>
                    Select all
                  </label>
                </div>
              </div>
              <br />
              {sections &&
                sections?.map((value) => (
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className={styles[permissionboxStyle]} id={styles.permissionbox}>
                        <div className={styles.permission_title}>
                          <input
                            type="checkbox"
                            id={`select-all-${value.modules}`}
                            name={`select-all-${value.modules}`}
                            value={`select-all-${value.modules}`}
                            onChange={(e) => handleOnChange(e, 'all', value.modules)}
                          />
                          <h5
                            htmlFor={`select-all-${value.modules}`}
                            className={styles[bodyheader]}
                            id={styles.addheading}
                          >
                            {CapitalizeFirstLetter(value.name)}
                          </h5>
                        </div>
                        {value.name === 'Dashboard' || value.subMenu ? (
                          <ul>
                            <li>
                              <input
                                type="checkbox"
                                id={`custom-checkbox-${value.modules}-${viewOnly}`}
                                name={viewOnly}
                                value={viewOnly}
                                onChange={(e) => handleOnChange(e, viewOnly, value.modules)}
                              />
                              <label
                                htmlFor={`custom-checkbox-${value.modules}-${viewOnly}`}
                                className={styles.selectlabel}
                              >
                                {viewOnly}
                              </label>
                            </li>
                          </ul>
                        ) : (
                          <ul>
                            {permissions.map((name) => (
                              <li>
                                <input
                                  type="checkbox"
                                  id={`custom-checkbox-${value.modules}-${name}`}
                                  name={name}
                                  value={name}
                                  onChange={(e) => handleOnChange(e, name, value.modules)}
                                />
                                <label
                                  htmlFor={`custom-checkbox-${value.modules}-${name}`}
                                  className={styles.selectlabel}
                                >
                                  {name}
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}

                        {value.subMenu ? (
                          <div className="mt-3 mb-3">
                            <h5 className={styles[bodyheader]} id={styles.addheading}>
                              {CapitalizeFirstLetter('submenu')}
                            </h5>
                          </div>
                        ) : (
                          ''
                        )}

                        {value.subMenu
                          ? value.subMenu.map((subvalue) => (
                              <div className="row">
                                <div className="col-md-12 col-sm-12">
                                  <div
                                    className={styles[permissionboxStyle]}
                                    id={styles.permissionbox}
                                  >
                                    <h5
                                      className={styles[bodyheader]}
                                      id={styles.addheading}
                                      styles={{ marginLeft: '0px' }}
                                    >
                                      {CapitalizeFirstLetter(subvalue.name)}
                                    </h5>
                                    <ul className="mt-3">
                                      {permissions.map((name) => (
                                        <li>
                                          <input
                                            type="checkbox"
                                            id={`custom-checkbox-${value.modules}-${subvalue.modules}-${name}`}
                                            name={name}
                                            value={name}
                                            onChange={(e) =>
                                              handleOnChange(
                                                e,
                                                name,
                                                value.modules,
                                                subvalue.modules,
                                                true
                                              )
                                            }
                                          />
                                          <label
                                            htmlFor={`custom-checkbox-${value.modules}-${subvalue.modules}-${name}`}
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
                            ))
                          : ''}
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
});

export default CreateRoles;
