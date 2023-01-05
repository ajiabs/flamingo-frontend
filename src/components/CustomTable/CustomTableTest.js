import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { TableContext } from '../../contexts/tableContext';
import { REACT_APP_API_FETCH_USER } from '../../redux/apiConstants';
import { getCookies } from '../../hooks/useCookies';
// import AutoComplete from '../AutoComplete/AutoComplete';
import CustomTable from './CustomTable';

function CustomTableTest() {
  let response;
  let url = REACT_APP_API_FETCH_USER;
  const token = `Bearer ${getCookies('Token')}`;
  let statusCode;
  const [data, setData] = useState([]);
  const { setTableLoading, pageNum, sorting, search, deletedData } = useContext(TableContext);
  const dataPerPage = 4;

  const getUsers = async () => {
    setTableLoading(true);
    url += `page=${pageNum}&limit=${dataPerPage}`;
    if (sorting.sortType !== 'none') {
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
          response = res.data;
          setData(response);
        }
      })
      .catch((err) => {
        setTableLoading(false);
        return err;
      });
  };
  useEffect(() => {
    getUsers();
  }, [search, sorting, pageNum, deletedData]);

  return (
    <>
      {/* <AutoComplete url={url} field="email" /> */}
      <div style={{ minHeight: '100vh' }}>
        {Object.keys(data).length > 0 ? (
          <CustomTable
            data={data}
            viewPopUp
            section="User"
            toggleButton={{ show: true, field: 'active' }}
            deleteCondition={{ checkCondition: false, apiUrl: 'www.google.com' }}
          />
        ) : (
          <SpinnerDotted style={{ marginLeft: '650px', marginTop: '200px', color: '#39979d' }} />
        )}
      </div>
    </>
  );
}

export default CustomTableTest;
