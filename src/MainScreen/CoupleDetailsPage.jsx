import React from 'react';
import { Modal, Input, Form, message, Alert } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const CoupleDetailsPage = () => {
  const state = useLocation();
  const navigate = useNavigate();

  const onFinishSignIN = (values) => {
    console.log('Val', values);
    // createUserWithEmailAndPassword(auth, state.email, state.password)
    //   .then((data) => {
    //     console.log('authData', data);
    //     navigate('/dashboard', {
    //       state: {
    //         firstName: values.name,
    //         lastName: values.cName,
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;

    //     if (errorCode === 'auth/email-already-in-use') {
    //       message.error(
    //         'Email address is already in use. Please use a different email.',
    //       );
    //     } else {
    //       message.error(errorMessage);
    //     }

    //     console.error('Firebase authentication error:', error);
    //   });

    // navigate('/dashboard', {
    //   state: {
    //     firstName: values.name,
    //     lastName: values.cName,
    //   },
    // });
  };
  console.log('ALll VAle', state.state.email);
  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinishSignIN}
        //   onFinishFailed={onFinishFailed}
      >
        {/* input */}
        <div className=" mt-3 flex items-center justify-center flex-col gap-0 ">
          <Form.Item
            label="Email"
            name="name"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your email!',
            //   },
            // ]}
          >
            <Input
              size="large"
              placeholder="Please Enter Your Email"
              style={{ width: 400 }}
            />
          </Form.Item>

          <Form.Item
            label="Parten name"
            name="cName"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your password!',
            //   },
            // ]}
          >
            <Input
              size="large"
              placeholder="Enter Strong Password"
              style={{ width: 400 }}
            />
          </Form.Item>
        </div>

        {/* <h1 className="mt-10 mx-10 text-[15px]   font-bold font-manrope flex justify-center items-center ">
          Secure your account with a strong password for creating beautiful
          wedding invitations
        </h1> */}

        <div></div>

        <div className="mt-10 mb-10 items-center justify-center flex">
          <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]">
            Sign up
          </button>
        </div>
      </Form>
    </>
  );
};

export default CoupleDetailsPage;
