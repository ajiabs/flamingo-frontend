/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { SERVER_BASE_URL } from '../../redux/apiConstants';

function ExportToExcel({ apiUrl, fileName }) {
  const exportToCSV = (appendUrl, name) => () => {
    const url = `${SERVER_BASE_URL}/${appendUrl}`; // api url
    fetch(url)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => {
        if (resp.result.length) {
          // eslint-disable-next-line no-underscore-dangle
          const cleanArray = resp.result.map((item) => {
            // eslint-disable-next-line no-underscore-dangle
            delete item.id;
            return item;
          });
          const ws = XLSX.utils.json_to_sheet(cleanArray);
          const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
          XLSX.writeFile(wb, `${name}sheetjs.xlsx`);
        }
      }); // setting response to state posts
  };
  return (
    <li>
      <a className="dropdown-item" onClick={exportToCSV(apiUrl, fileName)}>
        Export Excel
      </a>
    </li>
  );
}

ExportToExcel.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ExportToExcel;
