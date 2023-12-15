import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Designs from './MainScreen/Designs';
import SignUp from './HomePage/SignUp';
import ResetPassword from './ResetPassword/ResetPassword';
import CoupleDetailsPage from './MainScreen/CoupleDetailsPage';
const App = () => {
  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 right-0 w-screen h-screen overflow-y-auto ">
        <Routes>
          <Route path="/dashboard" element={<Designs />} />
          <Route path="/" element={<SignUp />} />

          <Route
            path="/account/forgot-password/provide-email"
            element={<ResetPassword />}
          />

          <Route
            path="/account/forgot-password/provide-email"
            element={<ResetPassword />}
          />
          <Route
            path="/account/coupleDetails"
            element={<CoupleDetailsPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
