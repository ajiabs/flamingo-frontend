import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
function EmailInput({
  fieldName,
  register,
  errors,
  label,
  placeHolder,
  className,
  labelstyle,
  labeldarkstyle,
  classNamedark,
  isRequired,
  mandatory,
}) {
  let classNames = labelstyle;
  let classNamess = className;

  if (localStorage.getItem('theme') === 'dark') {
    classNames = labeldarkstyle;
    classNamess = classNamedark;
  }
  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
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
      {mandatory || isRequired ? <span style={{ color: 'red' }}>*</span> : <span />}
      <input
        type="text"
        className={classNamess ?? className}
        placeholder={placeHolder ?? 'Email'}
        onKeyDown={handleKeyDown}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName ?? 'email', {
          required: {
            value: isRequired,
            message: `${label} is required.`,
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email.',
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

EmailInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  classNamedark: PropTypes.string,
  labeldarkstyle: PropTypes.string,
};
EmailInput.defaultProps = {
  mandatory: false,
  isRequired: false,
  labeldarkstyle: null,
  classNamedark: null,
  placeHolder: 'Enter Email',
  label: 'Email',
};
export default EmailInput;
