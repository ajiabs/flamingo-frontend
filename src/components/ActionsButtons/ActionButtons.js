/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import TableViewPopup from '../TableViewPopup/TableViewPopup';
import styles from './ActionButtons.module.scss';
import useToggle from '../../hooks/useToggle';
import { Entry } from '../../redux/entrySlice';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';

function ActionButtons({ data, section, viewPopUp, deleteCondition }) {
  const { actionbtnStyle } = useContext(TableContext);
  const [actionPermissions, setActionPermission] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setDeletemessage] = useState();
  const deleteMessage = `Are you sure, you want to delete ${data.name} ?`;
  const [canDelete, setCanDelete] = useState(true);
  const { setDeletedData } = useContext(TableContext);
  const [showTablePopUp, setShowTablePopUp] = useToggle();
  const actionView = (param) => () => {
    const encodeText = param.id;
    if (viewPopUp) {
      setShowTablePopUp(true);
    } else {
      navigate(`/${section}/viewdetails/${encodeText}`);
    }
  };
  const actionEdit = (params) => {
    const encodeText = params.id;
    navigate(`/${section}/edit/${encodeText}`);
  };
  const handleDelete = (params) => {
    confirmAlert({
      title: canDelete ? '' : 'Oops!!',
      message: deleteMessage,
      buttons: canDelete
        ? [
            {
              label: 'yes',
              onClick: () => {
                const actionData = {};
                actionData.actionUrl = `${section}/${params.id}`;
                actionData.actionMethod = 'delete';
                dispatch(Entry(actionData)).then(() => {
                  toast.success('Row deleted successfully');
                  setDeletedData(`data last deleted is ${params.id}`);
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
        });
      }
    });
    if (deleteCondition.checkCondition) {
      setCanDelete(false);
      setDeletemessage('Sorry you cant delete this data');
    }
  }, []);
  return (
    <>
      <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2" id={styles.btnflex}>
        {actionPermissions.view && (
          <button
            className={styles[actionbtnStyle]}
            id={styles.actionbtn}
            type="button"
            onClick={actionView(data)}
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
              actionEdit(data);
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
              handleDelete(data);
            }}
          >
            {' '}
            <i className="fa fa-trash" />
          </button>
        )}
      </div>
      {showTablePopUp ? (
        <TableViewPopup dataId={data.id} handleClose={setShowTablePopUp} section={section} />
      ) : null}
    </>
  );
}

ActionButtons.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  section: PropTypes.string.isRequired,
  viewPopUp: PropTypes.bool.isRequired,
  deleteCondition: PropTypes.oneOfType([PropTypes.object]),
};
ActionButtons.defaultProps = {
  deleteCondition: { checkCondition: false, apiUrl: 'none' },
};
export default ActionButtons;
