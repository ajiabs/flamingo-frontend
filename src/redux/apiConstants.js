import envValues from '../enviornment';

export const SERVER_URL = `${envValues.REACT_APP_API_ENDPOINT}/auth`;
export const SERVER_BASE_URL = envValues.REACT_APP_API_ENDPOINT;
export const ERROR_MESSAGE = 'Api Fetch Error!';
export const ENCRYPT_SECERET_KEY = 'armia-secret-key@123';
export const REACT_APP_API_POST_USER = `${envValues.REACT_APP_API_ENDPOINT}/user`;
export const REACT_APP_API_FETCH_USER = `${envValues.REACT_APP_API_ENDPOINT}/user?`;
export const REACT_APP_API_FETCH_EMPLOYEE = `${envValues.REACT_APP_API_ENDPOINT}/employee?active=true&`;
export const REACT_APP_API_FETCH_ROLE = `${envValues.REACT_APP_API_ENDPOINT}/roles?active=true&`;
export const REACT_APP_API_SKILLS = `${envValues.REACT_APP_API_ENDPOINT}/dummy/selectdata`;
export const REACT_APP_API_ROLES_DROPDOWN = `${envValues.REACT_APP_API_ENDPOINT}/roles/select`;
export const REACT_APP_API_FETCH_MOVIES = `${envValues.REACT_APP_API_ENDPOINT}/movies?active=true&`;
export const REACT_APP_API_FETCH_NOTIFICATIONS = `${envValues.REACT_APP_API_ENDPOINT}/notifications?`;
