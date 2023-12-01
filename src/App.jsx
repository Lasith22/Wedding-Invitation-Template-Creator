import React from 'react';
import NavBar from './components/Navbar/NavBar';
import SecondPart from './components/MainSection/SecondPart';

const App = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-screen overflow-y-auto ">
      <NavBar />
      <SecondPart />
    </div>
  );
};

export default App;
