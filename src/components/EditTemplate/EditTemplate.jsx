import React, { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { functions, storage } from '../../firebase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { BiSolidSticker } from 'react-icons/bi';
import { ShareAltOutlined, FilePdfOutlined } from '@ant-design/icons';
import Template1 from '../../components/EditTemplate/Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import MainLogo from '../../assets/hela.png';
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
  Button,
  Alert,
} from 'antd';
import { useTranslation } from 'react-i18next';
import SVGs from '../../svgComponents';
import CustomDrawer from './CustomDrawer';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';
import Template7 from './Template7';
import Template8 from './Template8';
import { MdLanguage } from 'react-icons/md';
import i18next from 'i18next';
import Marquee from 'react-fast-marquee';

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
  const [coupleNameFonts, setCoupleNameFont] = useState('font-sinhala5');
  const [customMessageFont, setCustomeMessageFont] = useState('font-sinhala2');
  const [coupleNameColor, setCoupleNameColor] = useState('#000000');
  const [customMessageColor, setCustomMessageColor] = useState('#FF3F34');
  const [coupleNameFontSize, setCoupleNameFontSize] = useState(30);
  const [customMessageFontSize, setCustomMessageFontSize] = useState(30);
  const [selectedSvgs, setSelectedSvgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const [savingLoading, setSavingLoading] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('si');
  const [imageData, setImageData] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [dateFont, setDateFont] = useState('font-sinhala10');
  const [venueFont, setVenueFont] = useState('font-sinhala5');
  const [dateFontSize, setDateFontSize] = useState(20);
  const [venueFontSize, setVenueFontSize] = useState(20);
  const [dateColor, setDateColor] = useState('#89CFF0');
  const [venueColor, setVenueColor] = useState('#000000');
  const showDrawerFor = (element) => {
    setEditingElement(element);
    showDrawer();
  };

  const handleSelectFonts = (value) => {
    if (editingElement === 'coupleName') {
      setCoupleNameFont(value);
    } else if (editingElement === 'customMessage') {
      setCustomeMessageFont(value);
    } else if (editingElement === 'date') {
      setDateFont(value);
    } else if (editingElement === 'venue') {
      setVenueFont(value);
    }
  };
  const handleColorPick = (color, hex) => {
    if (editingElement === 'coupleName') {
      setCoupleNameColor(hex);
    } else if (editingElement === 'customMessage') {
      setCustomMessageColor(hex);
    } else if (editingElement === 'date') {
      setDateColor(hex);
    } else if (editingElement === 'venue') {
      setVenueColor(hex);
    }
  };
  const handleFontSizeChange = (sizeChange) => {
    if (editingElement === 'coupleName') {
      setCoupleNameFontSize(sizeChange);
    } else if (editingElement === 'customMessage') {
      setCustomMessageFontSize(sizeChange);
    } else if (editingElement === 'date') {
      setDateFontSize(sizeChange);
    } else if (editingElement === 'venue') {
      setVenueFontSize(sizeChange);
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
  const handleLanguageChange = (value) => {
    setSelectedLanguage(i18next.changeLanguage(value));
  };
  // Function to handle SVG selection
  const handleSelectSvg = (SvgComponent) => {
    setSelectedSvgs([...selectedSvgs, SvgComponent]);
  };

  const sendTemplateViaEmail = (value) => {
    setLoadingEmail(true);
    const sendEmailWithSendGrid = httpsCallable(
      functions,
      'sendEmailWithSendGrid',
    );

    sendEmailWithSendGrid({
      to: value.guestEmail,
      from: 'lasithherath00@gmail.com',
      subject: `An Invitation From ${value.userName}`,
      text: 'This is a test email.',
      html: `<html><body><img src="${imageLink}" alt="Captured Content"/></body></html>`,
    })
      .then((result) => {
        if (result.data.success) {
          alert('Email sent successfully!');
          setLoadingEmail(false);
        } else {
          console.log('Failed to send email.', result);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error sending email.');
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
    { id: 'svg21', component: SVGs.Svg21 },
    { id: 'svg22', component: SVGs.Svg22 },
    { id: 'svg23', component: SVGs.Svg23 },
    { id: 'svg24', component: SVGs.Svg24 },
    { id: 'svg25', component: SVGs.Svg25 },
    { id: 'svg26', component: SVGs.Svg26 },
    { id: 'svg27', component: SVGs.Svg27 },
    { id: 'svg28', component: SVGs.Svg28 },
    { id: 'svg29', component: SVGs.Svg29 },
    { id: 'svg30', component: SVGs.Svg30 },
    { id: 'svg31', component: SVGs.Svg31 },
    { id: 'svg32', component: SVGs.Svg32 },
    { id: 'svg33', component: SVGs.Svg33 },
    { id: 'svg34', component: SVGs.Svg34 },
    { id: 'svg35', component: SVGs.Svg35 },
  ];
  const handleDownloadPDF = () => {
    setLoading(true);
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
      label: <h1 onClick={showModal}>{t('SHARE')} </h1>,
      key: '2',
      icon: <ShareAltOutlined />,
    },
    {
      label: <h1 onClick={handleDownloadPDF}> {t('DOWNLOAD_PDF')}</h1>,
      key: '1',
      icon: <FilePdfOutlined />,
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );
      case 'template6':
        return (
          <Template6
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );
      case 'template7':
        return (
          <Template7
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );
      case 'template8':
        return (
          <Template8
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
            dateFontSize={dateFontSize}
            dateColor={dateColor}
            dateFont={dateFont}
            venueFontSize={venueFontSize}
            venueColor={venueColor}
            venueFont={venueFont}
            selectedSvg={selectedSvgs}
            onEdit={showDrawerFor}
          />
        );

      default:
        return <div>No template selected</div>;
    }
  };
  const captureTemplate = async () => {
    if (pdfRef.current) {
      try {
        setSavingLoading(true);
        const canvas = await html2canvas(pdfRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const storageRef = ref(
          storage,
          `savedTemplates/${state.email}/${imageData}`,
        );
        const response = await fetch(imgData);
        const blob = await response.blob();
        const upload = await uploadBytes(storageRef, blob);
        const imageURL = await getDownloadURL(upload.ref);
        setImageLink(imageURL);
        setTemplateImage(imgData);
      } catch (error) {
        console.error('Error capturing the template:', error);
      } finally {
        setSavingLoading(false);
      }
    }
  };
  const getFontSize = () => {
    switch (editingElement) {
      case 'coupleName':
        return coupleNameFontSize;
      case 'customMessage':
        return customMessageFontSize;
      case 'date':
        return dateFontSize; // Assuming you have a state variable for this
      case 'venue':
        return venueFontSize; // Assuming you have a state variable for this
      default:
        return 16; // A default font size if none of the conditions match
    }
  };
  return (
    <>
      <div className="bg-white border-b-2 border-gray-300">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* MainLogo */}
            <div className="flex items-start   ">
              <img src={MainLogo} alt="" className="h-20" />
            </div>
            <div
              onClick={showStickerDrawer}
              className="flex justify-center   items-center gap-1 cursor-pointer hover:bg-slate-100 hover:p-2 hover:rounded-lg"
            >
              <BiSolidSticker size={30} color="pink" />
              <h1>{t('ADD_STICKERS')}</h1>
            </div>

            <div className="flex justify-between items-center gap-5">
              <div className="flex justify-between items-center gap-1">
                <MdLanguage size={30} color="pink" />
                <Select
                  defaultValue={selectedLanguage}
                  onChange={handleLanguageChange}
                  options={[
                    {
                      value: 'si',
                      label: 'සිංහල',
                    },
                    {
                      value: 'en',
                      label: 'ENGLISH',
                    },
                  ]}
                  style={{ width: 100 }}
                />
              </div>

              <Button onClick={captureTemplate}>{t('SAVE')}</Button>
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
      </div>

      <Spin spinning={loading} tip="Generating PDF...">
        <Spin spinning={savingLoading} tip="Saving...">
          <div className=" bg-[#f1f1f5] h-screen flex justify-evenly items-center relative overflow-hidden">
            <CustomDrawer
              onClose={onClose}
              fontSize={getFontSize()}
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
              <Alert
                style={{
                  width: 400,
                }}
                banner
                message={
                  <Marquee pauseOnHover gradient={false}>
                    {t('PLEASE_TYPE')}
                  </Marquee>
                }
              />
              <Form layout="vertical">
                <div className=" mt-3 flex items-center justify-center flex-col gap-1">
                  <div className=" flex justify-between items-center gap-3">
                    <Form.Item
                      label={t('ENTER_COUPLE_NAME')}
                      name="coupleNames"
                    >
                      <Input.TextArea
                        className="font-sinhala1"
                        defaultValue={coupleName}
                        onChange={onCoupleNameChange}
                        style={{ width: 400 }}
                      />
                    </Form.Item>
                  </div>

                  <div className=" flex justify-between items-center gap-3">
                    <Form.Item label={t('ENTER_CUSTOM')}>
                      <Input.TextArea
                        className="font-sinhala1"
                        defaultValue={customMessage}
                        onChange={onCustomeMessage}
                        rows={4}
                        style={{ width: 400 }}
                      />
                    </Form.Item>
                  </div>

                  <div className=" flex justify-between items-center gap-3">
                    <Form.Item label={t('ENTER_DATE')}>
                      <DatePicker
                        id="weddingDate"
                        style={{ width: 400 }}
                        defaultValue={dayjs()}
                        onChange={onDateChange}
                      />
                    </Form.Item>
                  </div>

                  <div className=" flex justify-between items-center gap-3">
                    <Form.Item label={t('ENTER_VENUE')}>
                      <Input.TextArea
                        defaultValue={venue}
                        onChange={onvenueChange}
                        rows={2}
                        style={{ width: 400 }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
            <div ref={pdfRef}>{renderTemplate()}</div>
            <Spin spinning={loadingEmail} tip="Email Sending...">
              <Modal
                footer={null}
                width={700}
                style={{ maxHeight: '80vh' }}
                title={
                  <div className="custom-modal-title border-b-2 border-gray-200 p-4">
                    {t('SHARE')}
                  </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
              >
                <div className="flex justify-between items-center gap-5 ">
                  <div className=" flex flex-1 bg-slate-100 p-5">
                    {templateImage && (
                      <img
                        src={templateImage}
                        alt="Customized Template"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    )}
                  </div>
                  <div className=" flex flex-1 items-center justify-center ">
                    <Form onFinish={sendTemplateViaEmail} layout="vertical">
                      {/* input */}
                      <div className=" mt-3 flex items-center justify-center flex-col gap-1 ">
                        <Form.Item label="Your Name" name="userName">
                          <Input.TextArea size="large" />
                        </Form.Item>
                        <Form.Item label="To" name="guestEmail">
                          <Input.TextArea size="large" />
                        </Form.Item>
                      </div>

                      <div className="mt-10 mb-10 items-center justify-center flex">
                        <button class=" bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full w-[200px]  ">
                          {t('SEND')}
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Modal>
            </Spin>
          </div>
        </Spin>
      </Spin>
    </>
  );
};

export default EditTemplate;
