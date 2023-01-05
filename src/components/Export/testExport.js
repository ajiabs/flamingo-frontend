import React from 'react';
import PropTypes from 'prop-types';

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
import { render } from '@testing-library/react';

const exportToCSV = (csvData, fileName) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   const header = [{ A: 'id' }, { B: 'name' }];
  const fileExtension = '.xlsx';
  const title = [{ A: 'Report' }, {}];
  const table1 = [{ A: 'Company name' }]
    // .concat(header)
    .concat(csvData)
    .concat(['']);
  const finalData = [...title, ...table1];

  const ws = XLSX.utils.json_to_sheet(finalData, {
    skipHeader: true,
  });

  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(data, fileName + fileExtension);
};

function ExportCSV({ csvData, fileName }) {
  render(
    <button type="button" onClick={exportToCSV(csvData, fileName)}>
      Export
    </button>
  );
}
ExportCSV.propTypes = {
  csvData: PropTypes.string.isRequired,
  fileName: PropTypes.func.isRequired,
};

export default ExportCSV;
