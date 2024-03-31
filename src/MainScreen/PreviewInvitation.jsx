import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import invitationImage1 from '../assets/weddingCard3.jpeg';
import invitationImage2 from '../assets/weddingCard1.jpeg';
import invitationImage3 from '../assets/weddingCard2.jpeg';
import invitationImage4 from '../assets/template1.jpeg';
import invitationImage5 from '../assets/template5.jpeg';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { IoIosColorPalette } from 'react-icons/io';
import { MdPictureAsPdf } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { LuSticker } from 'react-icons/lu';
import MainLogo from '../../src/assets/MainLogo.svg';
import { Dropdown, Image } from 'antd';
const PreviewInvitation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

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

  // Conditional rendering logic based on `ref`
  let invitationImage;
  switch (state.ref) {
    case 'template1':
      invitationImage = invitationImage1;
      break;
    case 'template2':
      invitationImage = invitationImage2;
      break;
    case 'template3':
      invitationImage = invitationImage3;
      break;
    case 'template4':
      invitationImage = invitationImage4;
      break;
    case 'template5':
      invitationImage = invitationImage5;
      break;

    default:
      invitationImage = '/path/to/default/image.jpg';
  }

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
        <div className=" bg-[url('/testImage5.jpeg')]  object-contain w-full h-full   bg-opacity-50  col-span-2   flex items-center justify-center relative ">
          <div className="p-10 ">
            <Image
              onClick={() => {
                navigate('/dashboard/editTemplate', {
                  state: {
                    ref: state.ref,
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

            <div className=" my-3">
              <button
                onClick={() => {
                  navigate('/dashboard/editTemplate', {
                    state: {
                      coupleNames: state.coupleNames,
                      ref: state.ref,
                    },
                  });
                }}
                class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]"
              >
                Customize
              </button>
            </div>
            <div class="h-0.5 bg-slate-100 w-full my-3"></div>

            {/* template content */}
            <div>
              <h1 className="text-gray-400 text-sm">
                Get ready to host and toast to the happy couple with this
                greenery-inspired online wedding invitation. A watercolor
                garland border gives a nod to nature and can be customized in
                either green or blue with an option also for colorful florals.
                Simple, classic, elegant, and perfect for any style wedding
                celebration.
              </h1>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <IoIosColorPalette size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">
                    Change your Card’s text, style, envelope, stamp, backdrop,
                    and more. Add additional text boxes where you want them.
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <FaPencilAlt size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">
                    Customize to your heart's content: Drag and edit text, add
                    new text fields, and adjust the size to make your invitation
                    uniquely yours.
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <MdPictureAsPdf size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">
                    Seal your memories in style: Easily convert your
                    personalized invitation into a PDF format, allowing for
                    effortless printing or sharing with loved ones.
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 my-8 items-center">
                <div className="col-span-1">
                  <LuSticker size={30} />
                </div>
                <div className="col-span-11">
                  <h1 className="text-gray-400 text-sm">
                    Enrich your invitation with cultural elegance: Add
                    traditional stickers to showcase the unique beauty and
                    traditions of Sri Lanka.
                  </h1>
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
