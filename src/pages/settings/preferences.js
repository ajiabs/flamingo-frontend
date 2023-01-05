import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableContext } from '../../contexts/tableContext';
import { getCookies, setCookies } from '../../hooks/useCookies';
import { Entry } from '../../redux/entrySlice';
import styles from './preferences.module.scss';

function Preferences() {
  const { formthemeStyle } = useContext(TableContext);
  const { bodyheader } = useContext(TableContext);
  const [submiting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { setDashboardHeader } = useContext(TableContext);
  const { settingsprefSetStyle, settingsapiSetStyle, settingsgeneralSetStyle } =
    useContext(TableContext);
  const [selectedValue, setSelectedValue] = useState(getCookies('dateFormat'));
  const dateFormats = [
    {
      value: 'toString',
      label: 'Fri Jul 02 2021 14:03:54 GMT+0100',
    },
    {
      value: 'toDateString',
      label: 'Fri Jul 02 2021',
    },
    {
      value: 'toLocaleString',
      label: '7/2/2021, 2:05:07 PM',
    },
    {
      value: 'toLocaleDateString',
      label: '7/2/2021',
    },
    {
      value: 'toGMTString',
      label: 'Fri, 02 Jul 2021 13:06:02 GMT',
    },
    {
      value: 'toUTCString',
      label: 'Fri, 02 Jul 2021 13:06:28 GMT',
    },
    {
      value: 'toISOString',
      label: '2021-07-02T13:06:53.422Z',
    },
  ];
  const handleDateFormatChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleSubmit = () => {
    const data = {};
    const updationData = {
      values: {
        dateFormat: selectedValue,
      },
    };
    data.actionUrl = 'settings/updatedate';
    data.actionMethod = 'patch';
    data.apiData = updationData;
    dispatch(Entry(data)).then((resp) => {
      if (resp.payload) {
        window.location.reload(false);
      }
    });
    setCookies('dateFormat', selectedValue);
    setSubmitting(false);
  };
  useEffect(() => {
    setDashboardHeader('Settings');
    settingsprefSetStyle('settingsgeneral');
    settingsapiSetStyle('settingslinks');
    settingsgeneralSetStyle('settingslinks');
  }, []);
  return (
    <div className={styles[formthemeStyle]} id={styles.addform}>
      <h5 className={styles[bodyheader]} id={styles.addheading}>
        Select Date Format{' '}
      </h5>
      <select
        className={styles.selectdate}
        value={selectedValue || 'MM/dd/y'}
        onChange={handleDateFormatChange}
      >
        {dateFormats.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className={styles.savebtnsection}>
        <input
          className={styles.savebtn}
          type="button"
          disabled={submiting}
          value={submiting ? 'Please wait..' : 'Save Changes'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Preferences;
