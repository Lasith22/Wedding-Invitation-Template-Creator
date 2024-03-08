import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLogo from '../../src/assets/MainLogo.svg';
import { doc, getDoc } from 'firebase/firestore';
import { Dropdown, Image } from 'antd';
import Card2 from '../assets/Card 23.jpeg';
import Card3 from '../assets/I wil .jpg';
import videoBg from '../assets/vedio.mp4';
import { useTranslation } from 'react-i18next';

import DummyDecoration from '../../src/assets/Dreamcards Wedding Invitation Dream-Create-Celebrate.jpg';
const Dashboard = () => {
  const [coupleNames, setCoupleNames] = useState([]);

  const { state } = useLocation();
  const { t } = useTranslation();
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
      label: <h1 onClick={logOut}>{t('LOG_OUT')} </h1>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">{t('ACCOUNT_DETAILS')} </a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: t('HELP'),
      key: '3',
    },
  ];
  console.log('email', state.email, coupleNames);
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
              <button className="border px-4 py-2 ">
                {t('YOUR_ACCOUNT')}{' '}
              </button>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* second part */}
      <div className="flex  justify-center items-center gap-12">
        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  ">
          {t('ENGAGEMENT_PARTY')}
        </h1>

        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  ">
          {t('GREETINGS')}
        </h1>

        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  border-b-2 ">
          {t('WEDDING')}
        </h1>

        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  ">
          {t('HOME_COMING')}
        </h1>
      </div>
      <hr className="border-t border-gray-300  " />

      {/* second layer */}
      <div className="bg-[#f5f1e6] h-80 mx-20 mb-10  ">
        <div className="flex justify-between items-center">
          {/* text */}
          <div className="flex flex-col mx-10">
            <h1 className="mt-0   text-[40px]  lg:text-[50px] text-[#BC8C05] font-bold font-manrope">
              {' '}
              {t('WEDDING_WEBSITE!!')}
            </h1>
            <p className="text-18 font-inter text-darkdray mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              asperiores modi beatae
              <br /> facere eum! Deleniti, consectetur, molestias reprehenderit
              laudantium, a rerum ad aut velit sit?
            </p>
          </div>
          <div className=" mr-10  ">
            <img
              src={Card2}
              width="250"
              height="50"
              // style={{ transform: 'rotate(-8deg)' }}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* actual templates section */}
      <div className="flex justify-center items-center gap-10">
        <Image
          onClick={() => {
            navigate('preview', {
              state: {
                coupleNames: coupleNames,
              },
            });
          }}
          preview={false}
          src={DummyDecoration}
          width={400}
        />
        <Image
          onClick={() => {
            navigate('preview', {
              state: {
                coupleNames: coupleNames,
              },
            });
          }}
          preview={false}
          src={DummyDecoration}
          width={400}
        />
        <Image
          onClick={() => {
            navigate('/dashboard/preview', {
              state: {
                coupleNames: coupleNames,
              },
            });
          }}
          preview={false}
          src={DummyDecoration}
          width={400}
        />
      </div>
    </div>
  );
};

export default Dashboard;
