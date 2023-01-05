/* eslint-disable global-require */
import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import { Image } from 'react-bootstrap';
import { Label } from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { SpinnerDotted } from 'spinners-react';
import { getCookies, setCookies } from '../../hooks/useCookies';
import { TableContext } from '../../contexts/tableContext';
import styles from './profilePic.module.scss';
import envValues from '../../enviornment';

function ProfilePic() {
  const { bodyheader } = useContext(TableContext);
  const userId = `${getCookies('USERID')}`;
  const profile = `${getCookies('PROFILE')}`;
  const [loading, setLoading] = useState(false);
  const imageupload = (files) => {
    setLoading(true);
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('File', files);
    formData.append('Userid', userId);
    axios
      .post(`${envValues.REACT_APP_API_ENDPOINT}/user/imageupload`, formData, [headers])
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setCookies('PROFILE', JSON.stringify(response.data.data.location));
        }
        return response.data;
      })
      .catch((e) => e);
  };
  const [img, setImg] = useState(profile);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
        const files = e.target.files[0];
        imageupload(files);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const removePic = () => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };
    const body = {
      userid: userId,
      image:
        'https://boilerplate-armia.s3.us-west-2.amazonaws.com/downloads/blank-profile-picture-973460_960_720.webp-1671689291091',
    };
    axios
      .post(`${envValues.REACT_APP_API_ENDPOINT}/user/imageremove`, body, [headers])
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setCookies('PROFILE', JSON.stringify(response.data.data.location));
        }
        return response.data;
      })
      .catch((e) => e);

    setImg(
      'https://boilerplate-armia.s3.us-west-2.amazonaws.com/downloads/blank-profile-picture-973460_960_720.webp-1671689291091'
    );
  };
  return (
    <div>
      <div className={styles.profilepicdiv}>
        {loading ? (
          <SpinnerDotted style={{ color: '#39979d' }} />
        ) : (
          <Image src={img} alt="pic" className={styles.profilepic} />
        )}
      </div>
      <Popup
        trigger={
          <div className={styles.editbtnsection}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={styles[bodyheader]}
              id={styles.penicon}
            />
          </div>
        }
        position="bottom center"
      >
        <div className={styles.uploadfield}>
          <Label htmlFor="input">
            <FontAwesomeIcon
              name="image upload"
              onChange={imageHandler}
              icon={faArrowUpFromBracket}
              className={styles.uploadicon}
            />
          </Label>
          <input
            id="input"
            type="file"
            name="image upload"
            style={{ display: 'none' }}
            accept="image/*"
            placeholder="Update New Pic"
            onChange={imageHandler}
          />
          <FontAwesomeIcon onClick={removePic} icon={faUserXmark} className={styles.crossicon} />
        </div>
      </Popup>
    </div>
  );
}

export default ProfilePic;
