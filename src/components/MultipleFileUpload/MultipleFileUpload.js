import React, { useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';
import envValues from '../../enviornment';
import styles from './MultipleFileUpload.module.scss';

function MultipleFileUpload({ editFiles, section }) {
  const [edited, setEdited] = useState(editFiles);
  const [uploadedImgs, setUplodedImgs] = useState([]);
  const { setFiles } = useContext(TableContext);
  const token = `Bearer ${getCookies('Token')}`;
  const imgUrl = [];
  const params = useParams();
  const { userId } = params;
  const pdfImg =
    'https://thesoftwarepro.com/wp-content/uploads/2019/12/microsoft-office-pdf-document-953x1024.jpg';
  const videoImg =
    'https://image.shutterstock.com/image-vector/play-button-icon-vector-illustration-260nw-1697833306.jpg';
  const handleChange = async (e) => {
    const { files } = e.target;
    for (let i = 0; i < files.length; i += 1) {
      // const file = e.target.files[i];
      const extension = e.target.files[i].name.split('.')[1];
      if (
        extension === 'MP4' ||
        extension === 'MOV' ||
        extension === 'mp4' ||
        extension === 'mov'
      ) {
        imgUrl.push({ imgurl: URL.createObjectURL(e.target.files[i]), extension: 'video' });
      } else if (extension === 'pdf') {
        imgUrl.push({ imgurl: URL.createObjectURL(e.target.files[i]), extension: 'pdf' });
      } else {
        imgUrl.push({ imgurl: URL.createObjectURL(e.target.files[i]), extension: 'image' });
      }
      setUplodedImgs(imgUrl);
    }
    setFiles(e.target.files);
  };

  const handleCancelButton = (param) => () => {
    setUplodedImgs(uploadedImgs.filter((value, index) => index !== param));
    setFiles(uploadedImgs.filter((value, index) => index !== param));
  };

  const handleRemoveButton = (param) => () => {
    axios
      .delete(`${envValues.REACT_APP_API_ENDPOINT}/${section}/${userId}/${param}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        setEdited(res.data.data.user.files);
        toast.success('File removed!');
      });
  };
  return (
    <div className="form-group">
      <div className="d-flex">
        <div className="d-flex">
          <div className="file-uploader-mask d-flex justify-content-center align-items-center">
            {/* <img
              className="file-uploader-icon"
              src="https://pic.onlinewebfonts.com/svg/img_150954.png"
              style={{ height: 20, width: 20 }}
              alt="Upload-Icon"
            /> */}
          </div>
          <input
            multiple
            className="file-input"
            id="upload"
            type="file"
            onChange={handleChange}
            hidden
          />
          <label htmlFor="upload" className={styles.upload_btn}>
            Choose file
          </label>
        </div>
      </div>
      <div className="d-flex flex-wrap mt-4">
        {edited != null
          ? edited.map((uploadedImg, index) => (
              <div className={styles.close_icon_main}>
                <img
                  src={uploadedImg.path}
                  key={uploadedImg.path}
                  style={{ height: 100, width: 100, objectFit: 'contain' }}
                  alt="UploadedImages"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = uploadedImg.extension === 'video' ? videoImg : pdfImg;
                  }}
                  className="img-thumbnail img-fluid uploaded-img mr-5"
                />
                <button
                  type="button"
                  className={styles.close_icon}
                  onClick={handleRemoveButton(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 19 19"
                    stroke="#60677e"
                    strokeWidth="2"
                    className="react-date-picker__clear-button__icon react-date-picker__button__icon"
                    style={{ marginTop: '-10px', marginLeft: '-3px' }}
                  >
                    <line x1="4" x2="15" y1="4" y2="15" />
                    <line x1="15" x2="4" y1="4" y2="15" />
                  </svg>
                </button>
              </div>
            ))
          : null}
      </div>
      <div className="image upload">
        {uploadedImgs != null
          ? uploadedImgs.map((uploadedImg, index) => (
              <>
                <div className={styles.uploaded_imgsection}>
                  <img
                    src={uploadedImg.imgurl}
                    key={uploadedImg.imgurl}
                    alt="UploadedImages"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = uploadedImg.extension === 'video' ? videoImg : pdfImg;
                    }}
                    className="img-thumbnail img-fluid uploaded-img mr-2"
                    id={styles.uploaded_img}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCancelButton(index)}
                  className={styles.imgcancel_btn}
                >
                  Cancel
                </button>
              </>
            ))
          : null}
      </div>
    </div>
  );
}
MultipleFileUpload.propTypes = {
  editFiles: PropTypes.element,
  section: PropTypes.element,
};
MultipleFileUpload.defaultProps = {
  editFiles: null,
  section: 'user',
};

export default MultipleFileUpload;
