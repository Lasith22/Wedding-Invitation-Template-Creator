import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import MainLogo from '../../assets/MainLogo.svg';
import { Modal, Input } from 'antd';
const NavBar = () => {
  const [isSignUpModalOpen, setSignUpIsModalOpen] = useState(false);
  const showModal = () => {
    setSignUpIsModalOpen(true);
  };
  const handleCancel = () => {
    setSignUpIsModalOpen(false);
  };
  const navigation = [
    { name: 'Templates', href: '#', current: true },
    { name: 'Wedding Website', href: '#', current: false },
    { name: 'Ideas & Advice', href: '#', current: false },
    { name: 'Vendors', href: '#', current: false },
  ];
  return (
    <>
      <div className="  bg-white border-b-2 border-gray-300 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex   h-20 items-center justify-between">
            {/* MainLogo */}
            <div className="flex items-start   ">
              <img src={MainLogo} alt="" className="h-8" />
            </div>

            {/* sections */}

            <div className="flex space-x-4 font-serif">
              {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                  {item.name}
                </a>
              ))}
            </div>

            {/* sign and login button  */}

            <Modal
              cancelButtonProps={false}
              open={isSignUpModalOpen}
              closable={true}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[10px]  lg:text-[30px] font-bold font-manrope">
                  Welcome!
                </h1>
                <h1 className="text-[20px]   font-bold font-manrope">
                  Sign Up for Mad Labs
                </h1>

                {/* input */}
                <div className=" mt-10 flex items-center justify-center flex-col gap-4 ">
                  <Input
                    size="large"
                    placeholder="Email"
                    style={{ width: 400 }}
                  />
                  <Input
                    size="large"
                    placeholder="Passowrd"
                    style={{ width: 400 }}
                  />
                </div>

                <h1 className="mt-10 mx-10 text-[15px]   font-bold font-manrope flex justify-center items-center ">
                  Secure your account with a strong password for creating
                  beautiful wedding invitations
                </h1>

                <div className="mt-10 mb-10">
                  <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]">
                    Sign up
                  </button>
                </div>
              </div>
            </Modal>

            <div className="flex justify-evenly gap-4 font-serif">
              <button
                onClick={showModal}
                class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full"
              >
                Sign up
              </button>

              <button class=" bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
