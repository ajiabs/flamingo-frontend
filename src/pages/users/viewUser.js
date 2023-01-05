/* eslint-disable global-require */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { getCookies } from '../../hooks/useCookies';
import { TableContext } from '../../contexts/tableContext';
import styles from './viewUser.module.scss';
import { DateFormatter } from '../../utilityFunctions/utilsFunctions';
import envValues from '../../enviornment';

function ViewUsers() {
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { viewformStyle } = useContext(TableContext);
  const params = useParams();
  let userId;
  const token = `Bearer ${getCookies('Token')}`;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [roles, setRole] = useState([]);
  const dateFormat = getCookies('dateFormat');
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
        return resp.data;
      })
      .then((res) => {
        if (statusCode === 200) {
          setDetails(res.data.user);
          setRole(res.data.user.role);
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
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    userId = params.userId;
    getUserDetails();
    setDashboardHeader('User Details');
  }, []);
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
        id={styles.dashboardcont2}
      >
        <div className={styles[formthemeStyle]} id={styles.addform}>
          {loading ? (
            <SpinnerDotted
              style={{
                color: '#39979d',
                left: '50%',
                position: 'relative',
                textAlign: 'center',
                top: '50%',
              }}
            />
          ) : (
            <Container fluid>
              <FontAwesomeIcon
                icon={faArrowLeft}
                value="Back"
                onClick={() => {
                  navigate(-1);
                }}
                className={styles.arrowback}
              />
              <Row>
                <Col lg={12}>
                  <div className={styles.profilepicdiv}>
                    <Image src={details.image} alt="logo" className={styles.profilepic} />
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <div className={styles.detaildiv}>
                    <Row>
                      <Col lg={4}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Name</span>
                          <p className={styles.empname}>{details.name}</p>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Email</span>
                          <p className={styles.empname}>{details.email}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Phone Number</span>
                          <p className={styles.empname}>{details.phone}</p>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Role</span>
                          <p className={styles.empname}>{roles.name}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>DOB</span>
                          <p className={styles.empname}>
                            {details.dateOfBirth
                              ? DateFormatter(details.dateOfBirth, dateFormat || 'toDateString')
                              : 'NA'}
                          </p>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Status</span>
                          <p className={styles.empname}>{details.active ? 'Active' : 'InActive'}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;
