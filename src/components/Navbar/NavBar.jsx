import React, { useState } from 'react';

import MainLogo from '../../assets/MainLogo.svg';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Form, message, Select, Spin } from 'antd';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
const NavBar = () => {
  const [isSignUpModalOpen, setSignUpIsModalOpen] = useState(false);
  const [logInModalOpen, setLogInMoalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('si');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();

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
    { name: t('TEMPLATES'), href: '#', current: true },
    { name: t('WEDDING_WEBSITE'), href: '#', current: false },
    { name: t('IDEAS'), href: '#', current: false },
    { name: t('VENDORS'), href: '#', current: false },
  ];

  const onFinishLogIn = async (values) => {
    try {
      setLoading(true);
      const data = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      console.log('logData', data);
      navigate('dashboard', {
        state: {
          email: values.email,
        },
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle specific errors
      if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/wrong-password'
      ) {
        message.error(t('INVALID_EMAIL'));
      } else {
        // Handle other errors or display a generic error message
        message.error(errorMessage);
      }

      // Log the full error object for debugging purposes
      console.error('Firebase authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishSignUp = (values) => {
    console.log('Success:', values.email);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((data) => {
        console.log('authData', data);
        navigate('/account/coupleDetails', {
          state: {
            email: values.email,
            password: values.password,
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle specific errors
        if (errorCode === 'auth/email-already-in-use') {
          // Display an error message using Ant Design message component
          message.error(t('EMAIL_ALREADY'));
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

  const handleLanguageChange = (value) => {
    setSelectedLanguage(i18next.changeLanguage(value));
  };
  return (
    <>
      <Spin spinning={loading} tip="Loading...">
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
                    {t('WELCOME')}
                  </h1>
                  <h1 className="text-[20px]   font-bold font-manrope">
                    {t('SIGN_UP_FOR')}
                  </h1>

                  <Form
                    layout="vertical"
                    onFinish={onFinishSignUp}
                    onFinishFailed={onFinishFailed}
                  >
                    {/* input */}
                    <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
                      <Form.Item
                        label={t('PASSWORD')}
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: t('PLEASE_INPUT'),
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder={t('PLEASE_ENTER')}
                          style={{ width: 400 }}
                        />
                      </Form.Item>

                      <Form.Item
                        label={t('PASSWORD')}
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: t('PLEASE_INPUT_PASSOWRD'),
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder={t('ENTER_STRONG')}
                          style={{ width: 400 }}
                        />
                      </Form.Item>
                    </div>

                    <h1 className="mt-2 mx-10 text-[15px]   font-bold font-manrope flex justify-center items-center ">
                      {t('SECURE_YOUR_ACCOUNT')}
                    </h1>

                    <div className="mt-10 mb-10 items-center justify-center flex">
                      <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]">
                        {t('SIGN_UP')}
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
                    {t('LOG_IN_TO')}
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
                        label={t('EMAIL')}
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: t('PLEASE_INPUT'),
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder={t('PLEASE_ENTER')}
                          style={{ width: 400 }}
                        />
                      </Form.Item>

                      <Form.Item
                        label={t('PASSWORD')}
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: t('PLEASE_INPUT_PASSOWRD'),
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder={t('ENTER_STRONG')}
                          style={{ width: 400 }}
                        />
                      </Form.Item>
                    </div>

                    <div className="mt-10 mb-10 items-center justify-center flex">
                      <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-3 px-4 rounded-full w-[400px]">
                        {t('LOG_IN')}
                      </button>
                    </div>
                    <div
                      onClick={() => {
                        navigate('/account/forgot-password/provide-email');
                      }}
                      className="cursor-pointer mt-10 mx-10 text-[15px]   font-bold font-manrope flex justify-center items-center "
                    >
                      <h1 className="border-black border-b ">
                        {t('DONT_REMEMBER')}
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
                  {t('SIGN_UP')}
                </button>

                <button
                  onClick={showLogInModal}
                  class=" bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                >
                  {t('LOG_IN')}
                </button>
              </div>

              <div className="flex justify-between items-center gap-1">
                <MdLanguage size={30} color="pink" />
                <Select
                  defaultValue={selectedLanguage}
                  onChange={handleLanguageChange}
                  options={[
                    {
                      value: 'si',
                      label: 'සිංහල',
                    },
                    {
                      value: 'en',
                      label: 'ENGLISH',
                    },
                  ]}
                  style={{ width: 100 }}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default NavBar;
