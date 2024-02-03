import React from 'react';
import { Input, Form, Image, Typography } from 'antd';
import Invitation from '../assets/be9139e4-0427-4ffc-953a-4b6b05a468cb.jpg';
import { doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const CoupleDetailsPage = () => {
  const { Title } = Typography;
  const state = useLocation();
  const navigate = useNavigate();

  const addDataToFirestore = async (values) => {
    console.log('Val', values);

    try {
      await setDoc(doc(db, 'USERS', state.state.email), {
        yourFirstName: values.yourFirstName,
        partnerFirstName: values.partnerFirstName,
      });
    } catch (error) {
      console.log('adding data firestore error', error);
    } finally {
      navigate('/dashboard', {
        state: {
          email: state.state.email,
        },
      });
    }
  };
  console.log('ALll VAle', state.state.email);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="flex h-screen">
        {/* left part */}
        <div className="w-1/2 h-full  bg-[#FFFDD0] hidden lg:block">
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
                onFinish={addDataToFirestore}
                onFinishFailed={onFinishFailed}
              >
                {/* input */}
                <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
                  <Form.Item
                    label="Your First Name"
                    name="yourFirstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your  First Name!',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Alexandar"
                      style={{ width: 400 }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Your Partner's First Name"
                    name="partnerFirstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your  Your Partner First Name',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Jessica"
                      style={{ width: 400 }}
                    />
                  </Form.Item>
                </div>

                <div className="mt-10 mb-10 items-center justify-center flex">
                  <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-lg w-[400px]">
                    Next
                  </button>
                  {/* <button
                    type="button"
                    class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[400px]"
                  >
                    Next
                  </button> */}
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
