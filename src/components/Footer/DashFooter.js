import React, { useContext } from 'react';
import styles from './DashFooter.module.scss';
import { TableContext } from '../../contexts/tableContext';

export default function DashFooter() {
  const { bodyStyle } = useContext(TableContext);
  return (
    <div className={styles[bodyStyle]}>
      <div className="container" id={styles.footersection}>
        <div className="row" style={{ width: '100%' }}>
          <div className="col-8 mx-auto text-center ">
            <p className="mt-5 mb-3" id={styles.copyright}>
              Copyright©2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
