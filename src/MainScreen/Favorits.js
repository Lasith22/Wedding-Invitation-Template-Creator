import React, { useEffect, useState } from 'react';

import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLogo from '../../src/assets/MainLogo.svg';
import { useTranslation } from 'react-i18next';
import { Dropdown, Spin } from 'antd';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
const Favorits = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(state);
  const logOut = () => {
    signOut(auth).then((value) => {
      navigate('/');
    });
  };
  useEffect(() => {
    const getTemplates = async () => {
      setLoading(true);
      const docRef = doc(db, 'TEMPLATES', `${state.email}`);
      const docSnap = await getDoc(docRef);

      try {
        if (docSnap.exists()) {
          setImages(docSnap.data().links);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTemplates();
  }, []);
  console.log('Document data:', images);
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
  return (
    <div>
      <div className="flex justify-between items-stretch p-5">
        {/* couple names */}
        <div className="flex justify-between font-serif text-[40px] gap-5 text-slate-500 ">
          <h1>{state.coupleNames.partnerFirstName}</h1>
          <h1>&</h1>
          <h1>{state.coupleNames.yourFirstName}</h1>
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
      <hr className="border-t border-gray-300  " />

      <div className="flex justify-center items-center">
        {' '}
        <h1 className="mt-10   text-[40px]  lg:text-[20px] text-[#BC8C05] font-bold font-manrope">
          {' '}
          Favorits
        </h1>
      </div>
      <Spin spinning={loading} tip="Loading...">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => {
            return (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={img}
                  alt={`Image ${index}`}
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default Favorits;
