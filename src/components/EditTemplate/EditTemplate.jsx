import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { ShareAltOutlined, FilePdfOutlined } from '@ant-design/icons';
import Template1 from '../../components/EditTemplate/Template1';
import MainLogo from '../../assets/MainLogo.svg';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Dropdown,
  DatePicker,
  Modal,
  Drawer,
  Select,
  ColorPicker,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { HexColorPicker } from 'react-colorful';

const EditTemplate = () => {
  const { t } = useTranslation();
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [coupleNameFonts, setCoupleNameFont] = useState('font-sinhala1');
  const [customMessageFont, setCustomeMessageFont] = useState('font-sinhala');
  const [color, setColor] = useState('  ');

  const pdfRef = useRef();
  const onCoupleNameChange = (e) => {
    SetCoupleName(e.target.value);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const onCustomeMessage = (e, date) => {
    setCustomeMessage(e.target.value);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSelectFonts = (value) => {
    setCoupleNameFont(value);
  };

  const handleColorPick = (value, hex) => {
    setColor(hex);
  };
  console.log('Color', color);
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
                {t('NEXT')}
              </button>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className=" bg-[#f1f1f5] h-screen flex justify-evenly items-center relative overflow-hidden">
        <Drawer
          width={100}
          height={80}
          placement="top"
          closeIcon={false}
          onClose={onClose}
          open={openDrawer}
          getContainer={false}
          style={{
            position: 'absolute',
          }}
        >
          <div className="flex justify-center items-center gap-10">
            <Select
              style={{ width: 200 }}
              onChange={handleSelectFonts}
              defaultValue={'font-sinhala1'}
              options={[
                {
                  value: 'font-sinhala1',
                  label: (
                    <span className=" font-sinhala1">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala2',
                  label: (
                    <span className=" font-sinhala2">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala3',
                  label: (
                    <span className=" font-sinhala3">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala4',
                  label: (
                    <span className=" font-sinhala4">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala5',
                  label: (
                    <span className=" font-sinhala5">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala6',
                  label: (
                    <span className=" font-sinhala6">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala7',
                  label: (
                    <span className=" font-sinhala7">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala8',
                  label: (
                    <span className=" font-sinhala8">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala9',
                  label: (
                    <span className=" font-sinhala9">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala10',
                  label: (
                    <span className=" font-sinhala10">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala11',
                  label: (
                    <span className=" font-sinhala11">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala12',
                  label: (
                    <span className=" font-sinhala12">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala13',
                  label: (
                    <span className=" font-sinhala13">Sachini & Lasith</span>
                  ),
                },
                {
                  value: 'font-sinhala14',
                  label: (
                    <span className=" font-sinhala14">Sachini & Lasith</span>
                  ),
                },
              ]}
            />
            <ColorPicker onChange={handleColorPick} />
          </div>
        </Drawer>
        <div className="  ">
          <Form layout="vertical">
            <div className=" mt-3 flex items-center justify-center flex-col gap-1">
              <div className=" flex justify-between items-center gap-3">
                <Form.Item label="Enter Couple Names">
                  <Input.TextArea
                    defaultValue={coupleName}
                    onChange={onCoupleNameChange}
                    style={{ width: 400 }}
                  />
                </Form.Item>

                <Select
                  style={{ width: 200 }}
                  onChange={handleSelectFonts}
                  defaultValue={'font-sinhala1'}
                  options={[
                    {
                      value: 'font-sinhala1',
                      label: (
                        <span className=" font-sinhala1">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala2',
                      label: (
                        <span className=" font-sinhala2">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala3',
                      label: (
                        <span className=" font-sinhala3">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala4',
                      label: (
                        <span className=" font-sinhala4">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala5',
                      label: (
                        <span className=" font-sinhala5">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala6',
                      label: (
                        <span className=" font-sinhala6">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala7',
                      label: (
                        <span className=" font-sinhala7">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala8',
                      label: (
                        <span className=" font-sinhala8">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala9',
                      label: (
                        <span className=" font-sinhala9">Sachini & Lasith</span>
                      ),
                    },
                    {
                      value: 'font-sinhala10',
                      label: (
                        <span className=" font-sinhala10">
                          Sachini & Lasith
                        </span>
                      ),
                    },
                    {
                      value: 'font-sinhala11',
                      label: (
                        <span className=" font-sinhala11">
                          Sachini & Lasith
                        </span>
                      ),
                    },
                    {
                      value: 'font-sinhala12',
                      label: (
                        <span className=" font-sinhala12">
                          Sachini & Lasith
                        </span>
                      ),
                    },
                    {
                      value: 'font-sinhala13',
                      label: (
                        <span className=" font-sinhala13">
                          Sachini & Lasith
                        </span>
                      ),
                    },
                    {
                      value: 'font-sinhala14',
                      label: (
                        <span className=" font-sinhala14">
                          Sachini & Lasith
                        </span>
                      ),
                    },
                  ]}
                />
              </div>

              <div className=" flex justify-between items-center gap-3">
                <Form.Item label="Enter Custom Message">
                  <Input.TextArea
                    defaultValue={customMessage}
                    onChange={onCustomeMessage}
                    rows={4}
                    style={{ width: 400 }}
                  />
                </Form.Item>
                <Select style={{ width: 200 }} />
              </div>

              <div className=" flex justify-between items-center gap-3">
                <Form.Item label="Enter Date">
                  <DatePicker
                    style={{ width: 400 }}
                    defaultValue={dayjs()}
                    onChange={onDateChange}
                  />
                </Form.Item>
                <Select style={{ width: 200 }} />
              </div>

              <div className=" flex justify-between items-center gap-3">
                <Form.Item label="Enter Venue">
                  <Input.TextArea
                    defaultValue={venue}
                    onChange={onvenueChange}
                    rows={2}
                    style={{ width: 400 }}
                  />
                </Form.Item>
                <Select style={{ width: 200 }} />
              </div>
            </div>
          </Form>
        </div>
        <div ref={pdfRef}>
          <Template1
            customMessage={customMessage}
            coupleName={coupleName}
            date={date}
            venue={venue}
            onClickCoupleName={showDrawer}
            selectFonts={coupleNameFonts}
            color={color}
          />
        </div>
        <Modal
          footer={null}
          width={700} // Adjust the width of the modal as needed
          style={{ maxHeight: '80vh' }} // Adjust the max height of the modal as needed
          title={
            <div className="custom-modal-title border-b-2 border-gray-200 p-4">
              Share
            </div>
          }
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <div className="flex justify-between items-center gap-5 ">
            <div className=" flex flex-1 bg-slate-100 p-5">
              <Template1
                customMessage={customMessage}
                coupleName={coupleName}
                date={date}
                venue={venue}
                selectFonts={coupleNameFonts}
              />
            </div>
            <div className=" flex flex-1 items-center justify-center ">
              <Form layout="vertical">
                {/* input */}
                <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
                  <Form.Item label="Your Name" name="name">
                    <Input size="large" placeholder="Enter Your Name" />
                  </Form.Item>

                  <Form.Item label="To" name="email">
                    <Input.TextArea
                      size="large"
                      placeholder="Enter  Your Email"
                    />
                  </Form.Item>
                </div>

                <div className="mt-10 mb-10 items-center justify-center flex">
                  <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[200px]  ">
                    Send
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EditTemplate;
