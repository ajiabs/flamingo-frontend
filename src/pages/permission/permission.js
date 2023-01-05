import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { refreshMenu } from '../../redux/refreshMenu';
import { getCookies } from '../../hooks/useCookies';
import pagenotfoundBg from '../../assets/permissiondenied.png';
import styles from './permission.module.scss';

function PermissionDenied() {
  const navigate = useNavigate();
  const user = `${getCookies('USERROLE')}`;
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(refreshMenu(user)).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      {/* <div className={styles[bodyStyle]} id={styles.notfoundbg}> */}
      <div className={styles.centerbox}>
        <div className={styles.imgdiv}>
          <Image src={pagenotfoundBg} alt="404image" className={styles.pagenotimage} />
        </div>
        <div>
          <h2 className={styles.pagenotfoundhead}>Access Denied</h2>
          <p className={styles.pagenotfoundpara}>
            We are sorry, the page is Un Authorized.
            <br />
            Please click to refresh the permission
          </p>
        </div>
        <div className={styles.btnsection}>
          <button
            type="button"
            onClick={() => {
              onSubmit();
            }}
            className={styles.gohomebtn}
          >
            Refresh
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* <h1>Permission Denied!</h1> */}
      {/* <input
        type="button"
        value="Refresh"
        onClick={() => {
          onSubmit();
        }}
      /> */}
    </>
  );
}

export default PermissionDenied;
