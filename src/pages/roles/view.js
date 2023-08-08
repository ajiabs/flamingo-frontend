/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { getCookies } from '../../hooks/useCookies';
import { CapitalizeFirstLetter } from '../../utilityFunctions/utilsFunctions';
import { TableContext } from '../../contexts/tableContext';
import styles from './view.module.scss';
import envValues from '../../enviornment';

const ViewEmployee = React.memo(() => {
  const params = useParams();
  const { dashboardStyle } = useContext(TableContext);
  const { setDashboardHeader } = useContext(TableContext);
  const { bodyStyle } = useContext(TableContext);
  const { formthemeStyle, permissionboxStyle } = useContext(TableContext);
  const { viewformStyle } = useContext(TableContext);
  const { bodyheader } = useContext(TableContext);
  // const { viewformStyle } = useContext(TableContext);
  let RoleId;
  RoleId = params.roleId;

  const token = `Bearer ${getCookies('Token')}`;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  let statusCode;
  const getUserDetails = async () => {
    RoleId = params.roleId;
    setLoading(true);
    axios
      .get(`${envValues.REACT_APP_API_ENDPOINT}/roles/${RoleId}`, {
        method: 'GET',
        headers: { Authorization: token },
      })
      .then((resp) => {
        statusCode = resp.status;
        return resp;
      })
      .then((res) => {
        if (statusCode === 200) {
          setDetails(res.data.data.response.result);
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
    RoleId = params.roleId;
    getUserDetails();
    setDashboardHeader('Role Details');
  }, []);
  return (
    <div className={styles[bodyStyle]}>
      <div
        className={styles[dashboardStyle]}
        style={{ minHeight: '100vh' }}
        id={styles.dashboardcont2}
      >
        <div className={styles[formthemeStyle]} id={styles.addform}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            value="Back"
            onClick={() => {
              navigate(-1);
            }}
            className={styles.arrowback}
          />
          {loading ? (
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
                      {/* <Col lg={6}>
                        <div className={styles[viewformStyle]} id={styles.empdiv}>
                          <span className={styles.title}>Status</span>
                          <p className={styles.empname}>{details.status ? 'Active' : 'InActive'}</p>
                        </div>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col lg={6} md={12}>
                        <span className={styles.content_title}>Permissions</span>
                        {details.permissions &&
                          details.permissions.map((item) => (
                            <div className={styles[permissionboxStyle]} id={styles.permissionbox}>
                              <h5 className={styles[bodyheader]} id={styles.addheading}>
                                {CapitalizeFirstLetter(item.section)}
                              </h5>
                              <div>
                                {Object.keys(item).map(
                                  (act, index) =>
                                    act !== 'section' &&
                                    act !== 'list' && (
                                      <div key={act}>
                                        {act === 'submenu' ? (
                                          item.submenu.map((subitem) => (
                                            <div className="mt-3">
                                              <h5
                                                className={styles[bodyheader]}
                                                id={styles.addheading}
                                              >
                                                {CapitalizeFirstLetter('submenu')}
                                              </h5>
                                              <div
                                                className={styles[permissionboxStyle]}
                                                id={styles.permissionbox}
                                              >
                                                <h5
                                                  className={styles[bodyheader]}
                                                  id={styles.addheading}
                                                >
                                                  {CapitalizeFirstLetter(subitem.section)}
                                                </h5>
                                                <ul>
                                                  {Object.keys(subitem).map(
                                                    (subAct, subIndex) =>
                                                      subAct !== 'section' &&
                                                      subAct !== 'list' && (
                                                        <li key={subAct}>
                                                          <div>
                                                            <div>
                                                              <label
                                                                htmlFor={`custom-checkbox-${subIndex}`}
                                                                className={styles.selectlabel}
                                                              >
                                                                {subAct !== 'list' ? subAct : ''}
                                                              </label>
                                                              <span className={styles.checkicon}>
                                                                {subitem[subAct] ? (
                                                                  <FontAwesomeIcon
                                                                    icon={faCheckCircle}
                                                                  />
                                                                ) : (
                                                                  <FontAwesomeIcon
                                                                    icon={faXmarkCircle}
                                                                  />
                                                                )}
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </li>
                                                      )
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          ))
                                        ) : (
                                          <div>
                                            <div>
                                              <label
                                                htmlFor={`custom-checkbox-${index}`}
                                                className={styles.selectlabel}
                                              >
                                                {act !== 'list' ? act : ''}
                                              </label>
                                              <span className={styles.checkicon}>
                                                {item[act] ? (
                                                  <FontAwesomeIcon icon={faCheckCircle} />
                                                ) : (
                                                  <FontAwesomeIcon icon={faXmarkCircle} />
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          ))}
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

export default ViewEmployee;
