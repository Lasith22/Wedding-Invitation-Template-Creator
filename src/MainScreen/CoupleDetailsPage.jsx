import React from 'react';
import { Input, Form, Image, Typography } from 'antd';
import Invitation from '../assets/wc-5-500x500.jpg';
import { doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';

const CoupleDetailsPage = () => {
  const { t } = useTranslation();
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
              <h1 className="text-[30px] ">{t('JOIN_OVER')}</h1>
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
                හෙල වෙඩිම
              </Title>
            </div>

            <h1 className="text-[30px] font-bold font-manrope">
              {t('LETS_GET')}
            </h1>

            <h1 className=" text-gray-500 font-manrope">{t('WE_WILL_NEED')}</h1>

            <div>
              <Form
                layout="vertical"
                onFinish={addDataToFirestore}
                onFinishFailed={onFinishFailed}
              >
                {/* input */}
                <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
                  <Form.Item
                    label={t('YOUR_FIRST')}
                    name="yourFirstName"
                    rules={[
                      {
                        required: true,
                        message: t('PLEASE_INPUT_YOUR_FIRST'),
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="ලසිත්"
                      style={{ width: 400 }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={t('YOUR_PARTNERS')}
                    name="partnerFirstName"
                    rules={[
                      {
                        required: true,
                        message: t('PLEASE_INPUT_YOUR_PARTNER'),
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="කසුනි"
                      style={{ width: 400 }}
                    />
                  </Form.Item>
                </div>

                <div className="mt-10 mb-10 items-center justify-center flex">
                  <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-lg w-[400px]">
                    {t('NEXT')}
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
