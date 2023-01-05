import React from 'react';
import PropTypes from 'prop-types';

function RadioButtonField({ checked, label, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="name">{label ?? 'Radio Button'}</label>
      <input type="radio" name="address" value={value} checked={checked} onChange={onChange} />
      <br />
    </div>
  );
}
RadioButtonField.propTypes = {
  label: PropTypes.element.isRequired,
  checked: PropTypes.element.isRequired,
  value: PropTypes.element.isRequired,
  onChange: PropTypes.element.isRequired,
};
export default RadioButtonField;

// const FeatureList = ({ features, onClickFeature, onClickLikes }) => (
//     <div className="feature-list">
//       {features.map(feature =>
//         <Feature
//           key={feature.id}
//           {...feature}
//           onClickFeature={() => onClickFeature(feature.id)}
//           onClickLikes={() => onClickLikes(feature.id)}
//         />
//       )}
//     </div>
//   );
