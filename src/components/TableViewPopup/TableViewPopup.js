/* eslint-disable react/function-component-definition */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import { SpinnerRoundFilled } from 'spinners-react';
import { getCookies } from '../../hooks/useCookies';
import { TableContext } from '../../contexts/tableContext';
import styles from './TableViewPopup.module.scss';
import { DateFormatter } from '../../utilityFunctions/utilsFunctions';
import envValues from '../../enviornment';

const TableViewPopup = React.memo(({ dataId, handleClose, section }) => {
  const { formthemeStyle } = useContext(TableContext);
  const { bodyheader } = useContext(TableContext);
  const { viewformStyle } = useContext(TableContext);
  const token = `Bearer ${getCookies('Token')}`;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [roles, setRole] = useState([]);
  const dateFormat = getCookies('dateFormat');
  let statusCode;
  const getUserDetails = async () => {
    setLoading(true);
    axios
      .get(`${envValues.REACT_APP_API_ENDPOINT}/${section}/${dataId}`, {
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
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className={styles.popupbox}>
      <div className={styles[formthemeStyle]} id={styles.box}>
        <span
          className={styles.closeicon}
          role="button"
          tabIndex={0}
          onClick={handleClose}
          onKeyPress={handleClose}
        >
          x
        </span>
        {loading ? (
          <SpinnerRoundFilled style={{ marginLeft: '50%' }} />
        ) : (
          <Container fluid>
            <div>
              <h5 className={styles[bodyheader]} id={styles.addheading}>
                Details
              </h5>
              <Row>
                <Col lg={3}>
                  <div className={styles.profilepicdiv}>
                    <div className={styles.profile_imgsection}>
                      <Image src={details.image} alt="logo" className={styles.profilepic} />
                    </div>
                    <div className={styles.namesection}>
                      <span className={styles[bodyheader]} id={styles.profilename}>
                        {details.name}
                      </span>
                      <p className={styles[bodyheader]} id={styles.profiledob}>
                        DOB:{' '}
                        {details.dateOfBirth
                          ? DateFormatter(details.dateOfBirth, dateFormat || 'toDateString')
                          : 'NA'}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={9}>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <div className={styles.detaildiv}>
                        <Row>
                          <Col lg={6}>
                            <div className={styles[viewformStyle]} id={styles.empdiv}>
                              <span className={styles.title}>Name</span>
                              <p className={styles.empname}>{details.name}</p>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className={styles[viewformStyle]} id={styles.empdiv}>
                              <span className={styles.title}>Email</span>
                              <p className={styles.empname}>{details.email}</p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className={styles[viewformStyle]} id={styles.empdiv}>
                              <span className={styles.title}>Phone Number</span>
                              <p className={styles.empname}>{details.phone}</p>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className={styles[viewformStyle]} id={styles.empdiv}>
                              <span className={styles.title}>Role</span>
                              <p className={styles.empname}>{roles.name}</p>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className={styles[viewformStyle]} id={styles.empdiv}>
                              <span className={styles.title}>Status</span>
                              <p className={styles.empname}>
                                {details.active ? 'Active' : 'InActive'}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
});

TableViewPopup.propTypes = {
  dataId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
};
export default TableViewPopup;
