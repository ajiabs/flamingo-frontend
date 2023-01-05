/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRangePicker } from 'react-date-range';
import { addDays, subDays } from 'date-fns';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { TableContext } from '../../contexts/tableContext';
import styles from './DateRangeFilter.module.scss';

function DateRangeFilter({ onChange, open, setOpen }) {
  const { bodyheader } = useContext(TableContext);
  const { searchboxStyle } = useContext(TableContext);
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };
  const formatDate = (date) => moment(date).format('MM/DD/YYYY');
  const Endate =
    state[0].endDate === null ? formatDate(state[0].startDate) : formatDate(state[0].endDate);
  const startDate = state[0].startDate ? formatDate(state[0].startDate) : '';

  return (
    <div className="mb-3">
      <p className={styles[bodyheader]} id={styles.chooseheading}>
        Choose a date range
      </p>
      <div>
        {state[0].startDate !== '' && state[0].endDate !== '' && (
          <span className={styles[searchboxStyle]} id={styles.dateview}>
            {startDate} {'- '}
            {Endate}
          </span>
        )}
        <button onClick={() => setOpen(!open)} className={styles.openbtn}>
          <FontAwesomeIcon
            onClick={() => setOpen(!open)}
            icon={faCalendarDays}
            className={styles.calendaricon}
          />
        </button>
      </div>
      {open && (
        <DateRangePicker
          className={styles.datepicker}
          onChange={handleOnChange}
          showSelectionPreview
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          dateDisplayFormat="yyyy-MM-dd"
          staticRanges={[]}
          inputRanges={[]}
        />
      )}
    </div>
  );
}

DateRangeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
};
DateRangeFilter.defaultProps = {
  open: false,
};

export default DateRangeFilter;
