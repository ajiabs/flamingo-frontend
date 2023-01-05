/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import { Controller } from 'react-hook-form';
import styles from './DatePicker.module.scss';

function DatePickerComponent({
  control,
  name,
  isRequired,
  errors,
  className,
  classNamedark,
  maxDate,
  label,
}) {
  let classNamess = className;

  if (localStorage.getItem('theme') === 'dark') {
    classNamess = classNamedark;
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: {
            value: isRequired,
            message: `${label} is required`,
          },
        }}
        render={({ field }) => (
          <div>
            <DatePicker
              className={classNamess ?? className}
              id={styles.datepicker}
              onChange={(date) => field.onChange(date)}
              value={typeof field.value === 'string' ? new Date(field.value) : field.value}
              format="dd/MM/y"
              maxDate={maxDate}
            />
          </div>
        )}
      />
      <p
        style={{
          color: 'red',
          marginTop: '5px',
          fontSize: '14px',
          fontFamily: 'SFUIDisplayRegular',
        }}
      >
        {' '}
        {
          // Shows if error exist
          errors[name] && errors[name].message
        }{' '}
      </p>
    </>
  );
}

DatePickerComponent.propTypes = {
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  errors: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  className: PropTypes.string,
  classNamedark: PropTypes.string,
  label: PropTypes.string,
  maxDate: PropTypes.any,
};
DatePickerComponent.defaultProps = {
  isRequired: false,
  classNamedark: null,
  className: 'default-input-class',
  maxDate: new Date(),
  label: 'Date',
};

export default DatePickerComponent;
