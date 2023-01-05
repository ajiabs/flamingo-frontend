import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TableContext } from '../../contexts/tableContext';

function CheckBoxGroup({ checkname, actions, length }) {
  const { checkedState, setAction, setCheckedState } = useContext(TableContext);
  setAction(length);
  const handleOnChange = (position) => {
    // eslint-disable-next-line max-len
    const updatedCheckedState = checkedState.map((item, indexed) =>
      indexed === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  return (
    <div>
      <h4>{checkname}</h4>
      <ul>
        {actions.map(({ name }, index) => (
          <li>
            <div>
              <div>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  onChange={() => handleOnChange(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
CheckBoxGroup.propTypes = {
  checkname: PropTypes.element.isRequired,
  actions: PropTypes.element.isRequired,
  length: PropTypes.element.isRequired,
};
export default CheckBoxGroup;
