/* eslint-disable global-require */
import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TableContext } from '../../contexts/tableContext';
import pagenotfoundBg from '../../assets/404page.svg';
import styles from './pageNotFound.module.scss';

function PageNotFound() {
  const navigate = useNavigate();
  const { bodyStyle } = useContext(TableContext);
  const handleButtonClick = () => navigate('/');
  return (
    <div className={styles[bodyStyle]} id={styles.notfoundbg}>
      <div className={styles.centerbox}>
        <div className={styles.imgdiv}>
          <Image src={pagenotfoundBg} alt="404image" className={styles.pagenotimage} />
        </div>
        <div>
          <h2 className={styles.pagenotfoundhead}>Page Not Found</h2>
          <p className={styles.pagenotfoundpara}>
            We are sorry, the page you requested could not be found.
            <br />
            Please go back to the homepage
          </p>
        </div>
        <div className={styles.btnsection}>
          <button
            type="button"
            className={styles.gohomebtn}
            onClick={() => {
              handleButtonClick();
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
