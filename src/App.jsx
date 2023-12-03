import React from 'react';
import NavBar from './components/Navbar/NavBar';
import SecondPart from './components/MainSection/SecondPart';
import DesignView from './components/MainSection/DesignView';
import Quations from './components/MainSection/Quations';
import CustomerStories from './components/MainSection/CustomerStories';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-screen overflow-y-auto ">
      <NavBar />
      <SecondPart />
      <DesignView />
      <CustomerStories />
      <Quations />
      <Footer />
    </div>
  );
};

export default App;
