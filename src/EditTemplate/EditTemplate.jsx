import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { ShareAltOutlined, FilePdfOutlined } from '@ant-design/icons';
import Template1 from './Template1';
import MainLogo from '../assets/MainLogo.svg';
import dayjs from 'dayjs';
import { Form, Input, Dropdown, DatePicker, Modal } from 'antd';
const { TextArea } = Input;
const EditTemplate = () => {
  const { state } = useLocation();
  const [coupleName, SetCoupleName] = useState(
    `${state.coupleNames.partnerFirstName} & ${state.coupleNames.yourFirstName}`,
  );

  const [customMessage, setCustomeMessage] = useState(
    'REQUEST YOUR PRESENCE AT THE CEREMONY & CELEBRATION OF THEIR MARRIAGE',
  );
  const [date, setDate] = useState(dayjs().format('YYYY MM-DD '));
  const [venue, setvnue] = useState('Colmbo');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pdfRef = useRef();
  const onCoupleNameChange = (e) => {
    SetCoupleName(e.target.value);
  };

  const onCustomeMessage = (value, date) => {
    setCustomeMessage(value);
  };

  const onDateChange = (date, dateString) => {
    setDate(dateString);
  };

  const onvenueChange = (e) => {
    setvnue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      pdf.save('Your Template.pdf');
    });
  };
  const items = [
    {
      label: <h1 onClick={handleDownloadPDF}> Download PDF</h1>,
      key: '1',
      icon: <FilePdfOutlined />,
    },
    {
      label: <h1 onClick={showModal}>Share</h1>,
      key: '2',
      icon: <ShareAltOutlined />,
    },
  ];

  console.log('vale', state.coupleNames);
  return (
    <>
      <div className="bg-white border-b-2 border-gray-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex   h-20 items-center justify-between">
            {/* MainLogo */}
            <div className="flex items-start   ">
              <img src={MainLogo} alt="" className="h-8" />
            </div>

            <Dropdown
              menu={{
                items,
              }}
              trigger={['hover']}
            >
              <button
                type="button"
                className="border text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2   "
                // class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Next
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className=" bg-[#f1f1f5] h-screen flex justify-evenly items-center">
        <div className="  ">
          <div className=" "> </div>
          <Form>
            <Input.TextArea
              className=" font-sinhala"
              defaultValue={coupleName}
              onChange={onCoupleNameChange}
              rows={2}
            />
            <Input.TextArea
              defaultValue={customMessage}
              onChange={onCustomeMessage}
              rows={4}
            />
            <DatePicker defaultValue={dayjs()} onChange={onDateChange} />
            <Input.TextArea
              defaultValue={venue}
              onChange={onvenueChange}
              rows={2}
            />
          </Form>
        </div>
        <div ref={pdfRef}>
          <Template1
            customMessage={customMessage}
            coupleName={coupleName}
            date={date}
            venue={venue}
          />
        </div>
        <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </>
  );
};

export default EditTemplate;
