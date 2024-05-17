import React from 'react';
import Invitation1 from '../../assets/16922390_5774757.jpg';
import Invitation2 from '../../assets/16695637_5771538.jpg';
import Invitation3 from '../../assets/Invitation3.png';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

const DesignView = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* <div className=" h-[500px] bg-white">
        <div className=" flex justify-center  items-center">
          <h1 className=" text-[30px] lg:text-[40px] font-bold font-manrope     ">
            Start Strong with These Inspiring Designs!
          </h1>
        </div>
      </div> */}
      <div className="flex flex-col bg-white justify-center items-center mt-20 mb-10 ">
        <h1 className=" text-[50px] font-bold  "> {t('START_STRONG')}</h1>
        <p className="mx-80">
          Amidst the delicate dance of design elements, our invitations weave a
          tapestry of timeless sophistication, offering a glimpse into a world
          where every detail is meticulously crafted to elevate your celebration
          into an unforgettable moment of love and joy
        </p>

        <div className="flex justify-evenly items-center gap-10 mt-10   ">
          <div className="flex flex-col gap-5">
            <Image src={Invitation2} width={400} />

            <div className="flex flex-col gap-3 ">
              <div className=" bg-yellow-400 bg-opacity-40  p-1 flex w-1/3 rounded-lg justify-center items-center   ">
                <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  ">
                  {t('CELEBRATE')}
                </h1>
              </div>

              <h1 className="text-2xl font-bold font-inter  ">
                {t('GRACEFULL')}
                <br />
                {t('UNFORGETABLE')}
              </h1>

              <div className="flex border-b"></div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Image src={Invitation3} width={400} />

            <div className="flex flex-col   gap-3 ">
              <div className="bg-[#B4A1DC]  p-1 flex w-1/3 rounded-lg justify-center items-center   ">
                <h1 className="text-[#350B8C] font-semibold text-xl font-custom  ">
                  {t('ROMANCE')}
                </h1>
              </div>

              <h1 className="text-2xl font-bold font-inter  ">
                {t('TIMLESS')} <br />
                {t('SPECIAL_DAY')}
              </h1>

              <div className="flex border-b"></div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Image src={Invitation1} width={400} />

            <div className="flex flex-col   gap-3 ">
              <div className="bg-[#F7C29B]  p-1 flex w-1/3 rounded-lg justify-center items-center   ">
                <h1 className="text-[#964306] font-semibold text-xl font-custom  ">
                  {t('DREAMY')}
                </h1>
              </div>

              <h1 className="text-2xl font-bold font-inter  ">
                {t('A_TOUCH')} <br />
                {t('OF_ELEGANCE')}
              </h1>

              <div className="flex border-b"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignView;
