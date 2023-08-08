/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './index.module.scss';
import CustomTable from '../../components/CustomTable/CustomTable';
import { REACT_APP_API_FETCH_USER } from '../../redux/apiConstants';

const UserIndex = React.memo(() => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.indexdiv}>
      <CustomTable
        urlParam={REACT_APP_API_FETCH_USER}
        viewPopUp
        section="User"
        toggleButton={{ show: true, field: 'active' }}
        deleteCondition={{ checkCondition: false, apiUrl: 'www.google.com' }}
      />
    </div>
  );
});
export default UserIndex;
