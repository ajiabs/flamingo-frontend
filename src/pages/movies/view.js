/* eslint-disable react/function-component-definition */
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
import styles from './view.module.scss';
import envValues from '../../enviornment';

const ViewMovies = React.memo(() => {
  const navigate = useNavigate();
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle } = useContext(TableContext);
  const { viewformStyle } = useContext(TableContext);
  let userId;
  const params = useParams();
  const token = `Bearer ${getCookies('Token')}`;
  const [details, setDetails] = useState({ loading: true, data: [] });
  // const [loading, setLoading] = useState(false);
  // const [details, setDetails] = useState([]);
  let statusCode;
  const getUserDetails = async () => {
    // setLoading(true);
    axios
      .get(`${envValues.REACT_APP_API_ENDPOINT}/movies/${userId}`, {
        method: 'GET',
        headers: { Authorization: token },
      })
      .then((resp) => {
        statusCode = resp.status;
        return resp;
      })
      .then((res) => {
        if (statusCode === 200) {
          setDetails({ loading: false, data: res.data.data.user });
          // setDetails(res.data.data.user);
          // setLoading(false);
        } else {
          setDetails({ loading: false });
          // setLoading(false);
        }
      })
      .catch((err) => {
        // setLoading(false);
        setDetails({ loading: false });
        return err;
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    userId = params.userId;
    getUserDetails();
    setDashboardHeader('Movie Details');
  }, []);
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ height: '100vh' }}
        id={styles.dashboardcont2}
      >
        <div className={styles[formthemeStyle]} id={styles.empdetailssection}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            value="Back"
            onClick={() => {
              navigate(-1);
            }}
            className={styles.arrowback}
          />
          {details.loading ? (
            <SpinnerDotted
              style={{
                left: '50%',
                position: 'relative',
                textAlign: 'center',
                top: '50%',
                color: '#39979d',
              }}
            />
          ) : (
            <Container fluid>
              <Row>
                <Col lg={12}>
                  <div className={styles.profilepicdiv}>
                    <Image
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt="logo"
                      className={styles.profilepic}
                    />
                    <div className={styles.namesection}>
                      <span className={styles.profilename}>{details.data.name}</span>
                      <p className={styles.profileemail}>{details.data.email}</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <div className={styles.detaildiv}>
                    <Row>
                      <Col lg={6}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Name</span>
                          <p className={styles.empname}>{details.data.name}</p>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Description</span>
                          <p className={styles.empname}>{details.data.description}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Year</span>
                          <p className={styles.empname}>{details.data.year}</p>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Others</span>
                          <p className={styles.empname}>{details.data.others}</p>
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
});

export default ViewMovies;
