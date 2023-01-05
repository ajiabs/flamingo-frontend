import React from 'react';
import PropTypes from 'prop-types';

function NumberInput({
  fieldName,
  register,
  errors,
  isRequired,
  maximLength,
  minimLength,
  label,
  mandatory,
}) {
  return (
    <div className="form-field">
      <label htmlFor={fieldName}>{label ?? 'Number field'}</label>
      {mandatory || isRequired ? <span style={{ color: 'red' }}>*</span> : <span />}
      <input
        type="text"
        placeholder="Number field"
        onKeyPress={(event) => {
          if (!/^[0-9 -+]+$/.test(event.key)) {
            event.preventDefault();
            errors[fieldName].message = 'Cannot accept Characters';
          }
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName ?? 'Number', {
          required: {
            value: isRequired,
            message: 'Field is Required. ',
          },
          maxLength: {
            value: maximLength ?? 10,
            message: `Value must be maximum ${maximLength ?? 10}.`,
          },
          minLength: {
            value: minimLength ?? 2,
            message: `Value must be minimum ${minimLength ?? 2}.`,
          },
        })}
      />

      <p style={{ color: 'red' }}>
        {' '}
        {
          // Shows if error exist
          errors[fieldName] && errors[fieldName].message
        }{' '}
      </p>
    </div>
  );
}

NumberInput.propTypes = {
  fieldName: PropTypes.element.isRequired,
  register: PropTypes.element.isRequired,
  errors: PropTypes.element.isRequired,
  placeHolder: PropTypes.element,
  isRequired: PropTypes.element,
  maximLength: PropTypes.element,
  minimLength: PropTypes.element,
  label: PropTypes.element,
  mandatory: PropTypes.element,
};
NumberInput.defaultProps = {
  mandatory: false,
  isRequired: false,
  placeHolder: 'Enter Value',
  maximLength: 10,
  minimLength: 0,
  label: 'Number Input',
};
export default NumberInput;
