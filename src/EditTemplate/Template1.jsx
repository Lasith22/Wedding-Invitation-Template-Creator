import React from 'react';
import invitationImage from '../assets/Template.jpg';

const Template1 = (props) => {
  return (
    <>
      <div className="relative max-w-lg mx-auto">
        <img
          src={invitationImage}
          alt="Wedding Invitation Background"
          className="w-full"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl text-center font-bold text-black">
            {props.coupleName}
          </h1>
          <p className="text-xl text-center  text-black my-2">{props.date}</p>
          <p className="text-md text-center  text-black my-2">venue</p>
          <p className="text-md text-center  text-black my-4">customMessage</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            RSVP
          </button>
        </div>
      </div>
    </>
  );
};

export default Template1;
