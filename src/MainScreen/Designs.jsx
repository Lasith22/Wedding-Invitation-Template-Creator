import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { Dropdown } from 'antd';
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

  const items = [
    {
      label: <h1 onClick={logOut}> Log out</h1>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">Account Details</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Help',
      key: '3',
    },
  ];
  console.log('email', state.email);
  return (
    <div>
      {/* top nav bar section with log out part */}

      <div className="flex justify-between items-stretch p-5">
        {/* couple names */}
        <div className="flex justify-between font-serif text-[40px] gap-5 text-slate-500 ">
          <h1>{coupleNames.partnerFirstName}</h1>
          <h1>&</h1>
          <h1>{coupleNames.yourFirstName}</h1>
        </div>

        {/* log out Part */}
        <div className="mr-6">
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <button> Your Account</button>
          </Dropdown>
        </div>
      </div>

      {/* {console.log(state)} */}
      {/* <h1>{coupleNames.partnerFirstName}</h1>
      <h1>{coupleNames.yourFirstName}</h1> */}
      {/* <button onClick={logOut}> Sign Out</button> */}
    </div>
  );
};

export default Dashboard;
