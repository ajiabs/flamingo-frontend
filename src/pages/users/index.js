import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { TableContext } from '../../contexts/tableContext';
import { REACT_APP_API_FETCH_USER } from '../../redux/apiConstants';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './index.module.scss';
import { getCookies } from '../../hooks/useCookies';
import CustomTable from '../../components/CustomTable/CustomTable';

export default function UserIndex() {
  let response;
  let url;
  const token = `Bearer ${getCookies('Token')}`;
  const { setDashboardHeader } = useContext(TableContext);
  let statusCode;
  const [data, setData] = useState([]);
  const { setTableLoading, pageNum, sorting, search, deletedData } = useContext(TableContext);
  const dataPerPage = 5;

  const getUsers = async () => {
    setTableLoading(true);
    url = REACT_APP_API_FETCH_USER;
    url += `page=${pageNum}&limit=${dataPerPage}`;
    if (sorting.sortType && sorting.sortType !== 'none') {
      url += `&sortBy=${sorting.col}:${sorting.sortType}`;
    }
    if (search !== null) {
      url += `&searchBy=${search}`;
    }
    axios
      .get(url, {
        method: 'GET',
        headers: { Authorization: token },
      })
      .then((resp) => {
        setTableLoading(false);
        statusCode = resp.status;
        return resp;
      })
      .then((res) => {
        if (statusCode === 200) {
          console.log(res);
          response = res.data.data.result;
          setData(response);
        }
      })
      .catch((err) => {
        setTableLoading(false);
        return err;
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Users');
    getUsers();
  }, [search, sorting, pageNum, deletedData]);
  return (
    <div className={styles.indexdiv}>
      {Object.keys(data).length > 0 ? (
        <CustomTable
          data={data}
          viewPopUp
          section="User"
          toggleButton={{ show: true, field: 'active' }}
          deleteCondition={{ checkCondition: false, apiUrl: 'www.google.com' }}
        />
      ) : (
        <SpinnerDotted
          style={{
            color: '#39979d',
            left: '50%',
            position: 'relative',
            textAlign: 'center',
            top: '50%',
            minHeight: '100vh',
          }}
        />
      )}
    </div>
  );
}
