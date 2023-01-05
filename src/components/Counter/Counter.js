/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Counter.module.scss';

function Counter({ text, count, cardstyle, cardicon, className, url }) {
  return (
    <li className={cardstyle ?? styles.cardbox1} id={className}>
      <Link to={url} className={styles.card_body}>
        <h6 className={styles.card_title}>
          <Link to={url} className={styles.links_items}>
            {text}
          </Link>
        </h6>
        <p className={styles.card_para}>
          <FontAwesomeIcon icon={cardicon ?? faBookOpenReader} className={styles.countericon} />
          {count}
        </p>
      </Link>
    </li>
  );
}

Counter.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.any]).isRequired,
  cardstyle: PropTypes.string.isRequired,
  cardicon: PropTypes.oneOfType([PropTypes.object]).isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string,
};
Counter.defaultProps = {
  url: '',
};

export default Counter;
