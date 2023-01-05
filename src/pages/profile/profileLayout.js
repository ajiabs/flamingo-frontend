import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import { TableContext } from '../../contexts/tableContext';

import styles from './profilepage.module.scss';

function ProfileLayout() {
  const { dashboardStyle } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { settingsgeneralStyle } = useContext(TableContext);
  const { settingsapiStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);

  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
        id={styles.dashboardcont2}
      >
        <div className={styles.settingsection}>
          <div>
            <Nav as="ul" className={styles[formthemeStyle]} id={styles.layoutnav}>
              <Nav.Item as="li">
                <Link to="/profile" className={styles[settingsgeneralStyle]}>
                  Profile
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/changePassword" className={styles[settingsapiStyle]}>
                  Change Password
                </Link>
              </Nav.Item>
            </Nav>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
