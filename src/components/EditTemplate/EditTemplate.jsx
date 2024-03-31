import React, { useRef, useState } from 'react';
import {
  singlishToUnicode,
  singlishPhoneticToUnicode,
  unicodeToDlManel,
  dlManelToUnicode,
  unicodeToKaputa,
  baminiToUnicode,
} from 'sinhala-unicode-coverter';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { BiSolidSticker } from 'react-icons/bi';
import { ShareAltOutlined, FilePdfOutlined } from '@ant-design/icons';
import Template1 from '../../components/EditTemplate/Template1';
import Template2 from './Template2';
import Template3 from './Template3';
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
  Spin,
} from 'antd';
import { useTranslation } from 'react-i18next';
import SVGs from '../../svgComponents';
import CustomDrawer from './CustomDrawer';
import Template4 from './Template4';
import Template5 from './Template5';
const EditTemplate = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  console.log('final state', state);
  const [coupleName, setCoupleName] = useState(
    `${state.coupleNames.partnerFirstName} & ${state.coupleNames.yourFirstName}`,
  );

  const [customMessage, setCustomeMessage] = useState(
    'REQUEST YOUR PRESENCE AT THE CEREMONY & CELEBRATION OF THEIR MARRIAGE',
  );
  const [date, setDate] = useState(dayjs().format('YYYY MM-DD '));
  const [venue, setvnue] = useState('Colmbo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openStickerDrawer, setOpenStickerDrawer] = useState(false);
  const [coupleNameFonts, setCoupleNameFont] = useState('font-sinhala1');
  const [customMessageFont, setCustomeMessageFont] = useState('font-sinhala2');
  const [coupleNameColor, setCoupleNameColor] = useState('#000000');
  const [customMessageColor, setCustomMessageColor] = useState('#000000');
  const [coupleNameFontSize, setCoupleNameFontSize] = useState(30);
  const [customMessageFontSize, setCustomMessageFontSize] = useState(30);
  const [selectedSvgs, setSelectedSvgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const showDrawerFor = (element) => {
    setEditingElement(element);
    showDrawer();
  };

  const handleSelectFonts = (value) => {
    if (editingElement === 'coupleName') {
      setCoupleNameFont(value);
    } else if (editingElement === 'customMessage') {
      setCustomeMessageFont(value);
    }
  };
  const handleColorPick = (color, hex) => {
    if (editingElement === 'coupleName') {
      setCoupleNameColor(hex);
    } else if (editingElement === 'customMessage') {
      setCustomMessageColor(hex);
    }
  };
  const handleFontSizeChange = (sizeChange) => {
    if (editingElement === 'coupleName') {
      setCoupleNameFontSize(sizeChange);
    } else if (editingElement === 'customMessage') {
      setCustomMessageFontSize(sizeChange);
    }
  };

  const pdfRef = useRef();
  const onCoupleNameChange = (e) => {
    setCoupleName(e.target.value);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const showStickerDrawer = () => {
    setOpenStickerDrawer(true);
  };
  const closeStickerDrawer = () => {
    setOpenStickerDrawer(false);
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

  // Function to handle SVG selection
  const handleSelectSvg = (SvgComponent) => {
    setSelectedSvgs([...selectedSvgs, SvgComponent]);
  };

  const sendTemplateViaEmail = (value) => {
    const sendEmail = httpsCallable(functions, 'sendEmailWithSendGrid');
    sendEmail({
      to: value.guestEmail,
      subject: 'Hello from lasiths template',
    })
      .then((result) => {
        if (result.data.success) {
          console.log('Email sent successfully');
        } else {
          console.error('Error sending email:', result.data.error);
        }
      })
      .catch((error) => {
        console.error('Error calling sendEmail function:', error);
      });
  };

  const svgs = [
    { id: 'svg1', component: SVGs.Svg1 },
    { id: 'svg13', component: SVGs.Svg13 },
    { id: 'svg8', component: SVGs.Svg8 },
    { id: 'svg9', component: SVGs.Svg9 },
    { id: 'svg10', component: SVGs.Svg10 },
    { id: 'svg14', component: SVGs.Svg14 },
    { id: 'svg11', component: SVGs.Svg11 },
    { id: 'svg12', component: SVGs.Svg12 },
    { id: 'svg15', component: SVGs.Svg15 },

    { id: 'svg16', component: SVGs.Svg16 },
    { id: 'svg17', component: SVGs.Svg17 },
    { id: 'svg18', component: SVGs.Svg18 },
    { id: 'svg19', component: SVGs.Svg19 },
    { id: 'svg20', component: SVGs.Svg20 },
  ];
  const handleDownloadPDF = () => {
    setLoading(true); // Start loading
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        // Added scale option for better resolution
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2; // Center the image vertically
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio,
        );
        pdf.save('Your_Template.pdf');
        setLoading(false); // Stop loading after saving the PDF
      })
      .catch((err) => {
        console.error('Error generating PDF', err);
        setLoading(false); // Ensure loading stops if there's an error
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
  const renderTemplate = () => {
    switch (state.ref) {
      case 'template1':
        return (
          <Template1
            customMessage={customMessage}
            coupleName={coupleName}
            coupleNameColor={coupleNameColor}
            customMessageColor={customMessageColor}
            date={date}
            venue={venue}
            onClickCoupleName={showDrawer}
            selectFonts={coupleNameFonts}
            selectFontsForMessage={customMessageFont}
            fontSize={coupleNameFontSize}
            fontsizeCustomMessage={customMessageFontSize}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );

      case 'template2':
        return (
          <Template2
            customMessage={customMessage}
            coupleName={coupleName}
            coupleNameColor={coupleNameColor}
            customMessageColor={customMessageColor}
            date={date}
            venue={venue}
            onClickCoupleName={showDrawer}
            selectFonts={coupleNameFonts}
            selectFontsForMessage={customMessageFont}
            fontSize={coupleNameFontSize}
            fontsizeCustomMessage={customMessageFontSize}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );

      case 'template3':
        return (
          <Template3
            customMessage={customMessage}
            coupleName={coupleName}
            coupleNameColor={coupleNameColor}
            customMessageColor={customMessageColor}
            date={date}
            venue={venue}
            onClickCoupleName={showDrawer}
            selectFonts={coupleNameFonts}
            selectFontsForMessage={customMessageFont}
            fontSize={coupleNameFontSize}
            fontsizeCustomMessage={customMessageFontSize}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );

      case 'template4':
        return (
          <Template4
            customMessage={customMessage}
            coupleName={coupleName}
            coupleNameColor={coupleNameColor}
            customMessageColor={customMessageColor}
            date={date}
            venue={venue}
            onClickCoupleName={showDrawer}
            selectFonts={coupleNameFonts}
            selectFontsForMessage={customMessageFont}
            fontSize={coupleNameFontSize}
            fontsizeCustomMessage={customMessageFontSize}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );
      case 'template5':
        return (
          <Template5
            customMessage={customMessage}
            coupleName={coupleName}
            coupleNameColor={coupleNameColor}
            customMessageColor={customMessageColor}
            date={date}
            venue={venue}
            onClickCoupleName={showDrawer}
            selectFonts={coupleNameFonts}
            selectFontsForMessage={customMessageFont}
            fontSize={coupleNameFontSize}
            fontsizeCustomMessage={customMessageFontSize}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );

      default:
        return <div>No template selected</div>;
    }
  };
  return (
    <>
      <div className="bg-white border-b-2 border-gray-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex   h-20 items-center justify-between">
            {/* MainLogo */}
            <div className="flex items-start   ">
              <img src={MainLogo} alt="" className="h-8" />
            </div>
            <div
              onClick={showStickerDrawer}
              className="flex justify-center   items-center gap-1 cursor-pointer hover:bg-slate-100 hover:p-2 hover:rounded-lg"
            >
              <BiSolidSticker size={30} color="pink" />
              <h1>Add stickers</h1>
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

      <Spin spinning={loading} tip="Generating PDF...">
        <div className=" bg-[#f1f1f5] h-screen flex justify-evenly items-center relative overflow-hidden">
          <CustomDrawer
            onClose={onClose}
            fontSize={
              editingElement === 'coupleName'
                ? coupleNameFontSize
                : customMessageFontSize
            }
            setFontSize={handleFontSizeChange}
            open={openDrawer}
            handleColorChange={handleColorPick}
            color={
              editingElement === 'coupleName'
                ? coupleNameColor
                : customMessageColor
            }
            selectFonts={
              editingElement === 'coupleName'
                ? coupleNameFonts
                : customMessageFont
            }
            handleSelectFonts={handleSelectFonts}
            editingElement={editingElement}
          />
          {/* <Drawer
            width={100}
            height={80}
            placement="top"
            closeIcon={false}
            onClose={onClose}
            open={openDrawer}
            getContainer={false}
          >
            <div className="flex justify-center items-center gap-10">
              <Select
                style={{ width: 300 }}
                onChange={handleSelectFonts}
                defaultValue={'font-sinhala1'}
                options={[
                  {
                    value: 'font-sinhala1',
                    label: (
                      <span className=" font-sinhala1 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala2',
                    label: (
                      <span className=" font-sinhala2 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala3',
                    label: (
                      <span className=" font-sinhala3 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala4',
                    label: (
                      <span className=" font-sinhala4 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala5',
                    label: (
                      <span className=" font-sinhala5 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala6',
                    label: (
                      <span className=" font-sinhala6 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala7',
                    label: (
                      <span className=" font-sinhala7 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala8',
                    label: (
                      <span className=" font-sinhala8 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala9',
                    label: (
                      <span className=" font-sinhala9 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala10',
                    label: (
                      <span className=" font-sinhala10 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala11',
                    label: (
                      <span className=" font-sinhala11 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala12',
                    label: (
                      <span className=" font-sinhala12 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala13',
                    label: (
                      <span className=" font-sinhala13 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala14',
                    label: (
                      <span className=" font-sinhala14 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala15',
                    label: (
                      <span className=" font-sinhala15 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala16',
                    label: (
                      <span className=" font-sinhala16 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala17',
                    label: (
                      <span className=" font-sinhala17 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala18',
                    label: (
                      <span className=" font-sinhala18 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala19',
                    label: (
                      <span className=" font-sinhala19 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala20',
                    label: (
                      <span className=" font-sinhala20 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala21',
                    label: (
                      <span className=" font-sinhala21 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                  {
                    value: 'font-sinhala34',
                    label: (
                      <span className=" font-sinhala34 text-2xl">
                        Sachini & Lasith
                      </span>
                    ),
                  },
                ]}
              />
              <ColorPicker
                onChange={handleColorPick}
                defaultValue={'#000000'}
              />

              <div className="flex justify-center items-center">
                <button
                  onClick={() => {
                    setFontSize(fontSize - 3);
                  }}
                  type="button"
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-l-full text-sm px-3 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <MinusOutlined />
                </button>
                <div className="px-3 py-2.5 mb-2 bg-white border border-gray-300 text-sm">
                  {fontSize}
                </div>
                <button
                  onClick={() => {
                    setFontSize(fontSize + 3);
                  }}
                  type="button"
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-r-full text-sm px-3 py-2.5   mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <PlusOutlined />
                </button>
              </div>
            </div>
          </Drawer> */}
          <Drawer
            title="Choose a Cultural Icon"
            placement="left"
            onClose={closeStickerDrawer}
            open={openStickerDrawer}
            maskClosable={true}
            mask={true}
            maskClassName=" bg-black"
          >
            <div className=" flex flex-wrap justify-around items-center gap-4  ">
              {svgs.map((svg) => (
                <button
                  key={svg.id}
                  onClick={() => handleSelectSvg(svg.component)}
                  className="svg-button"
                >
                  <svg.component width="100" height="100" />
                </button>
              ))}
            </div>
          </Drawer>
          <div className="  ">
            <Form layout="vertical">
              <div className=" mt-3 flex items-center justify-center flex-col gap-1">
                <div className=" flex justify-between items-center gap-3">
                  <Form.Item label="Enter Couple Names" name="coupleNames">
                    <Input.TextArea
                      defaultValue={coupleName}
                      onChange={onCoupleNameChange}
                      style={{ width: 400 }}
                    />
                  </Form.Item>

                  <Select
                    id="coupleNameFonts"
                    style={{ width: 200 }}
                    onChange={handleSelectFonts}
                    defaultValue={'font-sinhala1'}
                    options={[
                      {
                        value: 'font-sinhala1',
                        label: (
                          <span className=" font-sinhala1">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala2',
                        label: (
                          <span className=" font-sinhala2">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala3',
                        label: (
                          <span className=" font-sinhala3">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala4',
                        label: (
                          <span className=" font-sinhala4">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala5',
                        label: (
                          <span className=" font-sinhala5">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala6',
                        label: (
                          <span className=" font-sinhala6">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala7',
                        label: (
                          <span className=" font-sinhala7">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala8',
                        label: (
                          <span className=" font-sinhala8">
                            Sachini & Lasith
                          </span>
                        ),
                      },
                      {
                        value: 'font-sinhala9',
                        label: (
                          <span className=" font-sinhala9">
                            Sachini & Lasith
                          </span>
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
                      id="weddingDate"
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
          <div ref={pdfRef}>{renderTemplate()}</div>
          <Modal
            footer={null}
            width={700}
            style={{ maxHeight: '80vh' }}
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
                <Form onFinish={sendTemplateViaEmail} layout="vertical">
                  {/* input */}
                  <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
                    <Form.Item label="To" name="guestEmail">
                      <Input.TextArea
                        size="large"
                        placeholder="Enter  Guest Email"
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
      </Spin>
    </>
  );
};

export default EditTemplate;
