/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { TableContext } from '../../contexts/tableContext';
import DarkMode from '../DarkMode';
import styles from './Header.module.scss';
import { getCookies, removeCookies } from '../../hooks/useCookies';
import { CapitalizeFirstLetter } from '../../utilityFunctions/utilsFunctions';

function Header() {
  const { dashboardStyle } = useContext(TableContext);
  const { dashboardHeader } = useContext(TableContext);
  const { bodyheader } = useContext(TableContext);
  const { headerbgStyle } = useContext(TableContext);
  const logOut = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure want to logout ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            removeCookies('Token');
            removeCookies('refreshToken');
            window.location.href = '/login';
            // return false;
          },
        },
        {
          label: 'No',
          // onClick: () => alert("Click No")
        },
      ],
    });
  };
  const userName = getCookies('USERNAME')
    ? CapitalizeFirstLetter(getCookies('USERNAME'))
    : 'Username';
  const userRole = getCookies('USERROLE') ? CapitalizeFirstLetter(getCookies('USERROLE')) : 'Role';
  const profileImage = getCookies('PROFILE');
  return (
    <div className={styles[headerbgStyle]}>
      <div className={styles[dashboardStyle]} id={styles.headermobile}>
        <div className={styles.leftnav}>
          <h1 className={styles[bodyheader]} id={styles.dashboard_heading}>
            {dashboardHeader}
          </h1>
        </div>
        <div className={styles.rightnav}>
          <ul className="nav justify-content-end" id={styles.ulnav}>
            <li className="nav-item" id={styles.darkmodeleft} style={{ marginRight: '10px' }}>
              <DarkMode />
            </li>
            <li className="nav-item dropdown" id={styles.dropdown}>
              <a
                className="rounded-circle "
                href="#!"
                role="button"
                id="dropdownUser"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div
                  className={` ${styles.avatar} ${styles.avatar_md} ${styles.avatar_indicators} ${styles.avatar_online}`}
                >
                  <Image src={profileImage} alt="logo" className={styles.profilepic} />
                </div>
              </a>

              <div
                className="dropdown-menu pb-2"
                aria-labelledby="dropdownUser"
                id={styles.dropdown_menu}
              >
                <div className="dropdown-item">
                  <div className="d-flex py-2">
                    <div
                      className={` ${styles.avatar} ${styles.avatar_md} ${styles.avatar_indicators} ${styles.avatar_online}`}
                    >
                      <Image src={profileImage} alt="logo" className={styles.profilepic} />
                    </div>
                    <div className="ml-3 lh-1">
                      <h5 className={styles.profilename}>{userName}</h5>
                      <p className={styles.profilerole}>{userRole}</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <div className="">
                  <ul className="list-unstyled">
                    {/* <li className="dropdown-submenu dropright-lg" id={styles.dropdown_submenu}>
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        id={styles.dropdown_toggle}
                        href="#!"
                      >
                        Status
                      </a>
                      <ul className="dropdown-menu" id={styles.dropdown_menu}>
                        <li>
                          <a className="dropdown-item text-success" href="#!">
                            Online
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-black-50" href="#!">
                            Offline
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-info" href="#!">
                            Away
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-danger" href="#!">
                            Busy
                          </a>
                        </li>
                      </ul>
                    </li> */}
                    <li>
                      <Link
                        data-tooltip="Profile"
                        className="dropdown-item"
                        id={styles.droplink}
                        to="/profile"
                      >
                        {' '}
                        Profile{' '}
                      </Link>
                    </li>
                    <li>
                      <Link
                        data-tooltip="Settings"
                        className="dropdown-item"
                        id={styles.droplink}
                        to="/settings"
                      >
                        {' '}
                        Settings{' '}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown-divider" />
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="dropdown-item"
                      id={styles.droplink}
                      onClick={logOut}
                      onKeyPress={logOut}
                    >
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* <li className="nav-item">
              <span className={styles[bodyheader]} id={styles.profilename}>
                {userName}
              </span>
              <br />
              <p className={styles.profilerole}>{userRole}</p>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
