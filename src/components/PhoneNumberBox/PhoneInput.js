import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
import styles from './PhoneInput.module.scss';

function PhoneInputBox({
  fieldName,
  className,
  labelstyle,
  label,
  control,
  errors,
  labeldarkstyle,
  classNamedark,
}) {
  let classNames = labelstyle;
  let classNamess = className;

  if (localStorage.getItem('theme') === 'dark') {
    classNames = labeldarkstyle;
    classNamess = classNamedark;
  }
  return (
    <div className="form-group">
      <label className={classNames ?? labelstyle} htmlFor="phone-input">
        {label}
      </label>
      <Controller
        name={fieldName}
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value),
          message: ' invalid phone.',
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            className={styles[classNamess ?? className]}
            value={value}
            onChange={onChange}
            defaultCountry="US"
            id="phone-input"
          />
        )}
      />
      {errors[fieldName] && (
        <p
          style={{
            color: 'red',
            marginTop: '5px',
            fontSize: '14px',
            fontFamily: 'SFUIDisplayRegular',
          }}
          className="error-message"
        >
          Invalid {label}
        </p>
      )}
    </div>
  );
}
PhoneInputBox.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  control: PropTypes.element.isRequired,
  labelstyle: PropTypes.element.isRequired,
  fieldName: PropTypes.element.isRequired,
  errors: PropTypes.element.isRequired,
  labeldarkstyle: PropTypes.string.isRequired,
  classNamedark: PropTypes.string.isRequired,
};

export default PhoneInputBox;
