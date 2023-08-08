/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chat } from 'bubble-chat-web';
// import { useSelector } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
// import ProfilePic from '../components/profilePicture/profilePicComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';
import styles from './chatContainer.module.scss';
import envValues from '../../enviornment';

const profile = `${getCookies('PROFILE')}`;

function chatContainer() {
  //   const params = useParams();
  // const navigate = useNavigate();
  const [cond, setCond] = useState(false);
  const { bodyStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { dashboardStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { viewformStyle } = useContext(TableContext);
  const { settingsgeneralSetStyle, settingsapiSetStyle } = useContext(TableContext);
  const userId = `${getCookies('USERID')}`;
  const token = `Bearer ${getCookies('Token')}`;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [roles, setRole] = useState([]);
  const [customStyle, setCustomStyle] = useState({
    primaryColor: '#39979d',
    secondaryColor: '#257176',
    chat_border_radius: '8px',
    chat_padding: '10px',
    icom_chat_color: '#ebebeb',
  });
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: 'AIzaSyDoVlrAIxZOzfUSeAyffbggI47oor3UhLo',

    authDomain: 'bubblechat-49050.firebaseapp.com',

    databaseURL: 'https://bubblechat-49050-default-rtdb.firebaseio.com',

    projectId: 'bubblechat-49050',

    storageBucket: 'bubblechat-49050.appspot.com',

    messagingSenderId: '788327314469',

    appId: '1:788327314469:web:352ed04c771d0fcaa0fbcc',

    measurementId: 'G-VKB15SJ1LP',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setDashboardHeader('Chat');
    settingsgeneralSetStyle('settingsgeneral');
    settingsapiSetStyle('settingslinks');
  }, []);
  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '180px', color: '#7a68c2' }}>
          <SpinnerDotted style={{ color: '#39979d' }} />
        </div>
      ) : (
        <div className={styles[bodyStyle]}>
          <div
            className={styles[dashboardStyle]}
            style={{ height: '100vh' }}
            id={styles.dashboardcont2}
          >
            <div>
              <Chat
                firebaseConfig={firebaseConfig}
                conditional_listing={cond}
                styles={customStyle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default chatContainer;
