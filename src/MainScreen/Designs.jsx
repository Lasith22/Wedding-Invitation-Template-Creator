import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then((value) => {
      navigate('/');
    });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {/* {console.log(state)} */}
      {/* <h1>{state.state.firstName}</h1> */}
      <button onClick={logOut}> Sign Out</button>
    </div>
  );
};

export default Dashboard;
