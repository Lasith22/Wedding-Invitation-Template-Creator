import React from 'react';
import { Card, Avatar } from 'antd';
import comma from '../../assets/comma.svg';
import smallMan1 from '../../assets/smallMan1.svg';
import smallMan2 from '../../assets/Ellipse 19062.svg';
import smallMan3 from '../../assets/Ellipse 19063.svg';
const CustomerStories = () => {
  return (
    <>
      <div>
        <section>
          <div className="bg-[#F5F7F9] ">
            <div className="flex justify-center items-center   flex-col lg:flex-row  ">
              <div className="flex flex-col mr-20">
                <div className=" items-center justify-center lg:items-start   xl:mt-0">
                  <h1 className="mt-20  text-[50px] font-bold  ">
                    Real Stories from <br />{' '}
                    <span className="flex "> Real Customers </span>
                  </h1>
                  <h1>Get nspired by these stories.</h1>
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
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolorem laborum eum illum molestiae labore cumque atque
                      obcaecati assumenda, hic nisi reiciendis consectetur cum
                      cupiditate.
                    </p>
                    <h1 className="  font-semibold mt-2">Floyd Miles</h1>
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
                  <Avatar src={smallMan2} size={40} />
                  <img className="mt-2" src={comma} alt="" />
                  <div className="flex flex-col   ml-9 text-smallText font-inter text-18 font-normal">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolorem laborum eum illum molestiae labore cumque atque
                      obcaecati assumenda, hic nisi reiciendis consectetur cum
                      cupiditate.
                    </p>
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
                    <Avatar src={smallMan3} size={40} />
                    <img className="mt-2" src={comma} alt="" />
                  </div>

                  <div className="flex flex-col   ml-9 text-smallText font-inter text-18 font-normal">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolorem laborum eum illum molestiae labore cumque atque
                      obcaecati assumenda, hic nisi reiciendis consectetur cum
                      cupiditate.
                    </p>
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
