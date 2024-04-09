import React from 'react';

import PurplePhone from '../../assets/Group purplePhone.svg';
import GreenPhone from '../../assets/Group  greenWhatapp.svg';
import MainLogo from '../../assets/hela.png';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-40   ">
        <div className="bg-[#F6C423] p-10 flex flex-col w-full  max-w-[1051px]   justify-center items-center rounded-lg   relative   ">
          {/* circles */}

          <div className=" absolute  bottom-0 right-0 h-[179px] w-[179px] rounded-tl-full   bg-[#F5DA8F] hidden lg:block"></div>
          <div className="absolute bottom-0 left-0 h-[155px] w-[155px] rounded-tr-full    bg-[#F5DA8F] hidden lg:block"></div>

          <h1 className="text-[30px] lg:text-40 font-manrope font-bold mx-20 ">
            {t('ACCESS')} <br /> <span className="ml-20"> </span>
          </h1>

          {/* 2  whats app icons */}
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center my-10">
            <div className="bg-[#F5DA8F] p-3 flex flex-col w-[290px]  h-[79px] justify-start items-start rounded-md relative    ">
              <div className="absolute  -top-6 right-5">
                <img src={PurplePhone} alt="" />
              </div>
              <h1 className=" text-16 text-[#5B4508] font-bold font-manrope">
                Email
              </h1>
              <h1 className="f text-[#111827] font-inter text-14 font-normal   ">
                {' '}
                lasithherath00@gmail.com
              </h1>
            </div>
            {/* 2nd whats app box */}
            <div className="bg-[#F5DA8F] p-3 flex flex-col w-[290px]  h-[79px] justify-start items-start rounded-md relative">
              <div className="absolute  -top-6 right-5">
                <img src={GreenPhone} alt="" />
              </div>
              <h1 className=" text-[16px] text-[#5B4508] font-bold font-manrope">
                WhatsApp
              </h1>
              <h1 className="f text-[#111827] font-inter text-14 font-normal   ">
                {' '}
                +94 712 332 534
              </h1>
            </div>
          </div>
        </div>
        {/* green rec */}
        <div className="bg-[#597B65] p-10 flex flex-col w-full  max-w-[1388.5px]  justify-center items-center           gap-5      ">
          <div className=" mt-6    ">
            <img src={MainLogo} className="h-40 " alt="" />
          </div>

          <p className="text-white font-normal font-inter text-[14]">
            Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit.
            Conse tem ad reiciendis. Corrupti facere ratione natus.
          </p>

          <div className="flex justify-between gap-6 text-white font-semibold font-inter text-14 ">
            <h1>About</h1>
            <h1>Terms</h1>
            <h1> Privacy</h1>
          </div>
          <div className="flex justify-between gap-6">
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          </div>
          <h1 className="text-white font-normal font-inter text-[14px">
            ©2023 MadLabs. All rights reserved. Developed and designed by
            www.clounote.com
          </h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
