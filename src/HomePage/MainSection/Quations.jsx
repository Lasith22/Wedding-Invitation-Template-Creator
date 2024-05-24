import React from 'react';
import Minus from '../../assets/Minus.svg';
import Plus from '../../assets/plus.svg';
import { useTranslation } from 'react-i18next';
const Quations = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <div className="flex flex-col lg:flex-row   mx-20 mt-10">
          {/* Any quiations sections */}
          <div className="flex flex-col">
            <h1 className="text-[50px] font-bold font-manrope  ">
              {t('ANY_QUATION')} <br /> {t('WE_GOT')}
            </h1>
            <p className="text-[18px] font-inter text-darkdray mt-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              asperiores modi <br /> beatae facere eum! Deleniti, rerum
              similique. Eius quae mollitia consectetur, molestias reprehenderit{' '}
              <br /> laudantium, a rerum ad aut velit sit?
            </p>
          </div>
          {/* how this work section */}
          <div className="flex flex-col ml-0 lg:ml-20 mt-10 lg:mt-0">
            <div className="flex items-stretch justify-between  gap-20  ">
              <h1 className="text-[20px] font-semibold font-manrope">
                {t('HOW_THIS')}
              </h1>

              <img src={Minus} alt="" />
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              provident suscipit nobis. <br /> Obcaecati, sapiente? Optio
              voluptas harum dolores quae aut q labore officia?
            </p>
            {/* border bottom */}
            <div className="flex border-b my-10"></div>

            <div className="flex items-stretch justify-between  gap-20  ">
              <h1 className="text-[20px] font-semibold font-manrope">
                {t('ARE_THERE')}
              </h1>

              <img src={Plus} alt="" />
            </div>
            {/* border bottom */}
            <div className="flex border-b my-10"></div>

            <div className="flex items-stretch justify-between  gap-18  ">
              <h1 className="text-[20px] font-semibold font-manrope">
                {t('HOW_CAN_I')}
              </h1>

              <img src={Plus} alt="" />
            </div>
            {/* border bottom */}
            <div className="flex border-b my-10"></div>

            <div className="flex items-stretch justify-between  gap-20  ">
              <h1 className=" text-[20px] font-semibold font-manrope">
                {t('WHAT_MATERIAL')}
              </h1>

              <img src={Plus} alt="" />
            </div>
            {/* border bottom */}
            <div className="flex border-b my-10"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quations;
