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

const EditRoles = React.memo(() => {
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
  const [role, setRole] = useState([]);
  const [defaultSelectAllValues, setDefaultSelectAllValues] = useState([]);
  const permissionsItems = ['create', 'edit', 'view', 'delete'];
  const viewOnly = 'view';
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Edit Role Details');
    setLoading(true);
    RoleId = params.roleId;
    const actionData = {};
    actionData.actionUrl = `roles/${RoleId}`;
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
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
      mod.forEach((module) => {
        let isAvailable = false;
        perm.forEach((item) => {
          const itemName = item.section;
          if (module.modules === itemName.toLowerCase()) {
            if (module.subMenu) {
              const subpermi = [];
              module.subMenu.forEach((subModule) => {
                let isAvailableSub = false;
                item.submenu?.forEach((element) => {
                  const subitem = element.section;
                  if (subModule.modules === subitem.toLowerCase()) {
                    subpermi.push(element);
                    isAvailableSub = true;
                  }
                });
                if (!isAvailableSub) {
                  subpermi.push({
                    create: false,
                    edit: false,
                    section: subModule.modules.toLowerCase(),
                    view: false,
                    delete: false,
                  });
                }
              });
              permi.push({
                section: item.section,
                view: item.view,
                submenu: subpermi,
              });
            } else if (module.modules === 'dashboard') permi.push(item);
            else if (item.submenu) {
              permi.push({
                section: item.section,
                view: item.view,
                create: false,
                edit: false,
                delete: false,
              });
            } else permi.push(item);
            isAvailable = true;
          }
        });
        if (!isAvailable) {
          if (module.subMenu) {
            const subpermi = [];
            module.subMenu.forEach((subMenuItem) => {
              subpermi.push({
                create: false,
                edit: false,
                section: subMenuItem.modules.toLowerCase(),
                view: false,
                delete: false,
              });
            });
            permi.push({
              section: module.modules.toLowerCase(),
              view: false,
              submenu: subpermi,
            });
          } else {
            permi.push({
              create: false,
              edit: false,
              section: module.modules.toLowerCase(),
              view: false,
              delete: false,
            });
          }
        }
      });
      const selectAllDefault = [];
      permi.forEach((element) => {
        if (element.submenu) {
          element.submenu.forEach((subModule) => {
            if (!subModule.create || !subModule.delete || !subModule.edit || !subModule.view)
              if (!selectAllDefault.includes(`select-all-${element.section}`))
                selectAllDefault.push(`select-all-${element.section}`);
          });
          if (!element.view)
            if (!selectAllDefault.includes(`select-all-${element.section}`))
              selectAllDefault.push(`select-all-${element.section}`);
        } else if (element.section === 'dashboard') {
          if (!element.view)
            if (!selectAllDefault.includes(`select-all-${element.section}`))
              selectAllDefault.push(`select-all-${element.section}`);
        } else if (!element.create || !element.delete || !element.edit || !element.view)
          if (!selectAllDefault.includes(`select-all-${element.section}`))
            selectAllDefault.push(`select-all-${element.section}`);
      });
      if (selectAllDefault.length > 0) selectAllDefault.push(`select-all`);
      setDefaultSelectAllValues(selectAllDefault);
      setPermisisons(permi);
      setRole(resp.payload.data.response.result);
      reset(resp.payload.data.response.result);
      setLoading(false);
    });
  }, []);
  function onSubmitdata(data) {
    setSubmitting(true);
    RoleId = params.roleId;
    const apiData = {
      name: data.name,
      permissions,
    };
    data.actionUrl = `roles/${RoleId}`;
    data.actionMethod = 'patch';
    data.apiData = apiData;
    // console.log(data);
    setError(null);
    dispatch(Entry(data)).then((resp) => {
      setSubmitting(false);
      if (resp.payload.code === 200) {
        const currentUserRole = getCookies('USERROLE');
        if (resp.payload.role.name.toLowerCase() === currentUserRole.toLowerCase()) {
          setCookies('USERPERMISSION', resp.payload.role.permissions);
          // setCookies('USERMENU', resp.payload.userMenu.userMenu);
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
  // const [checkedState, setCheckedState] = useState([]);

  const handleOnChange = (e, permission, section, subSection, isSubmenu = false) => {
    if (e.target.value === 'select-all') {
      permissions.forEach((element, index) => {
        document.getElementById(`select-all-${element.section}`).checked = e.target.checked;
        if (element.submenu) {
          permissions[index][`${viewOnly}`] = e.target.checked;
          document.getElementById(`custom-checkbox-${element.section}-${viewOnly}`).checked =
            e.target.checked;
          element.submenu.forEach((subItem, subIndex) => {
            permissionsItems.forEach((permissionItem) => {
              permissions[index].submenu[subIndex][`${permissionItem}`] = e.target.checked;
              document.getElementById(
                `custom-checkbox-${element.section}-${subItem.section}-${permissionItem}`
              ).checked = e.target.checked;
            });
          });
        } else if (element.section === 'dashboard') {
          permissions[index][`${viewOnly}`] = e.target.checked;
          document.getElementById(`custom-checkbox-${element.section}-${viewOnly}`).checked =
            e.target.checked;
        } else
          permissionsItems.forEach((permissionItem) => {
            permissions[index][`${permissionItem}`] = e.target.checked;
            document.getElementById(
              `custom-checkbox-${element.section}-${permissionItem}`
            ).checked = e.target.checked;
          });
        setPermisisons(permissions);
      });
    } else if (e.target.value === `select-all-${section}`) {
      permissions.forEach((element, index) => {
        if (element.section === section) {
          if (element.submenu) {
            permissions[index][`${viewOnly}`] = e.target.checked;
            document.getElementById(`custom-checkbox-${section}-${viewOnly}`).checked =
              e.target.checked;
            element.submenu.forEach((subItem, subIndex) => {
              permissionsItems.forEach((permissionItem) => {
                permissions[index].submenu[subIndex][`${permissionItem}`] = e.target.checked;
                document.getElementById(
                  `custom-checkbox-${section}-${subItem.section}-${permissionItem}`
                ).checked = e.target.checked;
              });
            });
          } else if (element.section === 'dashboard') {
            permissions[index][`${viewOnly}`] = e.target.checked;
            document.getElementById(`custom-checkbox-${element.section}-${viewOnly}`).checked =
              e.target.checked;
          } else
            permissionsItems.forEach((permissionItem) => {
              permissions[index][`${permissionItem}`] = e.target.checked;
              document.getElementById(`custom-checkbox-${section}-${permissionItem}`).checked =
                e.target.checked;
            });
          if (e.target.checked === false)
            document.getElementById('select-all').checked = e.target.checked;
          else {
            const falseFlag = [];
            permissions.forEach((sectionItems) => {
              if (document.getElementById(`select-all-${sectionItems.section}`).checked === false) {
                document.getElementById('select-all').checked = false;
                falseFlag.push(`select-all-${sectionItems.section}`);
              }
            });
            if (falseFlag.length === 0)
              document.getElementById('select-all').checked = e.target.checked;
          }

          setPermisisons(permissions);
        }
      });
    } else {
      permissions.forEach((element, index) => {
        if (element.section === section) {
          if (isSubmenu) {
            element.submenu.forEach((subItem, subIndex) => {
              if (subItem.section === subSection)
                permissions[index].submenu[subIndex][`${permission}`] = e.target.checked;
            });
          } else {
            permissions[index][`${permission}`] = e.target.checked;
          }
          if (e.target.checked === false) {
            document.getElementById('select-all').checked = e.target.checked;
            document.getElementById(`select-all-${element.section}`).checked = e.target.checked;
          } else {
            const falseFlag = [];
            permissions.forEach((sectionItems, sectionIndex) => {
              if (sectionItems.submenu) {
                const falsesubFlag = [];
                if (!permissions[sectionIndex][`${viewOnly}`])
                  falsesubFlag.push(permissions[sectionIndex][`${viewOnly}`]);
                sectionItems.submenu.forEach((subItem) => {
                  permissionsItems.forEach((permissionItem) => {
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
                if (permissions[sectionIndex][`${viewOnly}`])
                  document.getElementById(`select-all-${sectionItems.section}`).checked =
                    e.target.checked;
              } else {
                const falsesubFlag = [];
                permissionsItems.forEach((permissionItem) => {
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
          setPermisisons(permissions);
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
            <div className="container-fluid mt-5">
              <form onSubmit={handleSubmit(onSubmitdata)}>
                <div className="row">
                  <div className="col-md-4 col-sm-4">
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
                    defaultChecked={!defaultSelectAllValues.includes('select-all')}
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
                <br />
                {permissions &&
                  permissions.map((item) => (
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className={styles[permissionboxStyle]} id={styles.permissionbox}>
                          <div className={styles.permission_title}>
                            <input
                              defaultChecked={
                                !defaultSelectAllValues.includes(`select-all-${item.section}`)
                              }
                              type="checkbox"
                              id={`select-all-${item.section}`}
                              name={`select-all-${item.section}`}
                              value={`select-all-${item.section}`}
                              onChange={(e) => handleOnChange(e, 'all', item.section)}
                            />
                            <h5
                              htmlFor={`select-all-${item.section}`}
                              className={styles[bodyheader]}
                              id={styles.addheading}
                            >
                              {CapitalizeFirstLetter(item.section)}
                            </h5>
                          </div>
                          {item.section === 'dashboard' || item.submenu ? (
                            <ul>
                              <li>
                                <input
                                  defaultChecked={item[`${viewOnly}`]}
                                  type="checkbox"
                                  id={`custom-checkbox-${item.section}-${viewOnly}`}
                                  name={viewOnly}
                                  value={viewOnly}
                                  onChange={(e) => handleOnChange(e, viewOnly, item.section)}
                                />
                                <label
                                  htmlFor={`custom-checkbox-${item.section}-${viewOnly}`}
                                  className={styles.selectlabel}
                                >
                                  {viewOnly}
                                </label>
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              {permissionsItems.map((name) => (
                                <li>
                                  <input
                                    defaultChecked={item[`${name}`]}
                                    type="checkbox"
                                    id={`custom-checkbox-${item.section}-${name}`}
                                    name={name}
                                    value={name}
                                    onChange={(e) => handleOnChange(e, name, item.section)}
                                  />
                                  <label
                                    htmlFor={`custom-checkbox-${item.section}-${name}`}
                                    className={styles.selectlabel}
                                  >
                                    {name}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          )}
                          {item.submenu ? (
                            <div className="mt-3 mb-3">
                              <h5 className={styles[bodyheader]} id={styles.addheading}>
                                {CapitalizeFirstLetter('submenu')}
                              </h5>
                            </div>
                          ) : (
                            ''
                          )}

                          {item.submenu
                            ? item.submenu.map((subvalue) => (
                                <div className="row">
                                  <div className="col-md-12 col-sm-12">
                                    <div
                                      className={styles[permissionboxStyle]}
                                      id={styles.permissionbox}
                                    >
                                      <h5 className={styles[bodyheader]} id={styles.addheading}>
                                        {CapitalizeFirstLetter(subvalue.section)}
                                      </h5>
                                      <ul>
                                        {permissionsItems.map((name) => (
                                          <li>
                                            <input
                                              defaultChecked={subvalue[`${name}`]}
                                              type="checkbox"
                                              id={`custom-checkbox-${item.section}-${subvalue.section}-${name}`}
                                              name={name}
                                              value={name}
                                              onChange={(e) =>
                                                handleOnChange(
                                                  e,
                                                  name,
                                                  item.section,
                                                  subvalue.section,
                                                  true
                                                )
                                              }
                                            />
                                            <label
                                              htmlFor={`custom-checkbox-${item.section}-${subvalue.section}-${name}`}
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
        )}
      </div>
    </div>
  );
});

export default EditRoles;
