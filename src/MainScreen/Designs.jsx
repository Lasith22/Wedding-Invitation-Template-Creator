import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLogo from '../../src/assets/MainLogo.svg';
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
  }, [state.email]);

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

        <div className="flex items-center   ">
          <img src={MainLogo} alt="" className="h-8" />
        </div>

        {/* log out Part */}
        <div className="mr-6">
          <div className="flex justify-between  gap-6">
            <Dropdown
              menu={{
                items,
              }}
              trigger={['hover']}
            >
              <button className="border px-4 py-2">Your Account</button>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* second part */}
      <div className=""></div>
    </div>
  );
};

export default Dashboard;
