import React from 'react';

import Invitation1 from '../../assets/16922390_5774757.jpg';
import Invitation2 from '../../assets/16695637_5771538.jpg';
import Invitation3 from '../../assets/Invitation3.png';
import { Image } from 'antd';
const DesignView = () => {
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
        <h1 className=" text-[50px] font-bold  ">
          {' '}
          Start Strong with These Inspiring Designs!!!!
        </h1>
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
                  CELEBRATE
                </h1>
              </div>

              <h1 className="text-2xl font-bold font-inter  ">
                Graceful invitations for <br />
                unforgettable moments.
              </h1>

              <div className="flex border-b"></div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Image src={Invitation3} width={400} />

            <div className="flex flex-col   gap-3 ">
              <div className="bg-[#B4A1DC]  p-1 flex w-1/3 rounded-lg justify-center items-center   ">
                <h1 className="text-[#350B8C] font-semibold text-xl font-custom  ">
                  ROMANCE
                </h1>
              </div>

              <h1 className="text-2xl font-bold font-inter  ">
                Timeless designs for your <br />
                special day.
              </h1>

              <div className="flex border-b"></div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Image src={Invitation1} width={400} />

            <div className="flex flex-col   gap-3 ">
              <div className="bg-[#F7C29B]  p-1 flex w-1/3 rounded-lg justify-center items-center   ">
                <h1 className="text-[#964306] font-semibold text-xl font-custom  ">
                  DREAMY
                </h1>
              </div>

              <h1 className="text-2xl font-bold font-inter  ">
                A touch of tradition, a world <br />
                of elegance.
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
