import React from 'react';

import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Form, message, Alert } from 'antd';
const ResetPassword = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center mt-10 ">
        <h1 className="text-[40px]   font-bold font-manrope">
          Forgot Password
        </h1>
        <h1 className="font-bold font-manrope">
          No problem. We'll send you an email to reset your password.
        </h1>
      </div>
    </>
  );
};

export default ResetPassword;
