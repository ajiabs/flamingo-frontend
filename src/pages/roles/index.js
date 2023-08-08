import React, { useContext, useEffect } from 'react';
import AgGridTable from '../../components/AgTable/AgGridTable';
import { REACT_APP_API_FETCH_ROLE } from '../../redux/apiConstants';
import { TableContext } from '../../contexts/tableContext';
import styles from './index.module.scss';

const RoleIndex = React.memo(() => {
  const { dashboardStyle, bodyStyle, setDashboardHeader, setUrl, url } = useContext(TableContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Roles');
    setUrl(REACT_APP_API_FETCH_ROLE);
  }, []);
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
        id={styles.dashboardcont2}
      >
        <div className={styles.indexdiv}>
          <AgGridTable
            urlParam={url}
            fieldNames={['name']}
            addButtonPlaceholder=""
            section="roles"
          />
        </div>
      </div>
    </div>
  );
});
export default RoleIndex;
