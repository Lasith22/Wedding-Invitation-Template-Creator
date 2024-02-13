import React, { useState } from 'react';

import FormTemplate from './FormTemplate';
import Template1 from './Template1';
import MainLogo from '../assets/MainLogo.svg';
import { Form, Input, Popconfirm } from 'antd';
const { TextArea } = Input;
const EditTemplate = () => {
  const [coupleName, SetCoupleName] = useState('');
  const onCoupleNameChange = (e) => {
    SetCoupleName(e.target.value);
  };
  console.log('vale', coupleName);
  return (
    <>
      <div className="bg-white border-b-2 border-gray-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex   h-20 items-center justify-between">
            {/* MainLogo */}
            <div className="flex items-start   ">
              <img src={MainLogo} alt="" className="h-8" />
            </div>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className=" bg-[#f1f1f5] h-screen flex justify-evenly items-center">
        <div className="  ">
          <Popconfirm description="HEll">HE</Popconfirm>
          <Form>
            <Input.TextArea onChange={onCoupleNameChange} rows={4} />
          </Form>
        </div>
        <div className="  ">
          <Template1 coupleName={coupleName} date="2024/2/3" />
        </div>
      </div>
    </>
  );
};

export default EditTemplate;
