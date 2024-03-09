import React, { useState } from 'react';
import invitationImage from '../../assets/Template.jpg';

const Template1 = (props) => {
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Initial position
  const [isHoveredCoupleName, setIsHoveredCoupleName] = useState(false);
  const [isHoveredCustomMessage, setIsHoveredCustomMessage] = useState(false);

  const handleDrag = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleClick = () => {
    if (props.onClickCoupleName) {
      props.onClickCoupleName();
    }
  };
  console.log('hell', props.color);
  return (
    <>
      <div className="relative max-w-lg mx-auto">
        <img
          src={invitationImage}
          alt="Wedding Invitation Background"
          className="w-full"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center p-4">
          <div
            className={`text-4xl text-center     ${
              props.selectFonts
            }   border-2 p-3 ${
              isHoveredCoupleName
                ? ' border-dashed  bg-gray-100'
                : 'border-none'
            }   `}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: 'move',
              color: `${props.color}`,
            }}
            draggable="true"
            onDragEnd={handleDrag}
            onClick={handleClick}
            onMouseEnter={() => setIsHoveredCoupleName(true)}
            onMouseLeave={() => setIsHoveredCoupleName(false)}
          >
            {props.coupleName}
          </div>
          <p
            onClick={handleClick}
            onMouseEnter={() => setIsHoveredCustomMessage(true)}
            onMouseLeave={() => setIsHoveredCustomMessage(false)}
            draggable="true"
            className={`text-md text-center  ${
              props.selectFonts
            } border-2 p-3 ${
              isHoveredCustomMessage
                ? ' border-dashed bg-gray-100'
                : 'border-none'
            }  text-black my-4`}
          >
            {props.customMessage}
          </p>
          <p className="text-xl text-center  text-black my-2">{props.date}</p>
          <p className="text-md text-center  text-black my-2">{props.venue}</p>
        </div>
      </div>
    </>
  );
};

export default Template1;
