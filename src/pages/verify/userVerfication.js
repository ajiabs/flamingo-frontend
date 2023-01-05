/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SERVER_BASE_URL } from '../../redux/apiConstants';

function UserVerification() {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    const token = new URLSearchParams(search).get('token');
    console.log(token);
    const url = `${SERVER_BASE_URL}/auth/verify-email?token=${token}`; // api url
    fetch(url)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => {
        console.log(resp);
        if (resp.code === 200) {
          setLoader(false);
          toast.success('User verification completed, you will be redirected to login page');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setLoader(false);
          toast.error('Link expired, you will be redirected to login page');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      }); // setting response to state posts
  }, []);
  return (
    <div>
      {loader ? (
        <>
          <br />
          <SpinnerDotted style={{ marginTop: '250px', marginLeft: '300px', color: '#39979d' }} />
        </>
      ) : (
        <div />
      )}
    </div>
  );
}

export default UserVerification;
