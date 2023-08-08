/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import useToggle from '../../hooks/useToggle';

function PasswordField({
  label,
  className,
  labelstyle,
  labeldarkstyle,
  classNamedark,
  eyeiconstyle,
  fieldName,
  register,
  errors,
  placeHolder,
  isRequired,
  minimLength,
  mandatory,
  hideErrors,
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
  };
  const [type, setType] = useToggle();
  return (
    <div className="form-group">
      <label htmlFor={fieldName} className={classNames ?? labelstyle}>
        {label ?? ''}
      </label>
      {mandatory || isRequired ? (
        <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
      ) : (
        <span />
      )}
      <input
        type={type ? 'text' : 'password'}
        className={classNamess ?? className}
        onKeyDown={handleKeyDown}
        placeholder={placeHolder}
        data-toggle="tooltip"
        data-placement="top"
        title="Password must contain at least 1 letter and 1 number"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: `${label} is required.`,
          },
          minLength: {
            value: hideErrors ? 0 : minimLength,
            message: `${label} must be minimum ${minimLength ?? 8}.`,
          },
        })}
      />
      <span className={eyeiconstyle ?? 'password_show'} onClick={setType}>
        {!type ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
      </span>
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

PasswordField.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string.isRequired,
  eyeiconstyle: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeHolder: PropTypes.string,
  isRequired: PropTypes.bool,
  minimLength: PropTypes.number,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labeldarkstyle: PropTypes.string,
  classNamedark: PropTypes.string,
  hideErrors: PropTypes.bool,
};
PasswordField.defaultProps = {
  mandatory: false,
  isRequired: false,
  labeldarkstyle: null,
  classNamedark: null,
  label: 'Password',
  placeHolder: 'Password',
  minimLength: 8,
  hideErrors: false,
};
export default PasswordField;
