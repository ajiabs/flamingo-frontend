import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { getCookies } from '../../hooks/useCookies';
import styles from './ToggleButton.module.scss';
import envValues from '../../enviornment';

function ToggleButtonOnOff({ value, id }) {
  const [isOff, setIsOff] = useState(false);

  useEffect(() => {
    setIsOff(value);
  }, [value]);

  const handleButtonClick = () => {
    confirmAlert({
      title: 'Confirm to change status',
      message: 'Are you sure want to change status.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setIsOff(!isOff);
            const headers = {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
            };
            const body = { token: getCookies('Token'), userid: id, active: !isOff };
            axios
              .post(`${envValues.REACT_APP_API_ENDPOINT}/auth/toggle-change`, body, headers)
              .then(() => {});
          },
        },
        {
          label: 'No',
          // onClick: () => alert("Click No")
        },
      ],
    });
  };
  return (
    <div className="col ">
      <label className={styles.switch}>
        <input type="checkbox" checked={isOff} onClick={handleButtonClick} />
        <span className={styles.slider} />
      </label>
    </div>
  );
}

ToggleButtonOnOff.propTypes = {
  value: PropTypes.bool,
  id: PropTypes.string,
};
ToggleButtonOnOff.defaultProps = {
  value: false,
  id: null,
};
export default ToggleButtonOnOff;
