import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

function SelectBox({
  label,
  name,
  values = [],
  control,
  placeholder,
  labelstyle,
  defaultvalue,
  mandatory,
  errors,
}) {
  const options = values.map((value) => ({
    label: value.label,
    value: value.value,
  }));
  const colorStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: '14px',
      border: '1px solid #ced4da',
      padding: '3px',
      color: '#60677e !important',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: '14px',
      color: '#60677e',
    }),
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#151521',
      // match with the menu
      borderRadius: state.isFocused ? '5px' : 5,
      border: 'none',
      padding: '3px',
      color: '#60677e !important',
      fontSize: '14px',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: '14px',
      color: '#60677e',
    }),
  };
  let classNamess = colorStyles;

  if (localStorage.getItem('theme') === 'dark') {
    classNamess = customStyles;
  } else {
    classNamess = colorStyles;
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
    <div>
      <label className={labelstyle} htmlFor={name}>
        {label ?? 'SelectBox'}
      </label>
      {mandatory ? <span style={{ color: 'red', marginLeft: '3px' }}>*</span> : <span />}
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: true,
            message: `${label} is required`,
          },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            styles={classNamess}
            options={options}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'Choose...'}
            onChange={onChange}
            onBlur={onBlur}
            value={options.find((c) => c.value === value)}
            defaultValue={options.find((c) => c.value === defaultvalue)}
          />
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
    </div>
  );
}

SelectBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  values: PropTypes.oneOfType([PropTypes.array]).isRequired,
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string,
  labelstyle: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  defaultvalue: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

SelectBox.defaultProps = {
  defaultvalue: '0',
  label: 'SelectBox',
  placeholder: 'Please Select',
  mandatory: false,
};

SelectBox.defaultValue = {
  mandatory: false,
};

export default SelectBox;
