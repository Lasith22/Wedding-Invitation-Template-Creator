import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
const Dashboard = () => {
  const [coupleNames, setCoupleNames] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then((value) => {
      navigate('/');
    });
  };

  // get names of couples from firestore

  useEffect(() => {
    const getCoupleNames = async () => {
      const docRef = doc(db, 'USERS', state.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document Data', docSnap.data());
        setCoupleNames(docSnap.data());
      } else {
        console.log('No such document');
      }
    };
    getCoupleNames();
  }, []);
  console.log('email', state.email);
  return (
    <div>
      <h1>Dashboard</h1>
      {/* {console.log(state)} */}
      <h1>{coupleNames.partnerFirstName}</h1>
      <h1>{coupleNames.yourFirstName}</h1>
      <button onClick={logOut}> Sign Out</button>
    </div>
  );
};

export default Dashboard;
