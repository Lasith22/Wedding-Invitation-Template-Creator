import React from 'react';

import MainLogo from '../../assets/MainLogo.svg';

const NavBar = () => {
  const navigation = [
    { name: 'Templates', href: '#', current: true },
    { name: 'Wedding Website', href: '#', current: false },
    { name: 'Ideas & Advice', href: '#', current: false },
    { name: 'Vendors', href: '#', current: false },
  ];
  return (
    <>
      <div className="  bg-white border-b-2 border-gray-300 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex   h-20 items-center justify-between">
            {/* MainLogo */}
            <div className="flex items-start   ">
              <img src={MainLogo} alt="" className="h-8" />
            </div>

            {/* sections */}

            <div className="flex space-x-4 font-serif">
              {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                  {item.name}
                </a>
              ))}
            </div>

            {/* sign and login button  */}

            <div className="flex justify-evenly gap-4 font-serif">
              <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full">
                Sign up
              </button>

              <button class=" bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
