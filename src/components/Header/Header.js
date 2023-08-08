/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Dropdown from 'react-bootstrap/Dropdown';
// import { firebaseDataFetch } from 'flamingo-firebase-frontend';
import { TableContext } from '../../contexts/tableContext';
import DarkMode from '../DarkMode';
import styles from './Header.module.scss';
import { getCookies, removeCookies } from '../../hooks/useCookies';
import { CapitalizeFirstLetter } from '../../utilityFunctions/utilsFunctions';
import notification from '../../assets/notification.svg';
import notifyprofile from '../../assets/profile_pic2.png';
import { joinSocketRoom } from '../../utilityFunctions/socketUtility';
import envValues from '../../enviornment';

function Header() {
  const { dashboardStyle } = useContext(TableContext);
  const { dashboardHeader } = useContext(TableContext);
  const { bodyheader } = useContext(TableContext);
  const { headerbgStyle } = useContext(TableContext);
  const { setNotificationUnreadCount, setUserMenus } = useContext(TableContext);
  const token = `Bearer ${getCookies('Token')}`;
  const [notifications, setDetails] = useState([]);
  const [notificationCountDisplay, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  // const { notificationCount } = useContext(TableContext);
  // const notificationCount = getCookies('UNREADNOTIFICATIONCOUNT');

  // firebase
  // const firebaseData = {
  //   config: envValues.FIREBASE_CONFIG,
  //   userId: getCookies('USERID'),
  //   collectionURL: envValues.COLLECTIONURL,
  // };
  // setInterval(() => {
  //   firebaseDataFetch(firebaseData).then((unreadNotification) => {
  //     setNotificationCount(unreadNotification.count);
  //   });
  // }, 2000);

  useEffect(() => {
    axios
      .get(`${envValues.REACT_APP_API_ENDPOINT}/notifications/getUserMenu`, {
        method: 'GET',
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.code === 200) {
          console.log('RES ::: ', res.data.data.userMenu);
          setUserMenus(res.data.data.userMenu);
        }
      })
      .catch((err) => err);

    axios
      .get(`${envValues.REACT_APP_API_ENDPOINT}/notifications/getUnreadNotificationCount`, {
        method: 'GET',
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.code === 200) {
          setNotificationUnreadCount(res.data.data.result);
        }
      })
      .catch((err) => err);
  }, []);

  const logOut = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure want to logout ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await removeCookies('Token');
            await removeCookies('refreshToken');
            navigate('/login');
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

  if (envValues.SOCKET_STATUS === 'ON') {
    const userId = getCookies('USERID');
    joinSocketRoom(userId);
  }

  const getNotifications = () => {
    axios
      .get(
        `${envValues.REACT_APP_API_ENDPOINT}/notifications?active=true&page=1&limit=5&sortBy=_id:desc`,
        {
          method: 'GET',
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res.data.code === 200) {
          setDetails(res.data.data.result.results);
        }
      })
      .catch((err) => err);
  };

  const navigateToView = (params) => {
    const section = params.type;
    const sectionId = params.type_id;
    navigate(`${section}/viewdetails/${sectionId}`);
  };

  const allNotifications = () => {
    navigate('notifications');
  };

  return (
    <div className={styles[headerbgStyle]}>
      <div className={styles[dashboardStyle]} id={styles.headermobile}>
        <div className={styles.header_nav}>
          <div className={styles.leftnav}>
            <h1 className={styles[bodyheader]} id={styles.dashboard_heading}>
              {dashboardHeader}
            </h1>
          </div>
          <div className={styles.rightnav}>
            <ul className="nav justify-content-end align-items-center" id={styles.ulnav}>
              <li className="nav-item" id={styles.nav_items}>
                <Dropdown>
                  <Dropdown.Toggle className={styles.notification_drop}>
                    <button type="button" className={styles.icon_button} onClick={getNotifications}>
                      <span className={styles.material_icons}>
                        <img src={notification} alt="" />
                      </span>
                      <span className={styles.icon_button_badge}>{notificationCountDisplay}</span>
                    </button>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="drop-pull-right" id={styles.notification_menu}>
                    <p onClick={allNotifications} className={styles.all_text}>
                      All
                    </p>
                    {notifications &&
                      notifications.map((noti) => (
                        <Dropdown.Item
                          onClick={() => {
                            navigateToView(noti);
                          }}
                          key={noti.id}
                        >
                          <div className={styles.notification_list}>
                            <div className={styles.profile_detail}>
                              <div className={styles.notify_profile}>
                                <img src={notifyprofile} alt="" />
                              </div>
                              <div>
                                <h6>{noti.type}</h6>
                                <p>{noti.message}</p>
                              </div>
                            </div>
                          </div>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item" id={styles.darkmodeleft}>
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
                    <ul className={styles.list_unstyled}>
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
    </div>
  );
}

export default Header;
