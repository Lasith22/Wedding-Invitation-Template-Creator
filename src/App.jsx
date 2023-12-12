import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Designs from './MainScreen/Designs';
import SignUp from './HomePage/SignUp';
const App = () => {
  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 right-0 w-screen h-screen overflow-y-auto ">
        <Routes>
          <Route path="/dashboard" element={<Designs />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
