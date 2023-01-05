import React from 'react';
import PropTypes from 'prop-types';
import SelectMultiple from 'react-select';
import { Controller } from 'react-hook-form';

function MultiSelect({
  label,
  name,
  values = [],
  control,
  placeholder,
  labelstyle,
  errors,
  mandatory,
}) {
  const options = values.map((value) => ({
    label: value.label,
    value: value.value,
  }));
  const colorStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: '14px',
      background: '#dde2eb63',
      border: 'none',
      padding: '3px',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: '14px',
      color: 'rgb(186 191 199)',
    }),
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'rgba(96, 125, 139, 0.54)',
      // match with the menu
      borderRadius: state.isFocused ? '5px' : 5,
      border: 'none',
      padding: '3px',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: '14px',
      color: '#858585',
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
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
        {label ?? 'Multi Select'}
      </label>
      {mandatory ? <span style={{ color: 'red' }}>*</span> : <span />}
      <Controller
        name={name}
        rules={{
          required: {
            value: true,
            message: `${name} is required`,
          },
        }}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <SelectMultiple
            styles={classNamess}
            options={options}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'choose.'}
            isMulti
            // eslint-disable-next-line no-shadow
            onChange={(options) => onChange(options?.map((option) => option.value))}
            onBlur={onBlur}
            value={options.filter((option) => value?.includes(option.value))}
            defaultValue={options.filter((option) => value?.includes(option.value))}
          />
        )}
      />
      {errors[name] && <p style={{ color: 'red', margintop: '5px' }}>Choose at least one </p>}
    </div>
  );
}

MultiSelect.defaultProps = {
  placeholder: 'Choose...',
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  labelstyle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.PropTypes.oneOfType([PropTypes.any]),
  control: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string,
  mandatory: PropTypes.bool,
};
MultiSelect.defaultProps = {
  mandatory: false,
  label: 'Multiple Select',
  values: [],
};
export default MultiSelect;
