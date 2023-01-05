import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import { TableContext } from '../../contexts/tableContext';
import styles from './settings.module.scss';

function SettingsLayout() {
  const { dashboardStyle, formthemeStyle } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { settingsgeneralStyle } = useContext(TableContext);
  const { settingsapiStyle } = useContext(TableContext);
  const { settingsprefStyle } = useContext(TableContext);

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
              <Nav.Item as="li" className={styles.navitemli}>
                <Link to="/settings" className={styles[settingsgeneralStyle]}>
                  General
                </Link>
              </Nav.Item>
              <Nav.Item as="li" className={styles.navitemli}>
                <Link to="/api" className={styles[settingsapiStyle]}>
                  API
                </Link>
              </Nav.Item>
              <Nav.Item as="li" className={styles.navitemli}>
                <Link to="/preferences" className={styles[settingsprefStyle]}>
                  Preferences
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

export default SettingsLayout;
