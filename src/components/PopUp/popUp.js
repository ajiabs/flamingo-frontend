import React from 'react';
import PropTypes from 'prop-types';
import './popUpStyle.css';

function PopUp({ content, handleClose }) {
  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="close-icon"
          role="button"
          tabIndex={0}
          onClick={handleClose}
          onKeyPress={handleClose}
        >
          x
        </span>
        {content}
      </div>
    </div>
  );
}

PopUp.propTypes = {
  content: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default PopUp;
