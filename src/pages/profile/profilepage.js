/* eslint-disable global-require */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
// import ProfilePic from '../components/profilePicture/profilePicComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { TableContext } from '../../contexts/tableContext';
import { getCookies } from '../../hooks/useCookies';
import styles from './profilepage.module.scss';
import envValues from '../../enviornment';

const profile = `${getCookies('PROFILE')}`;

function ProfilePage() {
  //   const params = useParams();
  // const navigate = useNavigate();
  const { bodyStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { viewformStyle } = useContext(TableContext);
  const { settingsgeneralSetStyle, settingsapiSetStyle } = useContext(TableContext);
  const userId = `${getCookies('USERID')}`;
  const token = `Bearer ${getCookies('Token')}`;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [roles, setRole] = useState([]);
  let statusCode;
  const getUserDetails = async () => {
    setLoading(true);
    axios
      .get(`${envValues.REACT_APP_API_ENDPOINT}/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: token },
      })
      .then((resp) => {
        statusCode = resp.status;
        return resp;
      })
      .then((res) => {
        if (statusCode === 200) {
          setDetails(res.data.data.user);
          setRole(res.data.data.user.role);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserDetails();
    setDashboardHeader('Profile');
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
          <div className={styles[formthemeStyle]} id={styles.addform}>
            <Container fluid>
              <Row>
                <Col xl={10} lg={8} md={12} sm={12}>
                  <div className={styles.profilepicdiv}>
                    <Image src={profile} alt="logo" className={styles.profilepic} />
                  </div>
                </Col>
                <Col xl={2} lg={4} md={12} sm={12}>
                  <div className={styles.editbtntop}>
                    <a href="/profile-edit" className={styles.profileedit}>
                      <FontAwesomeIcon icon={faPenToSquare} className={styles.penicon} />
                      Edit Profile
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={4} md={6}>
                  <div className={styles[viewformStyle]} id={styles.empdiv}>
                    <span className={styles.title}>Name</span>
                    <p className={styles.empname}>{details.name}</p>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles[viewformStyle]} id={styles.empdiv}>
                    <span className={styles.title}>Email</span>
                    <p className={styles.empname}>{details.email}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={6}>
                  <div className={styles[viewformStyle]} id={styles.empdiv}>
                    <span className={styles.title}>Phone Number</span>
                    <p className={styles.empname}>{details.phone}</p>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={styles[viewformStyle]} id={styles.empdiv}>
                    <span className={styles.title}>Role</span>
                    <p className={styles.empname}>{roles.name}</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
