import React, { useContext, useEffect } from 'react';
import Table from '../../components/AgTable/AgGridTable';
import { REACT_APP_API_FETCH_MOVIES } from '../../redux/apiConstants';
import { TableContext } from '../../contexts/tableContext';
import styles from './index.module.scss';
import { getCookies } from '../../hooks/useCookies';

const MoviesIndex = React.memo(() => {
  const { setDashboardHeader } = useContext(TableContext);
  const { dashboardStyle, bodyStyle, url, setUrl } = useContext(TableContext);
  const permissions = getCookies('USERPERMISSION');
  const temp = 'movies';
  let exportpermission = false;
  permissions.forEach((val) => {
    if (val.section.toLowerCase() === temp) {
      exportpermission = !!(val.view || val.edit || val.create || val.delete);
    } else if (val.submenu) {
      val.submenu.forEach((element) => {
        if (element.section.toLowerCase() === temp) {
          exportpermission = !!(element.view || element.edit || element.create || element.delete);
        }
      });
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Movies');
    setUrl(`${REACT_APP_API_FETCH_MOVIES}`);
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
              fieldNames={['name', 'year', 'description']}
              section="movies"
              addButtonPlaceholder=""
              deleteCondition={{ checkCondition: false, apiUrl: 'www.google.com' }}
            />
          </div>
        )}
      </div>
    </div>
  );
});
export default MoviesIndex;
