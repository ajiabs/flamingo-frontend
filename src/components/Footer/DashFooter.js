import React, { useContext } from 'react';
import styles from './DashFooter.module.scss';
import { TableContext } from '../../contexts/tableContext';

export default function DashFooter() {
  const { bodyStyle } = useContext(TableContext);
  return (
    <div className={styles[bodyStyle]}>
      <div className="container" id={styles.footersection}>
        <div className="row">
          <div className="col-8 mx-auto text-center ">
            <p className="mt-3 mb-3" id={styles.copyright}>
              Copyright©2022
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
