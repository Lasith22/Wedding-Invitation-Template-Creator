import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
const Designs = () => {
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then((value) => {
      console.log(value);
      navigate('/');
    });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logOut}> Sign Out</button>
    </div>
  );
};

export default Designs;
