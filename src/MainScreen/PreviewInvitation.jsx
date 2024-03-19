import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import invitationImage from '../assets/weddingCard3.jpeg';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import invitationImage2 from '../assets/weddingCard1.jpeg';
import invitationImage3 from '../assets/weddingCard2.jpeg';
import invitationImage4 from '../assets/African Canopy - Wedding Invitation Template.jpeg';
import { useTranslation } from 'react-i18next';
import MainLogo from '../../src/assets/MainLogo.svg';
import { Dropdown, Image } from 'antd';
const PreviewInvitation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  console.log('state', state);
  const logOut = () => {
    signOut(auth).then((value) => {
      navigate('/');
    });
  };
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
      {/* 
for template and coustomize button */}
      <div className="grid grid-cols-3 mt-20">
        <div className="col-span-2 bg-[#F0E8E8] flex items-center justify-center relative ">
          <div className="p-10 ">
            <Image
              onClick={() => {
                navigate('/dashboard/editTemplate', {
                  state: {
                    ref: 'template1',
                    coupleNames: state.coupleNames,
                  },
                });
              }}
              preview={false}
              src={invitationImage}
              width={450}
              height={700}
            />
          </div>
        </div>

        <div className="col-span-1 justify-start  items-start shadow-black shadow-md">
          <div className="flex justify-start items-start flex-col ml-8">
            <h1 className="font-semibold text-xl font-custom mt-10 ">
              Watercolor Floral Garland
            </h1>

            <h1 className="font-semibold text-md font-custom my-3  ">Free</h1>

            <div class="h-0.5 bg-slate-100 w-full my-3"></div>

            <button
              onClick={() => {
                navigate('/dashboard/editTemplate', {
                  state: {
                    coupleNames: state.coupleNames,
                  },
                });
              }}
              class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewInvitation;
