import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import SecondPart from './MainSection/SecondPart';
import DesignView from './MainSection/DesignView';
import CustomerStories from './MainSection/CustomerStories';
import Quations from './MainSection/Quations';
import Footer from '../components/Footer/Footer';

const SignUp = () => {
  return (
    <div>
      <NavBar />
      <SecondPart />
      <DesignView />
      <CustomerStories />
      <Quations />
      <Footer />
    </div>
  );
};

export default SignUp;
