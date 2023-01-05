import React from 'react';
import PropTypes from 'prop-types';

function CheckBoxField({ fieldName, label, register, errors, labelstyle, isRequired, mandatory }) {
  return (
    <div className="form-field">
      <input
        type="checkbox"
        style={{ marginRight: '5px' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: 'Field is required',
          },
        })}
      />
      <label className={labelstyle} htmlFor={fieldName}>
        {label ?? 'checkbox'}
      </label>
      {mandatory ? <span style={{ color: 'red' }}>*</span> : <span />}
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
          errors[fieldName] && errors[fieldName].message
        }{' '}
      </p>
    </div>
  );
}

CheckBoxField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isRequired: PropTypes.bool,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
};
CheckBoxField.defaultProps = {
  mandatory: false,
  isRequired: false,
  label: 'CheckBox',
};

export default CheckBoxField;
