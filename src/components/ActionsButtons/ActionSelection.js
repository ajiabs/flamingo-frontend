import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TableContext } from '../../contexts/tableContext';

function ActionSelection({ data }) {
  const { setselection } = useContext(TableContext);
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    const datas = [];
    setChecked(!checked);
    const searchbale = data.id;
    datas.push(searchbale);
    setselection(datas.push(searchbale));
  };

  return (
    <div className="col ">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        data={data}
        className="filled-in"
        id="filled-in-box"
      />
    </div>
  );
}

ActionSelection.propTypes = {
  data: PropTypes.element.isRequired,
};
export default ActionSelection;
