import React from 'react';
import { Modal, Input, Form, message, Alert, Image, Typography } from 'antd';
import Invitation from '../assets/be9139e4-0427-4ffc-953a-4b6b05a468cb.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const CoupleDetailsPage = () => {
  const { Title } = Typography;
  const state = useLocation();
  const navigate = useNavigate();

  const onFinishSignIN = (values) => {
    console.log('Val', values);
  };
  console.log('ALll VAle', state.state.email);
  return (
    <>
      <div className="flex h-screen">
        {/* left part */}
        <div className="w-1/2 h-full  bg-[#FFFDD0]">
          <div className="flex flex-col justify-center items-center mx-60">
            <div className="lg:mt-20  mt-40">
              <h1 className="text-[30px] ">
                Join over one million happy couples who planned their wedding
                with Mad labs.
              </h1>
            </div>

            <div className=" mt-10  ">
              <Image src={Invitation} />
            </div>
          </div>
        </div>

        {/* rigt part */}
        <div className="w-1/2  ">
          <div className="flex flex-col justify-center items-center  ">
            <div className=" pt-20 text-3xl text-pink-700  ">
              <Title style={{ color: 'pink' }} italic level={2}>
                Mad Labs
              </Title>
            </div>

            <h1 className="text-[30px] font-bold font-manrope">
              Let’s get ready to get planning
            </h1>

            <h1 className=" text-gray-500 font-manrope">
              We'll need a few details first.
            </h1>

            <div>
              <Form
                layout="vertical"
                // onFinish={onFinishSignUp}
                // onFinishFailed={onFinishFailed}
              >
                {/* input */}
                <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
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
                    <Input
                      size="large"
                      placeholder="Enter Strong Password"
                      style={{ width: 400 }}
                    />
                  </Form.Item>
                </div>

                <div className="mt-10 mb-10 items-center justify-center flex">
                  <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]">
                    Sign up
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoupleDetailsPage;
