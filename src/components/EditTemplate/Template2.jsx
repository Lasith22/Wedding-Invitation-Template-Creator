import React, { useState } from 'react';
import invitationImage from '../../assets/weddingCard3.jpeg';
import Draggable from 'react-draggable';
import { Image } from 'antd';

const Template2 = (props) => {
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

  return (
    <>
      <div className="relative max-w-lg mx-auto">
        <Image
          src={invitationImage}
          alt="Wedding Invitation Background"
          width={450}
          height={700}
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center p-4">
          <Draggable>
            <div
              className={` text-center   ${props.selectFonts} border-2 p-3 ${
                isHoveredCoupleName
                  ? ' border-dashed  bg-gray-100'
                  : 'border-none'
              }   `}
              style={{
                color: `${props.color}`,
                fontSize: props.fontSize,
                cursor: 'move',
              }}
              onClick={handleClick}
              onMouseEnter={() => setIsHoveredCoupleName(true)}
              onMouseLeave={() => setIsHoveredCoupleName(false)}
            >
              {props.coupleName}
            </div>
          </Draggable>
          <Draggable>
            <p
              style={{
                cursor: 'move',
              }}
              onClick={handleClick}
              onMouseEnter={() => setIsHoveredCustomMessage(true)}
              onMouseLeave={() => setIsHoveredCustomMessage(false)}
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
          </Draggable>
          {props.selectedSvg.map((SvgComponent, index) => (
            <Draggable key={index}>
              <div
                // className="  hover:resize overflow-hidden"
                style={{
                  cursor: 'move',
                  position: 'absolute',
                }}
              >
                <SvgComponent style={{ width: '100px', height: '100px' }} />
              </div>
            </Draggable>
          ))}

          <p className="text-xl text-center  text-black my-2">{props.date}</p>

          <p className="text-md text-center  text-black my-2">{props.venue}</p>
        </div>
      </div>
    </>
  );
};

export default Template2;
