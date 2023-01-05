/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { TableContext } from '../../contexts/tableContext';
import styles from './Pagination.module.scss';

function Pagination({ paginationData, setPageNum }) {
  const { paginationStyle } = useContext(TableContext);
  const setPageNumber = (page, pageName) => () => {
    switch (pageName) {
      case 'next':
        setPageNum(page + 1);
        break;
      case 'previous':
        setPageNum(page - 1);
        break;
      case 'first':
        setPageNum(1);
        break;
      case 'last':
        setPageNum(paginationData.totalPages);
        break;
      default:
        setPageNum(1);
        break;
    }
  };
  return (
    <div className={styles.paginationright}>
      <div className="row">
        <div className="col-12">
          <button
            className={styles[paginationStyle]}
            id={styles.pagebtn}
            type="button"
            value="first"
            disabled={paginationData.page === 1}
            onClick={setPageNumber(paginationData.page, 'first')}
          >
            <FontAwesomeIcon icon={faAnglesLeft} className={styles[paginationStyle]} />
          </button>{' '}
          <button
            className={styles[paginationStyle]}
            id={styles.pagebtn}
            type="button"
            value="previous"
            disabled={paginationData.page <= 1}
            onClick={setPageNumber(paginationData.page, 'previous')}
          >
            <FontAwesomeIcon icon={faAngleLeft} className={styles[paginationStyle]} />
          </button>{' '}
          <button
            className={styles[paginationStyle]}
            id={styles.pagebtn}
            type="button"
            value="next"
            disabled={paginationData.page >= paginationData.totalPages}
            onClick={setPageNumber(paginationData.page, 'next')}
          >
            <FontAwesomeIcon icon={faAngleRight} className={styles[paginationStyle]} />
          </button>{' '}
          <button
            className={styles[paginationStyle]}
            id={styles.pagebtn}
            type="button"
            value="last"
            disabled={paginationData.page === paginationData.totalPages}
            onClick={setPageNumber(paginationData.page, 'last')}
          >
            <FontAwesomeIcon icon={faAnglesRight} className={styles[paginationStyle]} />
          </button>{' '}
          <span className={styles[paginationStyle]} id={styles.pagetext}>
            Page{' '}
            <strong>
              {paginationData.page} of {paginationData.totalPages}
            </strong>{' '}
          </span>
          <span className={styles[paginationStyle]} id={styles.pagetext}>
            | Total <strong>{paginationData.totalResult} Entries</strong>{' '}
          </span>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  paginationData: PropTypes.oneOfType([PropTypes.any]).isRequired,
  setPageNum: PropTypes.func.isRequired,
};
export default Pagination;
