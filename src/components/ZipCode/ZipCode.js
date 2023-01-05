import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line max-len
function ZipCode({
  fieldName,
  className,
  labelstyle,
  register,
  errors,
  placeHolder,
  isRequired,
  maximLength = 5,
  minimLength,
  RegularExp,
  label,
  mandatory,
}) {
  const [textAreaCount, ChangeTextAreaCount] = React.useState(0);
  return (
    <div className="form-group">
      <label htmlFor={fieldName} className={labelstyle}>
        {label ?? 'ZipCode'}
      </label>
      {mandatory ? <span style={{ color: 'red' }}>*</span> : <span />}
      <input
        onKeyPress={(event) => {
          if (!/^[0-9 -+]+$/.test(event.key)) {
            event.preventDefault();
          }
        }}
        placeholder={placeHolder}
        className={className}
        maxLength={maximLength}
        onChange={fieldName.onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(fieldName, {
          onChange: (e) => {
            ChangeTextAreaCount(e.target.value.length);
          },
          pattern: {
            value: RegularExp ?? /^\d{5}(?:-?\d{4})?$/,
            message: 'Please Enter a valid Zipcode!',
          },
          required: {
            value: isRequired,
            message: `${fieldName} is required`,
          },
          maxLength: {
            value: maximLength,
            message: `${fieldName} must be maximum ${maximLength}`,
          },
          minLength: {
            value: minimLength,
            message: `${fieldName} must be minimum ${minimLength}`,
          },
        })}
      />
      <p style={{ float: 'right', fontSize: '12px' }}>
        {'Characters Left : '}
        {maximLength - textAreaCount}
      </p>
      <p style={{ color: 'red', margintop: '5px' }}>
        {' '}
        {
          // Shows if error exist
          errors[fieldName] && errors[fieldName].message
        }{' '}
      </p>
    </div>
  );
}

ZipCode.propTypes = {
  fieldName: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  register: PropTypes.element.isRequired,
  errors: PropTypes.element.isRequired,
  placeHolder: PropTypes.element.isRequired,
  isRequired: PropTypes.element,
  maximLength: PropTypes.element,
  minimLength: PropTypes.element,
  onchange: PropTypes.element.isRequired,
  label: PropTypes.element.isRequired,
  RegularExp: PropTypes.element.isRequired,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.string,
};
ZipCode.defaultProps = {
  mandatory: false,
  isRequired: false,
  maximLength: 20,
  minimLength: 1,
};
export default ZipCode;
