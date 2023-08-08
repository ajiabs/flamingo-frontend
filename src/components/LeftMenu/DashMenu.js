/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Nav, Image, NavDropdown } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faRightFromBracket,
  faHome,
  faBuilding,
  faGraduationCap,
  faUserGroup,
  faNewspaper,
  faMessage,
  faBars,
  faAddressCard,
  faFlag,
  faTable,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import * as Icons from 'react-icons/fa';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { MDBTooltip } from 'mdb-react-ui-kit';
import styles from './DashMenu.module.scss';
import { TableContext } from '../../contexts/tableContext';
import { removeCookies, getCookies } from '../../hooks/useCookies';

/* Your icon name from database data can now be passed as prop */
// eslint-disable-next-line react/prop-types
function DynamicFaIcon({ name }) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Return a default one
    return <Icons.FaBeer />;
  }

  return <IconComponent />;
}

function Menu() {
  const [isOpen, setIsOpen] = useState(window.innerWidth < 600);
  const navigate = useNavigate();
  const { logo } = getCookies('SITE_SETTINGS');
  const { dashboardSetStyle, userMenus } = useContext(TableContext);
  const { leftmenuStyle, leftmenulinkSelected } = useContext(TableContext);
  const { leftmenulinks } = useContext(TableContext);
  const changeStyle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      dashboardSetStyle('dashboard');
    } else {
      dashboardSetStyle('cont2');
    }
  };
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const siteSettings = isJsonString(getCookies('SITE_SETTINGS'))
    ? JSON.parse(getCookies('SITE_SETTINGS'))
    : getCookies('SITE_SETTINGS');
  const menus = [];
  // if (getCookies('USERMENU')) {
  //   getCookies('USERMENU').forEach((ele) => menus.push(ele));
  // }
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
  return (
    <div
      style={{ width: isOpen ? '50px' : '200px' }}
      id={styles.sidebar}
      className={styles[leftmenuStyle]}
    >
      <div className={styles.logo}>
        <Link
          to="/dashboard"
          style={{ display: isOpen ? 'none' : 'block' }}
          className={styles[leftmenulinks]}
          id={styles.logoname}
        >
          <Image src={logo} alt="logo" width={100} className={styles.logo} />
        </Link>
        <div className={styles.togglebar} style={{ marginLeft: isOpen ? '10px' : '150px' }}>
          <FontAwesomeIcon
            onClick={changeStyle}
            icon={faBars}
            className="navbar-toggle collapsed"
            id={styles.sidemenubtn}
          />
        </div>
      </div>
      <div className={styles.navlist}>
        {userMenus.map((item) => (
          <Nav
            as="ul"
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            {item.subMenu ? (
              <li>
                <Link
                  to={`#${item.modules}`}
                  data-bs-toggle="collapse"
                  className={styles[leftmenulinks]}
                  id={styles.linksname}
                >
                  <MDBTooltip tag="a" title={item.name} className={styles.dynamicicon}>
                    <DynamicFaIcon name={`${item.icon}`} />
                  </MDBTooltip>
                  <span className="d-sm-inline">
                    {item.name} <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                  </span>{' '}
                </Link>
                <div className={styles.submenu_list}>
                  <ul
                    className="collapse hide nav flex-column ms-1"
                    id={item.modules}
                    data-bs-parent="#menu"
                  >
                    {item.subMenu.map((subItem, index) => (
                      <li className="w-100">
                        <Link to={subItem.urlPath} className={styles[leftmenulinks]}>
                          <span className="d-sm-inline">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li>
                <Link
                  data-tooltip={item.name}
                  to={item.urlPath}
                  id={styles.linksname}
                  className={
                    window.location.pathname === item.urlPath
                      ? styles[leftmenulinkSelected]
                      : styles[leftmenulinks]
                  }
                >
                  <MDBTooltip tag="a" title={item.name} className={styles.dynamicicon}>
                    <DynamicFaIcon name={`${item.icon}`} />
                  </MDBTooltip>
                  <span style={{ display: isOpen ? 'none' : 'block' }}>{item.name}</span>
                </Link>
              </li>
            )}
          </Nav>
        ))}
      </div>
      <div className={styles.settingslogout}>
        <Nav as="ul" className={styles.navlist1}>
          <Nav.Item as="li" key="Chat">
            <Link
              data-tooltip="Chat"
              to="/chat"
              id={styles.linksname}
              className={
                window.location.pathname === '/chat'
                  ? styles[leftmenulinkSelected]
                  : styles[leftmenulinks]
              }
            >
              <MDBTooltip tag="a" title="Chat" className={styles.dynamicicon}>
                <FontAwesomeIcon icon={faComments} style={{ width: '16px', height: '16px' }} />
              </MDBTooltip>
              <span style={{ display: isOpen ? 'none' : 'block' }}>Chat</span>
            </Link>
          </Nav.Item>
          <Nav.Item as="li" key="Settings">
            <Link
              data-tooltip="Settings"
              to="/settings"
              id={styles.linksname}
              className={
                window.location.pathname === '/settings'
                  ? styles[leftmenulinkSelected]
                  : styles[leftmenulinks]
              }
            >
              <MDBTooltip tag="a" title="Settings" className={styles.dynamicicon}>
                <FontAwesomeIcon icon={faGear} className={styles.sidemenuicon} />
              </MDBTooltip>
              <span style={{ display: isOpen ? 'none' : 'block' }}>Settings</span>
            </Link>
          </Nav.Item>
          <Nav.Item as="li" key="Logout">
            <p data-tooltip="Logout" id={styles.linksname} className={styles[leftmenulinks]}>
              <MDBTooltip tag="a" title="Logout" className={styles.dynamicicon}>
                <FontAwesomeIcon icon={faRightFromBracket} className={styles.sidemenuicon} />
              </MDBTooltip>
              <span
                onClick={logOut}
                onKeyPress={logOut}
                role="button"
                tabIndex="0"
                style={{ display: isOpen ? 'none' : 'block' }}
                className={styles.linksname}
              >
                Logout
              </span>
            </p>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
export default Menu;
