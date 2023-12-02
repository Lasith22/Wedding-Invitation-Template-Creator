import React from 'react';
import { ReactComponent as BigIcon } from '../../assets/SecondPartBG.svg';
import { ReactComponent as Star2 } from '../../assets/Star.svg';
import { ReactComponent as SecondStar } from '../../assets/SecondStar.svg';
import { ReactComponent as Hat } from '../../assets/Hat.svg';
import { ReactComponent as HalfMoon } from '../../assets/HalfMoon.svg';
import Card2 from '../../assets/Card 23.jpeg';

const SecondPart = () => {
  return (
    <>
      <section>
        <div className="w-[screen]    bg-[#F7E2A7]     p-2 ">
          <div className="flex flex-col lg:flex-row    m-20 gap-10  justify-between   ">
            {/* background svg image */}
            <div className="       relative        ">
              <BigIcon className="  absolute -bottom-14 left-0" />
            </div>
            <div className="flex flex-col       ">
              <h1 className="mt-0 sm:mt-20 text-[40px]  lg:text-[50px] font-bold font-manrope">
                {' '}
                Wedding Website
              </h1>
              {/* <img src={BigIcon} /> */}

              <p className="text-18 font-inter text-darkdray mt-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                asperiores modi beatae
                <br /> facere eum! Deleniti, consectetur, molestias
                reprehenderit laudantium, a rerum ad aut velit sit?
              </p>
              <div className="mt-10  ">
                <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full">
                  Explore designs
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center     gap-6">
              {/* 1st crd  */}

              <div className="       relative        ">
                <Star2
                  style={{ transform: 'rotate(8deg)' }}
                  className="    absolute right-20 bottom-24"
                />
              </div>

              <div className="       relative        ">
                <SecondStar
                  style={{ transform: 'rotate(8deg)' }}
                  className="     absolute right-2 top-5"
                />
              </div>
              <div className="       relative        ">
                <Hat
                  style={{ transform: 'rotate(8deg)' }}
                  className="     absolute right-60  "
                />
              </div>
              <div className="       relative        ">
                <HalfMoon
                  style={{ transform: 'rotate(8deg)' }}
                  className="     absolute right-20 top-40  "
                />
              </div>
              <img
                src={Card2}
                style={{ transform: 'rotate(-8deg)' }}
                alt=""
                className="  h-50 w-80 object-cover transform rotate-10"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondPart;
