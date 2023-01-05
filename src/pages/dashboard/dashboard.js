/* eslint-disable no-plusplus */
import React, { Suspense, lazy, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
import { Link } from 'react-router-dom';
import { faBookOpenReader, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { REACT_APP_API_FETCH_USER } from '../../redux/apiConstants';
// import Menu from '../../components/LeftMenu/DashMenu';
import { Entry } from '../../redux/entrySlice';
import styles from './dashboard.module.scss';
import { TableContext } from '../../contexts/tableContext';
import { NumFormatter } from '../../utilityFunctions/utilsFunctions';

const Counter = lazy(() => import('../../components/Counter/Counter'));
const DoughnutChart = lazy(() => import('../../components/Chart/DoughnutChart'));
const BarChart = lazy(() => import('../../components/Chart/BarChart'));
const ChartFunction = lazy(() => import('../../components/Chart/Linechart'));
const AgGridTable = lazy(() => import('../../components/AgTable/AgGridTable'));

export default function Home() {
  const [graph, setGraph] = useState([]);
  const {
    dashboardStyle,
    setUrl,
    url,
    bodyStyle,
    graphbgStyle,
    card1bgStyle,
    card2bgStyle,
    card3bgStyle,
    card4bgStyle,
  } = useContext(TableContext);
  const [months, setMonths] = useState([]);
  const [usercount, setUserCount] = useState([]);
  const dispatch = useDispatch();
  const { setDashboardHeader } = useContext(TableContext);
  useEffect(() => {
    setDashboardHeader('Admin Dashboard');
    setUrl(REACT_APP_API_FETCH_USER);
    const actionData = {};
    actionData.actionUrl = 'dashboard';
    actionData.actionMethod = 'get';
    dispatch(Entry(actionData)).then((resp) => {
      const month = [];
      const data = [];
      for (let i = 0; i < resp.payload.length; i++) {
        month.push(resp.payload[i].month);
        data.push(resp.payload[i].count);
      }
      const count = resp.payload.map((item) => item.count).reduce((prev, curr) => prev + curr, 0);
      setGraph(data);
      setMonths(month);
      setUserCount(count);
    });
  }, []);
  return (
    <div className={styles[bodyStyle]}>
      <div className={styles[dashboardStyle]} id={styles.dashboardcont2}>
        <div>
          <ul className={styles.cardsection}>
            <Suspense
              fallback={
                <div>
                  <SpinnerDotted
                    style={{ marginTop: '20px', marginLeft: '120px', color: '#39979d' }}
                  />
                </div>
              }
            >
              <Counter
                className={styles[card1bgStyle]}
                cardstyle={styles.cardbox1}
                cardicon={faBookOpenReader}
                text="Users"
                count={NumFormatter(usercount)}
                url="/user"
              />
            </Suspense>
            <Suspense
              fallback={
                <div>
                  <SpinnerDotted
                    style={{ marginTop: '-70px', marginLeft: '420px', color: '#39979d' }}
                  />
                </div>
              }
            >
              <Counter
                className={styles[card2bgStyle]}
                cardstyle={styles.cardbox2}
                cardicon={faBookOpenReader}
                text="Projects"
                count={NumFormatter(1000)}
              />
            </Suspense>
            <Suspense
              fallback={
                <div>
                  <SpinnerDotted
                    style={{ marginTop: '-120px', marginLeft: '700px', color: '#39979d' }}
                  />
                </div>
              }
            >
              <Counter
                className={styles[card3bgStyle]}
                cardstyle={styles.cardbox3}
                cardicon={faBookOpenReader}
                text="Test"
                count={NumFormatter(10)}
              />
            </Suspense>
            <Suspense
              fallback={
                <div>
                  <SpinnerDotted
                    style={{ marginTop: '-150px', marginLeft: '1000px', color: '#39979d' }}
                  />
                </div>
              }
            >
              <Counter
                className={styles[card4bgStyle]}
                cardstyle={styles.cardbox4}
                cardicon={faBookOpenReader}
                text="Sample"
                count={NumFormatter(2555555)}
              />
            </Suspense>
          </ul>
        </div>
        <div className={styles.chartsection}>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <Card className={styles[graphbgStyle]} id={styles.chartcards}>
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginLeft: '100px', color: '#39979d', marginTop: '100px' }}
                      />
                    </div>
                  }
                >
                  <DoughnutChart
                    title="Doughnut Chart"
                    labels={months}
                    datas={graph}
                    label="# of Votes"
                    backgroundColor={[
                      '#ff9f40',
                      '#36a2eb',
                      '#4bc0c0',
                      '#ffcd56',
                      '#ff6384',
                      '"##d11919',
                    ]}
                    borderColor={['#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff']}
                    borderWidth="1"
                  />
                </Suspense>
              </Card>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <Card className={styles[graphbgStyle]} id={styles.chartcards}>
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginLeft: '250px', color: '#39979d', marginTop: '100px' }}
                      />
                    </div>
                  }
                >
                  <BarChart
                    labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                    title="Bar Chart"
                    data={[
                      {
                        label: 'Dataset 1',
                        data: [120, 190, 30, 50, 20, 30, 99],
                        backgroundColor: '#ff9f40',
                      },
                      {
                        label: 'Dataset 2',
                        data: [-120, -190, -30, -50, -20, -30, -99],
                        backgroundColor: '#36a2eb',
                      },
                    ]}
                  />
                </Suspense>
              </Card>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <Card className={styles[graphbgStyle]} id={styles.chartcards}>
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginLeft: '130px', color: '#39979d', marginTop: '100px' }}
                      />
                    </div>
                  }
                >
                  <ChartFunction
                    labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                    title="Line Chart"
                    data={[
                      {
                        label: 'Dataset 1',
                        data: [120, 190, 30, 50, 20, 30, 99],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                      {
                        label: 'Dataset 2',
                        data: [-120, -190, -30, -50, -20, -30, -99],
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      },
                    ]}
                  />
                </Suspense>
                {/* <Toggle id="toggleSwitch" /> */}
              </Card>
            </div>
          </div>
        </div>
        {usercount && (
          <>
            <h4 className={styles.user_title}>Users</h4>
            <Link data-tooltip="View Users" to="/user" className={styles.viewall_link}>
              {' '}
              <FontAwesomeIcon icon={faAngleRight} className={styles.angleright} />
              View All{' '}
            </Link>
          </>
        )}
        <div className={styles.tablesection}>
          <Suspense
            fallback={
              <div>
                <div style={{ textAlign: 'center', marginTop: '250px' }}>
                  <SpinnerDotted style={{ color: '#39979d' }} />
                </div>
              </div>
            }
          >
            {usercount && (
              <AgGridTable
                urlParam={url}
                fieldNames={['name', 'email', 'phone', 'active']}
                section="user"
                toggleButton={{ show: true, field: 'active' }}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
