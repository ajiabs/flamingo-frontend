import React, { useContext, useEffect } from 'react';
import Table from '../../components/AgTable/AgGridTable';
import { REACT_APP_API_FETCH_NOTIFICATIONS } from '../../redux/apiConstants';
import { TableContext } from '../../contexts/tableContext';
import styles from './index.module.scss';
import { getCookies } from '../../hooks/useCookies';

const NotificationsIndex = React.memo(() => {
  const { setDashboardHeader } = useContext(TableContext);
  const { dashboardStyle, bodyStyle, url, setUrl } = useContext(TableContext);
  const permissions = getCookies('USERPERMISSION');
  const temp = 'notifications';
  let exportpermission = false;
  permissions.forEach((val) => {
    if (val.section.toLowerCase() === temp) {
      exportpermission = !!(val.view || val.edit || val.create || val.delete);
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Notifications');
    setUrl(`${REACT_APP_API_FETCH_NOTIFICATIONS}`);
  }, []);
  // const datacsv = [
  //   { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager' },
  //   { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer' },
  // ];
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
        id={styles.dashboardcont2}
      >
        {exportpermission && (
          <div className={styles.indexdiv}>
            <Table
              urlParam={url}
              fieldNames={['type', 'message']}
              section="notifications"
              addButtonPlaceholder=""
              deleteCondition={{ checkCondition: false, apiUrl: 'www.google.com' }}
            />
          </div>
        )}
      </div>
    </div>
  );
});
export default NotificationsIndex;
