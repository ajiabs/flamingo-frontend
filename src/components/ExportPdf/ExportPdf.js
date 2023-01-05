/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import 'jspdf-autotable';
import { SERVER_BASE_URL } from '../../redux/apiConstants';
// import { getCookies } from '../../hooks/useCookies';

function ExportPdf(apiUrl, fileName) {
  // const { logo } = getCookies('SITE_SETTINGS');
  const exportPdfs = (appendUrl, name) => () => {
    const url = `${SERVER_BASE_URL}/${appendUrl.apiUrl}`; // api url
    fetch(url)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => {
        if (resp.result.length) {
          // const img = new Image();
          const unit = 'pt';
          const size = 'A4'; // Use A1, A2, A3 or A4
          const orientation = 'portrait'; // portrait or landscape

          const marginLeft = 40;
          // eslint-disable-next-line new-cap
          const doc = new jsPDF(orientation, unit, size);

          doc.setFontSize(15);

          const { title } = resp;
          const headers = [resp.headers];
          // eslint-disable-next-line react/destructuring-assignment
          // eslint-disable-next-line max-len
          const data = Object.values(resp.result).map((elt) => [
            elt.name,
            elt.email,
            elt.phone,
            elt.designation,
          ]);

          const content = {
            startY: 160,
            head: headers,
            body: data,
          };
          // img.src = logo;
          // doc.addImage(img, 'PNG', 1, 2);
          doc.text(title, marginLeft, 150);
          doc.autoTable(content);
          doc.save(`${name}.pdf`);
        }
      });
  };
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <li>
      <a className="dropdown-item" onClick={exportPdfs(apiUrl, fileName)}>
        Export Pdf
      </a>
    </li>
  );
}
ExportPdf.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ExportPdf;
