import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import DateRangeFilter from '../../components/DateRangeFilter/DateRangeFilter';
import Table from '../../components/AgTable/AgGridTable';
import ExportToExcel from '../../components/Export/ExportToExcel';
import { REACT_APP_API_FETCH_EMPLOYEE } from '../../redux/apiConstants';
import { TableContext } from '../../contexts/tableContext';
import ExportPdf from '../../components/ExportPdf/ExportPdf';
import styles from './index.module.scss';
import { getCookies } from '../../hooks/useCookies';

function EmployeeIndex() {
  const { setDashboardHeader } = useContext(TableContext);
  const { dashboardStyle, bodyStyle, url, setUrl } = useContext(TableContext);
  const [range, setRange] = useState([]);
  const [open, setOpen] = useState(false);
  const permissions = getCookies('USERPERMISSION');
  const temp = 'employee';
  let exportpermission = false;
  permissions.forEach((val) => {
    if (val.section.toLowerCase() === temp) {
      exportpermission = !!(val.view || val.edit || val.create || val.delete);
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Employees');
    setUrl(`${REACT_APP_API_FETCH_EMPLOYEE}`);
  }, []);
  let urlToFetch = 'report/employee';
  // const datacsv = [
  //   { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager' },
  //   { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer' },
  // ];
  const onChange = (ranges) => {
    // ranges ...
    if (
      moment(ranges.startDate).format('MM-DD-YYYY') !== moment(ranges.endDate).format('MM-DD-YYYY')
    ) {
      setOpen(false);
    } else if (ranges.startDate === '' && ranges.endDate === '') {
      setOpen(false);
    }
    const dateRange = JSON.stringify(ranges);
    urlToFetch = `${urlToFetch}?daterange=${encodeURIComponent(dateRange)}`;
    setRange(urlToFetch);
    setUrl(`${REACT_APP_API_FETCH_EMPLOYEE}daterange=${encodeURIComponent(dateRange)}&`);
  };
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
        id={styles.dashboardcont2}
      >
        {exportpermission && (
          <div className={styles.indexdiv}>
            <Row>
              <Col lg={6} md={6}>
                <DateRangeFilter onChange={onChange} open={open} setOpen={setOpen} />
              </Col>
              <Col lg={6} md={6}>
                <div className={styles.exportsection}>
                  <div className="dropdown" id={styles.dropdown}>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Export
                    </button>
                    <ul
                      className="dropdown-menu"
                      id={styles.dropdown_menu}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <ExportToExcel
                        apiUrl={range.length ? range : urlToFetch}
                        fileName="Employee Report"
                      />
                      <ExportPdf
                        apiUrl={range.length ? range : urlToFetch}
                        fileName="Employee Report"
                      />
                    </ul>
                  </div>
                  {/* <ExportToExcel
                    apiUrl={range.length ? range : urlToFetch}
                    apiData={datacsv}
                    fileName="Employee_Report"
                  />
                  <ExportPdf
                    apiUrl={range.length ? range : urlToFetch}
                    fileName="Employee Report"
                  /> */}
                </div>
              </Col>
            </Row>
            <Table
              urlParam={url}
              fieldNames={['name', 'email', 'phone']}
              section="employee"
              addButtonPlaceholder=""
              deleteCondition={{ checkCondition: false, apiUrl: 'www.google.com' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default EmployeeIndex;
