/* eslint-disable react/function-component-definition */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { TableContext } from '../../contexts/tableContext';
import useToggle from '../../hooks/useToggle';
import { getCookies } from '../../hooks/useCookies';
import ToggleButtonOnOff from '../ToggleButton/ToggleButton';
import TableViewPopup from '../TableViewPopup/TableViewPopup';
import styles from './AgGridTable.module.scss';
import { Entry } from '../../redux/entrySlice';
import 'react-confirm-alert/src/react-confirm-alert.css';

// const CryptoJS = require('crypto-js');
const AgGridTable = React.memo(
  ({
    urlParam,
    fieldNames,
    section,
    viewPopUp,
    toggleButton,
    addButtonPlaceholder,
    deleteCondition,
  }) => {
    // eslint-disable-next-line max-len
    const { bodyheader, url, actionbtnStyle } = useContext(TableContext);
    const [actionPermissions, setActionPermission] = useState({});
    const { searchboxStyle } = useContext(TableContext);
    const token = `Bearer ${getCookies('Token')}`;
    const [deleteMessage, setDeletemessage] = useState(null);
    const [canDelete, setCanDelete] = useState(true);
    let statusCode;
    let rowStyle;
    const navigate = useNavigate();
    const overlayNoRowsTemplate = 'No record found';
    const dispatch = useDispatch();
    const [isOpen, setisOpen] = useToggle();
    const [showTablePopUp, setShowTablePopUp] = useToggle();
    const [dataId, setDataId] = useState();
    const [gridApi, setGridApi] = useState(null);
    const [search, setSearchTerm] = useState(null);
    const [deletedUser, setDeletedUser] = useState(null);
    const perPage = 5;
    const onGridReady = (params) => {
      const gApi = params.api;
      setGridApi(params.api);
      if (gApi) {
        gApi.sizeColumnsToFit();
        const dataSource = {
          getRows: (params) => {
            const { filterModel, sortModel } = params;
            let urls = urlParam;
            // Use startRow and endRow for sending pagination to Backend
            // params.startRow : Start Page
            // params.endRow : End Page
            gApi.showLoadingOverlay();
            const page = params.endRow / perPage;
            urls += `page=${page}&limit=${perPage}`;
            // Sorting
            if (sortModel.length) {
              const { colId, sort } = params.sortModel[0];
              urls += `&sortBy=${colId}:${sort}`;
            }
            // Searching
            if (search !== null && search.length > 0) {
              urls += `&searchBy=${search}`;
            }
            fetch(urls, {
              method: 'GET',
              headers: { Authorization: token },
            })
              .then((resp) => {
                statusCode = resp.status;
                return resp.json();
              })
              .then((res) => {
                if (statusCode === 200 && res.data.result.totalResults > 0) {
                  gApi.hideOverlay();
                  params.successCallback(res.data.result.results, res.data.result.totalResults);
                } else {
                  gApi.showNoRowsOverlay();
                  params.successCallback([], 0);
                }
              })
              .catch((err) => {
                gApi.showNoRowsOverlay();
                params.successCallback([], 0);
              });
          },
        };

        gApi.setDatasource(dataSource);
      }
    };
    const actionView = (params) => {
      const encodeText = params.data.id;
      setDataId(params.data.id);
      if (viewPopUp) {
        setShowTablePopUp();
      } else {
        navigate(`/${section}/viewdetails/${encodeText}`);
      }
    };
    const actionEdit = (params) => {
      const encodeText = params.data.id;
      navigate(`/${section}/edit/${encodeText}`);
    };
    const actionAdd = () => {
      navigate(`/${section}/create/`);
    };
    let checked = 'true';
    const handleChange = () => {
      [checked] = ![checked];
    };
    const handleDelete = (params) => {
      confirmAlert({
        title: canDelete ? '' : 'Oops!!',
        message:
          deleteMessage == null
            ? `Are you sure, you want to delete ${params.data.name}`
            : deleteMessage,
        buttons: canDelete
          ? [
              {
                label: 'Yes',
                onClick: () => {
                  const actionData = {
                    actionUrl: `${section}/${params.data.id}`,
                    actionMethod: 'delete',
                  };
                  dispatch(Entry(actionData)).then((resp) => {
                    if (resp.payload.code === 400) {
                      confirmAlert({
                        title: 'Oops! Cant Delete!',
                        message: resp.payload.message,
                        buttons: [
                          {
                            label: 'Ok',
                          },
                        ],
                      });
                    } else {
                      toast.success('Row deleted successfully');
                      setDeletedUser(`data last deleted is ${params.data.id}`);
                    }
                  });
                },
              },
              {
                label: 'No',
                // onClick: () => alert("Click No")
              },
            ]
          : [
              {
                label: 'Ok',
                // onClick: () => alert("Click No")
              },
            ],
      });
    };
    const avatarFormatter = ({ value }) => (
      <img src={value} alt="img s" width="50px" height="50px" />
    );
    const toggleButtons = (params) => (
      <ToggleButtonOnOff
        value={params.value}
        id={params.data ? params.data.id : null}
        placeholders={['Active', 'Inactive']}
      />
    );
    const actions = (params) => (
      <div>
        {actionPermissions.view && (
          <button
            className={styles[actionbtnStyle]}
            id={styles.actionbtn}
            type="button"
            onClick={() => {
              actionView(params);
            }}
          >
            {' '}
            <i className="fa fa-eye" />
          </button>
        )}
        {actionPermissions.edit && (
          <button
            className={styles[actionbtnStyle]}
            id={styles.actionbtn}
            type="button"
            onClick={() => {
              actionEdit(params);
            }}
          >
            {' '}
            <i className="fa fa-edit" />
          </button>
        )}
        {actionPermissions.delete && (
          <button
            className={styles[actionbtnStyle]}
            id={styles.actionbtn}
            type="button"
            onClick={() => {
              handleDelete(params);
            }}
          >
            {' '}
            <i className="fa fa-trash" />
          </button>
        )}
      </div>
    );
    const columns = [];
    let agheaderclass;
    if (fieldNames.length) {
      fieldNames.forEach((element) => {
        if (element === toggleButton.field) {
          if (localStorage.getItem('theme') === 'dark') {
            agheaderclass = styles.headercolordark;
          } else {
            agheaderclass = styles.headercolorlight;
          }
          columns.push({
            headerName: element.toUpperCase(),
            field: element.toLowerCase(),
            headerClass: agheaderclass,
            cellRenderer: toggleButtons,
          });
        } else {
          if (localStorage.getItem('theme') === 'dark') {
            agheaderclass = styles.headercolordark;
          } else {
            agheaderclass = styles.headercolorlight;
          }
          columns.push({
            headerName: element.toUpperCase(),
            headerClass: agheaderclass,
            field: element.toLowerCase(),
          });
        }
      });
      columns.push({
        headerName: 'ACTIONS',
        field: 'email',
        cellRenderer: actions,
        headerClass: agheaderclass,
        sortable: false,
      });
    }
    useEffect(() => {
      const temp = section.replace(/\s+/g, '').toLowerCase();
      const permissions = getCookies('USERPERMISSION');
      permissions.forEach((val) => {
        if (val.section.toLowerCase() === temp) {
          setActionPermission({
            view: val.view ? val.view : false,
            edit: val.edit ? val.edit : false,
            create: val.create ? val.create : false,
            delete: val.delete ? val.delete : false,
            list: !!(val.view || val.edit || val.create || val.delete),
          });
        } else if (val.submenu) {
          val.submenu.forEach((element) => {
            if (element.section.toLowerCase() === temp) {
              setActionPermission({
                view: element.view ? element.view : false,
                edit: element.edit ? element.edit : false,
                create: element.create ? element.create : false,
                delete: element.delete ? element.delete : false,
                list: !!(element.view || element.edit || element.create || element.delete),
              });
            }
          });
        }
      });
      if (deleteCondition.checkCondition) {
        setCanDelete(false);
        setDeletemessage('Sorry you cant delete this data');
      }
      if (gridApi) {
        gridApi.sizeColumnsToFit();
        const dataSource = {
          getRows: (params) => {
            const { filterModel, sortModel } = params;
            let urls = urlParam;
            // Use startRow and endRow for sending pagination to Backend
            // params.startRow : Start Page
            // params.endRow : End Page
            gridApi.showLoadingOverlay();
            const page = params.endRow / perPage;
            urls += `page=${page}&limit=${perPage}`;
            // Sorting
            if (sortModel.length) {
              const { colId, sort } = params.sortModel[0];
              urls += `&sortBy=${colId}:${sort}`;
            }
            // Searching
            if (search !== null && search.length > 0) {
              urls += `&searchBy=${search}`;
            }
            fetch(urls, {
              method: 'GET',
              headers: { Authorization: token },
            })
              .then((resp) => {
                statusCode = resp.status;
                return resp.json();
              })
              .then((res) => {
                if (statusCode === 200 && res.data.result.totalResults > 0) {
                  gridApi.hideOverlay();
                  params.successCallback(res.data.result.results, res.data.result.totalResults);
                } else {
                  gridApi.showNoRowsOverlay();
                  params.successCallback([], 0);
                }
              })
              .catch((err) => {
                gridApi.showNoRowsOverlay();
                params.successCallback([], 0);
              });
          },
        };

        gridApi.setDatasource(dataSource);
      }
    }, [search, deletedUser, url]);

    const onFilterTextChange = (e) => {
      gridApi.setQuickFilter(e.target.value);
      setSearchTerm(e.target.value);
    };

    if (localStorage.getItem('theme') === 'dark') {
      rowStyle = {
        background: '#2b2b40',
        height: '50px',
        borderBottomStyle: 'none',
        fontFamily: 'SFUIDisplayRegular',
        borderRadius: '10px',
        paddingTop: '4px',
        color: '#818896',
        textOverflow: 'initial',
      };
    } else if (localStorage.getItem('theme') === 'light') {
      rowStyle = {
        background: '#fff !important',
        height: '50px',
        borderBottomStyle: 'none',
        fontFamily: 'SFUIDisplayRegular',
        borderRadius: '10px',
        paddingTop: '4px',
        textOverflow: 'initial',
      };
    }

    return (
      <div>
        {actionPermissions.list && (
          <div>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <input
                  className={styles[searchboxStyle]}
                  id={styles.searchbar}
                  type="search"
                  onChange={onFilterTextChange}
                  placeholder="Search"
                />
                {/* <h1 className={styles[bodyheader]} id={styles.tableheading}>
                React AG Grid Table
              </h1> */}
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12" />
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" id={styles.searchboxpad}>
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.sidemenuicon} /> */}
                <div className={styles.sectionright}>
                  {actionPermissions.create && (
                    <button
                      className={styles.tableaddbtn}
                      type="button"
                      onClick={() => {
                        actionAdd();
                      }}
                    >
                      {' '}
                      <FontAwesomeIcon icon={faPlus} className={styles.add_icon} />
                      Add {addButtonPlaceholder}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="ag-theme-alpine mt-3" style={{ height: '400px' }}>
              <AgGridReact
                rowStyle={rowStyle}
                pagination
                rowSelection="multiple"
                columnDefs={columns}
                rowModelType="infinite"
                paginationPageSize={perPage}
                cacheBlockSize={perPage}
                onGridReady={onGridReady}
                rowHeight={60}
                overlayNoRowsTemplate={overlayNoRowsTemplate}
                defaultColDef={{
                  sortable: true,
                  // headerCheckboxSelection: true,
                  // checkboxSelection: true,
                }}
              />
            </div>
            {showTablePopUp ? (
              <TableViewPopup dataId={dataId} handleClose={setShowTablePopUp} section={section} />
            ) : null}
          </div>
        )}
      </div>
    );
  }
);
AgGridTable.propTypes = {
  urlParam: PropTypes.string.isRequired,
  fieldNames: PropTypes.oneOfType([PropTypes.array]).isRequired,
  section: PropTypes.string.isRequired,
  viewPopUp: PropTypes.bool,
  toggleButton: PropTypes.oneOfType([PropTypes.object]),
  addButtonPlaceholder: PropTypes.string,
  deleteCondition: PropTypes.oneOfType([PropTypes.any]),
};
AgGridTable.defaultProps = {
  viewPopUp: false,
  toggleButton: { show: false, field: 'none' },
  addButtonPlaceholder: '',
  deleteCondition: { checkCondition: false, apiUrl: 'none' },
};
export default AgGridTable;
