import React from 'react';
import PropTypes from 'prop-types';

function PhoneNumberInput({
  fieldName,
  className,
  labelstyle,
  labeldarkstyle,
  classNamedark,
  register,
  errors,
  RegularExp,
  minLength,
  maxLength,
  isRequired,
  label,
  mandatory,
}) {
  let classNames = labelstyle;
  let classNamess = className;

  if (localStorage.getItem('theme') === 'dark') {
    classNames = labeldarkstyle;
    classNamess = classNamedark;
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { form } = e.target;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  };
  return (
    <div className="form-group">
      <label htmlFor={fieldName} className={classNames ?? labelstyle}>
        {label ?? ''}
      </label>
      {mandatory ? <span style={{ color: 'red', marginLeft: '3px' }}>*</span> : <span />}
      <input
        type="tel"
        onKeyDown={handleKeyDown}
        onKeyPress={(event) => {
          if (!/^[0-9 -+]+$/.test(event.key)) {
            event.preventDefault();
            errors[fieldName].message = 'Cannot accept Characters';
          }
        }}
        className={classNamess ?? className}
        maxLength={maxLength}
        placeholder="Enter Phone Number"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: `${label} is required`,
          },
          pattern: {
            value: RegularExp ?? /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
            message: 'This is not a valid mobile phone to me, try again!',
          },
          minLength: {
            value: minLength ?? 7,
            message: `${label} is too short`,
          },
          maxLength: {
            value: maxLength ?? 17,
            message: `Maximum length is ${maxLength}`,
          },
        })}
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
          errors[fieldName] && errors[fieldName].message
        }{' '}
      </p>
    </div>
  );
}
PhoneNumberInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  RegularExp: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeHolder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labeldarkstyle: PropTypes.string,
  classNamedark: PropTypes.string,
};
PhoneNumberInput.defaultProps = {
  isRequired: false,
  fieldName: 'phone',
  placeHolder: 'Phone Number',
  label: 'Phone Number',
  RegularExp: true,
  minLength: 7,
  maxLength: 15,
  mandatory: false,
  labeldarkstyle: null,
  classNamedark: null,
};
export default PhoneNumberInput;
