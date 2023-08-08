import React, { Suspense, lazy } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Outerlayout from '../layouts/outerLayout';
import Innerlayout from '../layouts/innerLayout';
import { getCookies, removeCookies } from '../hooks/useCookies';
import Settings from '../pages/settings/settings';
import ViewUsers from '../pages/users/viewUser';
import UserEdit from '../pages/users/editUser';
// import UserIndex from '../pages/users/index';
import UserCreate from '../pages/users/createUser';
import Preferences from '../pages/settings/preferences';
import CreateRoles from '../pages/roles/createRoles';
import RolesIndex from '../pages/roles/index';
import EditRoles from '../pages/roles/editRoles';
import SettingsApi from '../pages/settings/SettingsApiPage';
import SettingsLayout from '../pages/settings/settingsLayout';
import PageNotFound from '../pages/404/pageNotFound';
import PermissionDenied from '../pages/permission/permission';
import ProfileLayout from '../pages/profile/profileLayout';

const Login = lazy(() => import('../pages/logIn/logIn'));
const UserIndex = lazy(() => import('../pages/users/index'));
const UserVerification = lazy(() => import('../pages/verify/userVerfication'));
const Register = lazy(() => import('../pages/register/register'));
const Forgetpassword = lazy(() => import('../pages/passwords/forgetPassword'));
const EmployeeIndex = lazy(() => import('../pages/employees/index'));
const EmployeeCreate = lazy(() => import('../pages/employees/create'));
const EmployeeEdit = lazy(() => import('../pages/employees/edit'));
const ResetPassword = lazy(() => import('../pages/passwords/resetPassword'));
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));
const ChatContainer = lazy(() => import('../pages/chatContainer/chatContainer'));
const HooksTest = lazy(() => import('../components/hooksFormTest'));
const CustomHooksTest = lazy(() => import('../hooks/customHooksTest'));
const MyForm = lazy(() => import('../components/PhoneNumberBox/PhoneNumberBox'));
const AgGridTable = lazy(() => import('../components/AgTable/AgGridTable'));
// const PageNotFound = lazy(() => import('../pages/404/pageNotFound'));
const ProfilePage = lazy(() => import('../pages/profile/profilepage'));
const ChangePassword = lazy(() => import('../pages/profile/changePassword'));
const ProfileEdit = lazy(() => import('../pages/profile/profileEdits'));
const Faq = lazy(() => import('../cms/faq'));
const ViewEmployee = lazy(() => import('../pages/employees/view'));
const ViewRole = lazy(() => import('../pages/roles/view'));
const MoviesIndex = lazy(() => import('../pages/movies/index'));
const MoviesCreate = lazy(() => import('../pages/movies/create'));
const MoviesEdit = lazy(() => import('../pages/movies/edit'));
const ViewMovies = lazy(() => import('../pages/movies/view'));
const NotificationsIndex = lazy(() => import('../pages/notifications/index'));
export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route element={<Outerlayout />}>
          <Route
            exact
            path="/"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{
                        left: '50%',
                        position: 'absolute',
                        textAlign: 'center',
                        top: '50%',
                        color: '#39979d',
                      }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  {' '}
                  <Login />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{
                        left: '50%',
                        position: 'absolute',
                        textAlign: 'center',
                        top: '50%',
                        color: '#39979d',
                      }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  {' '}
                  <Login />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/verify-email"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  {' '}
                  <UserVerification />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{
                        left: '50%',
                        position: 'absolute',
                        textAlign: 'center',
                        top: '50%',
                        color: '#39979d',
                      }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  <Register />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/forgetpassword"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{
                        left: '50%',
                        position: 'absolute',
                        textAlign: 'center',
                        top: '50%',
                        color: '#39979d',
                      }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  <Forgetpassword />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/reset/:id"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  {' '}
                  <ResetPassword />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          {/* <Route exact path="/" element={<Dashboard />} /> */}
          <Route
            exact
            path="/reset"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <UnProtectedRoute>
                  {' '}
                  <ResetPassword />
                </UnProtectedRoute>
              </Suspense>
            }
          />
        </Route>
        <Route element={<Innerlayout />}>
          <Route
            exact
            path="/roles"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <RolesIndex />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/chat"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <ChatContainer />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/roles/create"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <CreateRoles />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/roles/edit/:roleId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <EditRoles />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/roles/viewdetails/:roleId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <ViewRole />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/employee"
            element={
              <Suspense
                fallback={
                  <div style={{ textAlign: 'center', marginTop: '400px', color: '#39979d' }}>
                    <SpinnerDotted />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <EmployeeIndex />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/employee/create"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <EmployeeCreate />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/employee/edit/:empId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <EmployeeEdit />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/employee/viewdetails/:empId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <ViewEmployee />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/notifications"
            element={
              <Suspense
                fallback={
                  <div style={{ textAlign: 'center', marginTop: '400px', color: '#39979d' }}>
                    <SpinnerDotted />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <NotificationsIndex />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <Suspense
                fallback={
                  <div style={{ textAlign: 'center', marginTop: '400px', color: '#39979d' }}>
                    <SpinnerDotted />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <MoviesIndex />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/movies/create"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <MoviesCreate />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/movies/edit/:userId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <MoviesEdit />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/movies/viewdetails/:userId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <ViewMovies />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/user/viewdetails/:userId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <ViewUsers />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/user/create"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <UserCreate />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/user/edit/:userId"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <UserEdit />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/hooks"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <HooksTest />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/customhooks"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <CustomHooksTest />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/text"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <MyForm />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/table"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <AgGridTable />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/user"
            element={
              <Suspense
                fallback={
                  <div>
                    <SpinnerDotted
                      style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                    />
                  </div>
                }
              >
                <ProtectedRoute>
                  {' '}
                  <UserIndex />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route element={<SettingsLayout />}>
            <Route
              exact
              path="/settings"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                      />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <Settings />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              exact
              path="/preferences"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                      />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <Preferences />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              exact
              path="/api"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                      />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <SettingsApi />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProfileLayout />}>
            <Route
              exact
              path="/profile"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                      />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <ProfilePage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              exact
              path="/profile-edit"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                      />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <ProfileEdit />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              exact
              path="/cms"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted style={{ marginTop: '250px', marginLeft: '300px' }} />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <Faq />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              exact
              path="/changePassword"
              element={
                <Suspense
                  fallback={
                    <div>
                      <SpinnerDotted
                        style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                      />
                    </div>
                  }
                >
                  <ProtectedRoute>
                    {' '}
                    <ChangePassword />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route
          exact
          path="*"
          element={
            <Suspense
              fallback={
                <div>
                  <SpinnerDotted
                    style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                  />
                </div>
              }
            >
              {' '}
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          exact
          path="/permission"
          element={
            <Suspense
              fallback={
                <div>
                  <SpinnerDotted
                    style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }}
                  />
                </div>
              }
            >
              <ProtectedRoute>
                {' '}
                <PermissionDenied />
              </ProtectedRoute>
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  if (document.cookie && getCookies('Token')) {
    if (getCookies('USERPERMISSION')) {
      return children;
    }
    removeCookies('Token');
    removeCookies('refreshToken');
    sessionStorage.setItem('cookiesCleared', true);
    return <Navigate to="/login" />;
  }
  sessionStorage.setItem('cookiesCleared', true);
  return <Navigate to="/login" />;
}

// eslint-disable-next-line react/prop-types
function UnProtectedRoute({ children }) {
  return getCookies('Token') ? <Navigate to="/dashboard" /> : children;
}
