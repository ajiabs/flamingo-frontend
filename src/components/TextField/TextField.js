/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line max-len
function TextInput({
  fieldName,
  className,
  labelstyle,
  labeldarkstyle,
  classNamedark,
  register,
  errors,
  placeHolder,
  isRequired,
  maximLength = 200,
  minimLength,
  RegularExp,
  label,
  mandatory,
  charactersOnly,
  readOnly,
  resetCount,
  id,
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
  const [textAreaCount, ChangeTextAreaCount] = React.useState(0);
  useEffect(() => {
    if (resetCount) {
      ChangeTextAreaCount(0);
    }
  }, [resetCount]);
  return (
    <div className="form-group">
      <label htmlFor={fieldName} className={classNames ?? labelstyle}>
        {label ?? ''}
      </label>
      {mandatory || isRequired ? <span style={{ color: 'red' }}>*</span> : <span />}
      <input
        onKeyPress={(event) => {
          if (charactersOnly) {
            if (!/^[a-zA-Z ]*$/.test(event.key)) {
              event.preventDefault();
            }
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeHolder}
        readOnly={readOnly}
        className={classNamess ?? className}
        maxLength={maximLength}
        onChange={fieldName.onChange}
        onBlur={fieldName.onBlur}
        id={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName, {
          onChange: (e) => {
            ChangeTextAreaCount(e.target.value.length);
          },
          onBlur: (event) => {
            event.target.value = event.target.value.trim();
          },
          // onPaste: { handleChangeWhiteSpace },
          pattern: {
            value: RegularExp ?? /^[a-zA-Z ]*$/,
            message: 'Only Characters allowed!',
          },
          required: {
            value: isRequired,
            message: `${label} is required.`,
          },
          maxLength: {
            value: maximLength,
            message: `${label} must be maximum ${maximLength}.`,
          },
          minLength: {
            value: minimLength,
            message: `${label} must be minimum ${minimLength}.`,
          },
        })}
      />
      {textAreaCount !== 0 && (
        <p style={{ float: 'right', fontSize: '12px' }}>
          {'Characters Left : '}
          {maximLength - textAreaCount}
        </p>
      )}
      {maximLength - textAreaCount === 0 ? (
        <span style={{ color: 'red' }}>Maximum length accepted is {maximLength}</span>
      ) : (
        <span />
      )}
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

TextInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  className: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeHolder: PropTypes.string,
  isRequired: PropTypes.bool.isRequired,
  maximLength: PropTypes.number,
  minimLength: PropTypes.number,
  label: PropTypes.string.isRequired,
  RegularExp: PropTypes.bool,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  charactersOnly: PropTypes.bool,
  labeldarkstyle: PropTypes.string,
  classNamedark: PropTypes.string,
  readOnly: PropTypes.bool,
  resetCount: PropTypes.bool,
  id: PropTypes.string,
};
TextInput.defaultProps = {
  mandatory: false,
  charactersOnly: false,
  RegularExp: false,
  minimLength: 1,
  maximLength: 20,
  classNamedark: null,
  labeldarkstyle: null,
  readOnly: false,
  className: 'default-input-class',
  placeHolder: 'Enter Value',
  resetCount: false,
  id: '',
};

export default TextInput;
