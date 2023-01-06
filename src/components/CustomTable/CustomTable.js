/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes, { bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TableContext } from '../../contexts/tableContext';
// import { SpinnerRoundFilled } from 'spinners-react';
import ActionButtons from '../ActionsButtons/ActionButtons';
import Pagination from '../Pagination/Pagination';
import { tabledelete } from '../../redux/TableDeleteSlice';
import ToggleButtonOnOff from '../ToggleButton/ToggleButton';
// import ActionSelection from '../ActionsButtons/ActionSelection';
import styles from './CustomTable.module.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getCookies } from '../../hooks/useCookies';

function CustomTable({ data, viewPopUp, toggleButton, section, deleteCondition }) {
  const { dashboardStyle } = useContext(TableContext);
  const navigate = useNavigate();
  const { bodyStyle } = useContext(TableContext);
  const [addButtonPermissions, setAddButtonPermissions] = useState({});
  const { bodyheader } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { searchboxStyle } = useContext(TableContext);
  const { tableheadStyle } = useContext(TableContext);
  const { tablebodyStyle } = useContext(TableContext);
  const [tableData, setTableData] = useState([]);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const {
    selected,
    setselected,
    columns,
    tableLoading,
    setPageNum,
    paginationData,
    sorting,
    setSorting,
    setSearchTerm,
    setPaginationData,
    setColumns,
    deletedData,
    search,
    setDeletedData,
  } = useContext(TableContext);
  // new
  const tablelength = tableData.length;
  const [checkedState, setCheckedState] = useState(new Array(tablelength).fill(false));
  const [checkedAll, setCheckedAll] = useState(false);
  const handleOnChange = (id, position) => {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line max-len
    const updatedCheckedState = checkedState.map((item, indexed) =>
      indexed === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    setselected((oldArray) => [...oldArray, id]);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= checkedState.length; i++) {
      if (checkedState[position] === true) {
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < selected.length; j++) {
          if (selected[j] === id) {
            selected.splice(j, 1);
          }
          // const newselected = selected.filter((item) => item === id);
          // setselected(newselected);
        }
      }
    }
  };
  const actionAdd = () => {
    navigate(`/${section.toLowerCase()}/create/`);
  };
  const handleOnChangeAll = () => {
    setCheckedAll(!checkedAll);
    const newarray = [];
    if (checkedAll === false) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tableData.length; i++) {
        newarray.push(tableData[i].id);
        checkedState[i] = true;
      }
      setselected(newarray);
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tableData.length; i++) {
        checkedState[i] = false;
      }
      setselected([]);
    }
  };
  useEffect(() => {
    setSearchTerm(null);
    setPageNum(1);
  }, []);
  useEffect(() => {
    setPageNum(1);
  }, [search]);
  useEffect(() => {
    // setDashboardHeader(section);
    const temp = section.replace(/\s+/g, '').toLowerCase();
    const permissions = getCookies('USERPERMISSION');
    permissions.forEach((val) => {
      if (val.section.toLowerCase() === temp) {
        setAddButtonPermissions({
          view: val.view ? val.view : false,
          edit: val.edit ? val.edit : false,
          create: val.create ? val.create : false,
          delete: val.delete ? val.delete : false,
          list: !!(val.view || val.edit || val.create || val.delete),
        });
      }
    });
    setTableData(data.results);
    setPaginationData({
      page: data.page,
      totalResult: data.totalResults,
      totalPages: data.totalPages,
    });
    setColumns(data.Displayfields);
    const newarray = [];
    if (checkedAll) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tableData.length; i++) {
        newarray.push(tableData[i].id);
        checkedState[i] = true;
      }
      setselected(newarray);
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tableData.length; i++) {
        checkedState[i] = false;
      }
      setselected([]);
    }
  }, [search, data, deletedData, tableData]);
  const setSort = (param) => () => {
    setPageNum(1);
    switch (sorting.sortType) {
      case 'none':
        setSorting({ col: param, sortType: 'asc' });
        break;
      case 'asc':
        setSorting({ col: param, sortType: 'desc' });
        break;
      case 'desc':
        setSorting({ col: param, sortType: 'none' });
        break;
      default:
        setSorting({ col: param, sortType: 'asc' });
        break;
    }
  };
  const onFilterTextChange = (e) => {
    const even = e;
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        const { value } = even.target;
        if (value.length > 0) {
          setSearchTerm(even.target.value);
        } else {
          setSearchTerm(null);
        }
      }, 1000)
    );
  };
  return (
    <div className={styles[bodyStyle]}>
      {addButtonPermissions.list && (
        <div
          className={styles[dashboardStyle]}
          style={{ minHeight: '100vh' }}
          id={styles.dashboardcont2}
        >
          <div className="container-fluid" id={styles.container}>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className={styles.search_box}>
                  <input
                    className={styles[searchboxStyle]}
                    id={styles.searchbar}
                    type="search"
                    onChange={onFilterTextChange}
                    placeholder="Search"
                  />
                  <div
                    className={tableLoading ? 'spinner-border spinner-border-sm' : ''}
                    id={styles.spinner}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                {/* <h5 className={styles[bodyheader]} id={styles.tableheading}>
                  {section} Data
                </h5> */}
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12" />
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className={styles.sectionright}>
                  {addButtonPermissions.delete && selected.length > 0 && (
                    <div className="dropdown" id={styles.dropdown}>
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul
                        className="dropdown-menu"
                        id={styles.dropdown_menu}
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              confirmAlert({
                                title: '',
                                message: 'Are you sure, you want to delete.',
                                buttons: [
                                  {
                                    label: 'Yes',
                                    onClick: () => {
                                      dispatch(tabledelete(selected)).then(() => {
                                        setDeletedData(`data deleted ${selected}`);
                                        window.location.reload(false);
                                      });
                                    },
                                  },
                                  {
                                    label: 'No',
                                    // onClick: () => alert("Click No")
                                  },
                                ],
                              });
                            }}
                          >
                            Delete{' '}
                            <i className="fa fa-trash" aria-hidden="true" id={styles.del_icon} />
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* {addButtonPermissions.delete && (
                    <button
                      className={selected.length ? styles.tabledelbtn : 'disabled'}
                      type="button"
                      onClick={() => {
                        confirmAlert({
                          title: '',
                          message: 'Are you sure want to delete.',
                          buttons: [
                            {
                              label: 'Yes',
                              onClick: () => {
                                dispatch(tabledelete(selected)).then(() => {
                                  setDeletedData(`data deleted ${selected}`);
                                  window.location.reload(false);
                                });
                              },
                            },
                            {
                              label: 'No',
                              // onClick: () => alert("Click No")
                            },
                          ],
                        });
                      }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" id={styles.del_icon} />
                    </button>
                  )} */}
                  {addButtonPermissions.create && (
                    <button
                      className={styles.tablebtn}
                      type="button"
                      onClick={() => {
                        actionAdd();
                      }}
                    >
                      {' '}
                      <FontAwesomeIcon icon={faPlus} className={styles.add_icon} />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="table-responsive" style={{ minHeight: '250px' }}>
              <table className="table table-borderless">
                {columns.length > 0 && (
                  <thead>
                    <tr className={styles[tableheadStyle]}>
                      {addButtonPermissions.delete && (
                        <th scope="col">
                          <input
                            type="checkbox"
                            id="custom-checkbox"
                            name={data.id}
                            value={data.id}
                            checked={checkedAll}
                            onChange={() => handleOnChangeAll()}
                          />
                        </th>
                      )}
                      {columns.map((item) => (
                        <th scope="col">
                          {' '}
                          {item.toUpperCase()}
                          <button
                            className={styles.sortbtn}
                            type="button"
                            aria-label="Sort button"
                            onClick={setSort(item)}
                          >
                            {sorting.sortType === 'asc' && sorting.col === item ? (
                              <i className="fa fa-arrow-up" />
                            ) : sorting.sortType === 'desc' && sorting.col === item ? (
                              <i className="fa fa-arrow-down" />
                            ) : (
                              <i className="fa fa-sort" />
                            )}
                          </button>
                        </th>
                      ))}
                      <th scope="col">ACTIONS</th>
                    </tr>
                  </thead>
                )}
                {Object.keys(tableData) || !tableLoading ? (
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr className={styles[tablebodyStyle]}>
                        {addButtonPermissions.delete && (
                          <th scope="row">
                            <div className="left-section">
                              <input
                                type="checkbox"
                                id={`custom-checkbox-${item}`}
                                name={data.id}
                                value={data.id}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(item.id, index)}
                              />
                              <label htmlFor={`custom-checkbox-${item}`}>{data.id}</label>
                            </div>
                          </th>
                        )}
                        {columns.map((ele) => (
                          <td>
                            {ele === toggleButton.field ? (
                              <ToggleButtonOnOff
                                value={item[ele]}
                                id={item.id}
                                placeholders={['Active', 'Inactive']}
                              />
                            ) : typeof item[ele] === 'boolean' ? (
                              <h6 className="order_date"> String(item[ele])</h6>
                            ) : (
                              item[ele]
                            )}
                          </td>
                        ))}
                        <td>
                          <ActionButtons data={item} viewPopUp={viewPopUp} section="user" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <h6>Loading...</h6>
                )}
                {tableData.length === 0 ? <h6 className={styles.norecord}>No record found</h6> : ''}
              </table>
            </div>
            <Pagination paginationData={paginationData} setPageNum={setPageNum} />
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
}
CustomTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  viewPopUp: PropTypes.bool,
  toggleButton: PropTypes.oneOfType([PropTypes.object]),
  deleteCondition: PropTypes.oneOfType([PropTypes.object]),
  section: PropTypes.string,
};
CustomTable.defaultProps = {
  viewPopUp: false,
  toggleButton: { show: false, field: 'none' },
  deleteCondition: { checkCondition: false, apiUrl: 'none' },
  section: 'User',
};
export default CustomTable;
