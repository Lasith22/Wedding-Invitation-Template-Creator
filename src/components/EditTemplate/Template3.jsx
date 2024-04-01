import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Image } from 'antd';
import {
  singlishToUnicode,
  singlishPhoneticToUnicode,
  unicodeToDlManel,
  dlManelToUnicode,
  unicodeToKaputa,
} from 'sinhala-unicode-coverter';
import invitationImage from '../../assets/weddingCard2.jpeg';

const Template3 = (props) => {
  const [isHoveredCoupleName, setIsHoveredCoupleName] = useState(false);
  const [isHoveredCustomMessage, setIsHoveredCustomMessage] = useState(false);

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
          <Draggable bounds="parent">
            <div
              className={`text-center ${props.selectFonts} border-2 p-3 ${
                isHoveredCoupleName
                  ? ' border-dashed border-black bg-gray-50'
                  : 'border-none'
              }   `}
              style={{
                color: `${props.coupleNameColor}`,
                fontSize: props.fontSize,
                cursor: 'move',
              }}
              onClick={() => props.onEdit('coupleName')}
              onMouseEnter={() => setIsHoveredCoupleName(true)}
              onMouseLeave={() => setIsHoveredCoupleName(false)}
            >
              {props.coupleName}
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <p
              style={{
                cursor: 'move',
                fontSize: props.fontsizeCustomMessage,
                color: `${props.customMessageColor}`,
              }}
              onClick={() => props.onEdit('customMessage')}
              onMouseEnter={() => setIsHoveredCustomMessage(true)}
              onMouseLeave={() => setIsHoveredCustomMessage(false)}
              className={`text-md text-center  ${
                props.selectFontsForMessage
              } border-2 p-3 ${
                isHoveredCustomMessage
                  ? ' border-dashed bg-gray-100'
                  : 'border-none'
              }  text-black my-4`}
            >
              {props.customMessage}
            </p>
          </Draggable>
          {props.selectedSvg &&
            props.selectedSvg.map((SvgComponent, index) => (
              <Draggable key={index} bounds="parent">
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

export default Template3;
