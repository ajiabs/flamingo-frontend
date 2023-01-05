import React from 'react';
import PropTypes from 'prop-types';

function TextAreaField({
  label,
  labelstyle,
  labeldarkstyle,
  fieldName,
  register,
  errors,
  placeHolder,
  isRequired,
  minimLength,
  mandatory,
}) {
  let classNames = labelstyle;

  if (localStorage.getItem('theme') === 'dark') {
    classNames = labeldarkstyle;
  }
  return (
    <div className="form-field">
      <label htmlFor={fieldName} className={classNames ?? labelstyle}>
        {label}
      </label>
      {mandatory || isRequired ? <span style={{ color: 'red' }}>*</span> : <span />}
      <textarea
        placeholder={placeHolder ?? 'Type Here'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: `${fieldName} is required`,
          },
          minLength: {
            value: minimLength ?? 5,
            message: `Value must be minimum ${minimLength ?? 5} `,
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

TextAreaField.propTypes = {
  fieldName: PropTypes.element.isRequired,
  labelstyle: PropTypes.element.isRequired,
  label: PropTypes.element,
  register: PropTypes.element.isRequired,
  errors: PropTypes.element.isRequired,
  placeHolder: PropTypes.element,
  isRequired: PropTypes.element,
  minimLength: PropTypes.element,
  mandatory: PropTypes.element,
  labeldarkstyle: PropTypes.element,
};
TextAreaField.defaultProps = {
  mandatory: false,
  isRequired: false,
  labeldarkstyle: null,
  label: 'Text Area',
  placeHolder: 'Enter Value',
  minimLength: 100,
};
export default TextAreaField;
