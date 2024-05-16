import React from 'react';
import { Card, Avatar } from 'antd';
import comma from '../../assets/comma.svg';
import smallMan1 from '../../assets/smallMan1.svg';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
const CustomerStories = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <section>
          <div className="bg-[#F5F7F9] ">
            <div className="flex justify-center items-center   flex-col lg:flex-row  ">
              <div className="flex flex-col mr-20">
                <div className=" items-center justify-center lg:items-start   xl:mt-0">
                  <h1 className="mt-20  text-[50px] font-bold  ">
                    {t('REAL_STORIES')} <br />{' '}
                    <span className="flex "> {t('REAL_CUSTOMERS')}</span>
                  </h1>
                  <h1>{t('GET_INSPIRED')} </h1>
                </div>
                {/* 1st crd */}

                <Card
                  style={{
                    width: 400,
                  }}
                >
                  <Avatar src={smallMan1} size={40} />
                  <img className="mt-2" src={comma} alt="" />
                  <div className="flex flex-col   ml-9 text-smallText font-inter text-18 font-normal">
                    <p>{t('FEEDBACK_ONE')}</p>
                    <h1 className="  font-semibold mt-2"> Lasith Herath</h1>
                    <h1 className="text-darkText text-14">
                      Vise President GoPro
                    </h1>
                  </div>
                </Card>
              </div>
              {/* 2nd crd */}
              <div className="flex flex-col gap-5 mt-10 lg:mt-40  mr-10  lg:ml-10  mb-10  ">
                <Card
                  style={{
                    width: 400,
                  }}
                >
                  <Avatar src={smallMan1} size={40} />
                  <img className="mt-2" src={comma} alt="" />
                  <div className="flex flex-col   ml-9 text-smallText font-inter text-18 font-normal">
                    <p>{t('FEEDBACK_TWO')}</p>
                    <h1 className="  font-semibold mt-2">Floyd Miles</h1>
                    <h1 className="text-darkText text-14">
                      Vise President GoPro
                    </h1>
                  </div>
                </Card>
                <Card
                  style={{
                    width: 400,
                  }}
                >
                  <div className="flex flex-col justify-start items-start">
                    <Avatar src={smallMan1} size={40} />
                    <img className="mt-2" src={comma} alt="" />
                  </div>

                  <div className="flex flex-col   ml-9 text-smallText font-inter text-18 font-normal">
                    <p>{t('FEEDBACK_THREE')}</p>
                    <h1 className="  font-semibold mt-2">Floyd Miles</h1>
                    <h1 className="text-darkText text-14">
                      Vise President GoPro
                    </h1>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerStories;
