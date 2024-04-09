import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import invitationImage1 from '../assets/weddingCard3.jpeg';
import invitationImage2 from '../assets/weddingCard1.jpeg';
import invitationImage3 from '../assets/weddingCard2.jpeg';
import invitationImage4 from '../assets/template1.jpeg';
import invitationImage5 from '../assets/template5.jpeg';
import invitationImage6 from '../assets/template2.jpeg';
import invitationImage7 from '../assets/template3.jpeg';
import invitationImage8 from '../assets/Template.jpg';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { IoIosColorPalette } from 'react-icons/io';
import { MdPictureAsPdf } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { LuSticker } from 'react-icons/lu';
import MainLogo from '../../src/assets/hela.png';
import { Dropdown, Image, Select } from 'antd';
import i18next from 'i18next';
import { MdLanguage } from 'react-icons/md';
const PreviewInvitation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('si');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  console.log('email', state);
  const logOut = () => {
    signOut(auth).then((value) => {
      navigate('/');
    });
  };
  const handleLanguageChange = (value) => {
    setSelectedLanguage(i18next.changeLanguage(value));
  };
  const items = [
    {
      label: <h1 onClick={logOut}>{t('LOG_OUT')} </h1>,
      key: '0',
    },

    {
      label: <a href="https://www.aliyun.com">{t('ACCOUNT_DETAILS')} </a>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: t('HELP'),
      key: '3',
    },
  ];

  // Conditional rendering logic based on `ref`
  let invitationImage;
  let aboutTemplate;
  let templateName;
  switch (state.ref) {
    case 'template1':
      invitationImage = invitationImage1;
      aboutTemplate = t('BLOOM_EMRACE_EXPLENATION');
      templateName = t('BLOOM_EMRACE');
      break;
    case 'template2':
      invitationImage = invitationImage2;
      aboutTemplate = t('FESTIVE_MELODY_EXPLENATION');
      templateName = t('FESTIVE_MELODY');
      break;
    case 'template3':
      invitationImage = invitationImage3;
      aboutTemplate = t('SIHALA_UTHSAWA_EXPLENATION');
      templateName = t('SIHALA_UTHSAWA');
      break;
    case 'template4':
      invitationImage = invitationImage4;
      aboutTemplate = t('ROYAL_INVITATION_EXPLENATION');
      templateName = t('ROYAL_INVITATION');
      break;
    case 'template5':
      invitationImage = invitationImage5;
      aboutTemplate = t('THIS_FESTIVELY');
      templateName = t('MANGALA_ALI');
      break;
    case 'template6':
      invitationImage = invitationImage6;
      aboutTemplate = t('THIS_FESTIVELY');
      templateName = t('MANGALA_ALI');
      break;
    case 'template7':
      invitationImage = invitationImage7;
      aboutTemplate = t('THIS_FESTIVELY');
      templateName = t('MANGALA_ALI');
      break;
    case 'template8':
      invitationImage = invitationImage8;
      aboutTemplate = t('THIS_FESTIVELY');
      templateName = t('MANGALA_ALI');
      break;

    default:
      invitationImage = '/path/to/default/image.jpg';
  }

  return (
    <div>
      <div className="flex justify-between items-stretch p-5">
        <div className="flex items-center   ">
          <img src={MainLogo} alt="" className="h-20" />
        </div>
        {/* couple names */}
        <div className="flex justify-between font-serif text-[40px] gap-5 text-slate-500 ">
          <h1>{state.coupleNames.partnerFirstName}</h1>
          <h1>&</h1>
          <h1>{state.coupleNames.yourFirstName}</h1>
        </div>

        {/* log out Part */}
        <div className="mr-6">
          <div className="flex justify-between gap-6">
            <div className="flex justify-between items-center gap-1">
              <MdLanguage size={30} color="pink" />
              <Select
                defaultValue={selectedLanguage}
                onChange={handleLanguageChange}
                options={[
                  {
                    value: 'si',
                    label: 'සිංහල',
                  },
                  {
                    value: 'en',
                    label: 'ENGLISH',
                  },
                ]}
                style={{ width: 100 }}
              />
            </div>
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
        <div className=" bg-[url('/testImage5.jpeg')]  object-contain w-full h-full   bg-opacity-50  col-span-2   flex items-center justify-center relative ">
          <div className="p-10 ">
            <Image
              onClick={() => {
                navigate('/dashboard/editTemplate', {
                  state: {
                    ref: state.ref,
                    coupleNames: state.coupleNames,
                    email: state.email,
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
              {templateName}
            </h1>

            <h1 className="font-semibold text-md font-custom my-3  ">
              {' '}
              {t('FREE')}{' '}
            </h1>

            <div class="h-0.5 bg-slate-100 w-full my-3"></div>

            <div className=" my-3">
              <button
                onClick={() => {
                  navigate('/dashboard/editTemplate', {
                    state: {
                      coupleNames: state.coupleNames,
                      ref: state.ref,
                      email: state.email,
                    },
                  });
                }}
                class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]"
              >
                {t('CUSTOMIZE')}
              </button>
            </div>
            <div class="h-0.5 bg-slate-100 w-full my-3"></div>

            {/* template content */}
            <div>
              <h1 className="text-gray-400 text-sm">{aboutTemplate}</h1>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <IoIosColorPalette size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">
                    {t('CHANGE_YOUR_CARDS')}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <FaPencilAlt size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">{t('CUSTOMIZE_TO')}</h1>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <MdPictureAsPdf size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">{t('SEAL_YOUR')}</h1>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <LuSticker size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">{t('ENRICH_YOUR')}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewInvitation;
