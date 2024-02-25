import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const PreviewInvitation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <>
      <button
        onClick={() => {
          navigate('/dashboard/editTemplate', {
            state: {
              coupleNames: state.coupleNames,
            },
          });
        }}
        class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[400px]"
      >
        Customize
      </button>
    </>
  );
};

export default PreviewInvitation;
