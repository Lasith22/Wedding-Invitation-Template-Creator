import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import MainLogo from '../../assets/MainLogo.svg';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Form, message, Alert } from 'antd';
const NavBar = () => {
  const [isSignUpModalOpen, setSignUpIsModalOpen] = useState(false);
  const [logInModalOpen, setLogInMoalOpen] = useState(false);

  const navigate = useNavigate();

  const showLogInModal = () => {
    setLogInMoalOpen(true);
  };
  const handleLogInCancel = () => {
    setLogInMoalOpen(false);
  };

  const showSignInModal = () => {
    setSignUpIsModalOpen(true);
  };
  const handlesignUpCancel = () => {
    setSignUpIsModalOpen(false);
  };
  const navigation = [
    { name: 'Templates', href: '#', current: true },
    { name: 'Wedding Website', href: '#', current: false },
    { name: 'Ideas & Advice', href: '#', current: false },
    { name: 'Vendors', href: '#', current: false },
  ];

  const onFinishLogIn = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((data) => {
        console.log('logData', data);
        navigate('dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle specific errors
        if (
          errorCode === 'auth/user-not-found' ||
          errorCode === 'auth/wrong-password'
        ) {
          message.error('Invalid email or password. Please try again.');
        } else {
          // Handle other errors or display a generic error message
          message.error(errorMessage);
        }

        // You can also log the full error object for debugging purposes
        console.error('Firebase authentication error:', error);
      });
  };

  const onFinishSignIN = (values) => {
    console.log('Success:', values.email);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((data) => {
        console.log('authData', data);
        navigate('dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle specific errors
        if (errorCode === 'auth/email-already-in-use') {
          // Display an error message using Ant Design message component
          message.error(
            'Email address is already in use. Please use a different email.',
          );
        } else {
          // Handle other errors or display a generic error message
          message.error(errorMessage);
        }

        // You can also log the full error object for debugging purposes
        console.error('Firebase authentication error:', error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
              onCancel={handlesignUpCancel}
              footer={null}
            >
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[10px]  lg:text-[30px] font-bold font-manrope">
                  Welcome!
                </h1>
                <h1 className="text-[20px]   font-bold font-manrope">
                  Sign Up for Mad Labs
                </h1>

                <Form
                  layout="vertical"
                  onFinish={onFinishSignIN}
                  onFinishFailed={onFinishFailed}
                >
                  {/* input */}
                  <div className=" mt-3 flex items-center justify-center flex-col gap-0 ">
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Please Enter Your Email"
                        style={{ width: 400 }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Passowrd"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Enter Strong Password"
                        style={{ width: 400 }}
                      />
                    </Form.Item>
                  </div>

                  <h1 className="mt-10 mx-10 text-[15px]   font-bold font-manrope flex justify-center items-center ">
                    Secure your account with a strong password for creating
                    beautiful wedding invitations
                  </h1>

                  <div className="mt-10 mb-10 items-center justify-center flex">
                    <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]">
                      Sign up
                    </button>
                  </div>
                </Form>
              </div>
            </Modal>
            {/* logIn Modal */}
            <Modal
              cancelButtonProps={false}
              open={logInModalOpen}
              closable={true}
              onCancel={handleLogInCancel}
              footer={null}
            >
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[10px]  lg:text-[30px] font-bold font-manrope">
                  Log in to Mad Labs
                </h1>
                {/* <h1 className="text-[20px]   font-bold font-manrope">
                  Sign Up for Mad Labs
                </h1> */}

                <Form
                  layout="vertical"
                  onFinish={onFinishLogIn}
                  onFinishFailed={onFinishFailed}
                >
                  {/* input */}
                  <div className=" mt-10 flex items-center justify-center flex-col gap-4 ">
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Please Enter Your Email"
                        style={{ width: 400 }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Passowrd"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password
                        size="large"
                        placeholder="Enter Strong Password"
                        style={{ width: 400 }}
                      />
                    </Form.Item>
                  </div>

                  <div className="mt-10 mb-10 items-center justify-center flex">
                    <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-3 px-4 rounded-full w-[400px]">
                      Log In
                    </button>
                  </div>
                  <div
                    onClick={() => {
                      navigate('/account/forgot-password/provide-email');
                    }}
                    className="   cursor-pointer mt-10 mx-10 text-[15px]   font-bold font-manrope flex justify-center items-center "
                  >
                    <h1 className="border-black border-b ">
                      Don't remember your password?
                    </h1>
                  </div>
                </Form>
              </div>
            </Modal>

            <div className="flex justify-evenly gap-4 font-serif">
              <button
                onClick={showSignInModal}
                class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full"
              >
                Sign up
              </button>

              <button
                onClick={showLogInModal}
                class=" bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
              >
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
