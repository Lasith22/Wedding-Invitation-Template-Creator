import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLogo from '../../src/assets/hela.png';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Dropdown, Spin, Select } from 'antd';
import Card2 from '../assets/Card 23.jpeg';
import { useTranslation } from 'react-i18next';
import invitationImage from '../assets/weddingCard3.jpeg';
import invitationImage2 from '../assets/weddingCard1.jpeg';
import invitationImage3 from '../assets/weddingCard2.jpeg';
import invitationImage4 from '../assets/template1.jpeg';
import invitationImage5 from '../assets/template5.jpeg';
import invitationImage6 from '../assets/template2.jpeg';
import invitationImage7 from '../assets/template3.jpeg';
import invitationImage8 from '../assets/Template.jpg';
import i18next from 'i18next';
import { MdLanguage } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa6';

const Dashboard = () => {
  const [coupleNames, setCoupleNames] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('si');
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth).then((value) => {
      navigate('/');
    });
  };
  const handleLanguageChange = (value) => {
    setSelectedLanguage(i18next.changeLanguage(value));
  };
  // get names of couples from firestore
  useEffect(() => {
    const getCoupleNames = async () => {
      const docRef = doc(db, 'USERS', state.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document Data', docSnap.data());
        setCoupleNames(docSnap.data());
      } else {
        console.log('No such document');
      }
    };
    getCoupleNames();
  }, [state.email]);
  const uploadTemplate = async (template) => {
    try {
      const storageRef = ref(storage, `templates/${state.email}/${template}`);
      const response = await fetch(template);
      const blob = await response.blob();
      const upload = await uploadBytes(storageRef, blob);
      const imageURL = await getDownloadURL(upload.ref);

      setImageLinks((prevLinks) => [...prevLinks, imageURL]);
      return imageURL;
    } catch (error) {
      console.log('Erro upload file', error);
    }
  };

  const uploadLinksToFirestore = async (template) => {
    setLoading(true);
    try {
      const imageURL = await uploadTemplate(template); // Upload and get URL
      if (imageURL) {
        setImageLinks((prevLinks) => {
          const updatedLinks = [...prevLinks, imageURL]; // Use callback for most recent state
          setDoc(doc(db, 'TEMPLATES', `${state.email}`), {
            // Update Firestore
            links: updatedLinks,
          }).catch((error) => console.log('Error upload link', error));
          return updatedLinks; // Return updated state
        });
      }
    } catch (error) {
      console.error('Error uploading template: ', error);
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      label: (
        <h1
          onClick={() => {
            navigate('favorits', {
              state: {
                email: state.email,
                coupleNames: coupleNames,
                ref: 'template1',
              },
            });
          }}
        >
          {t('MY_FAV')}{' '}
        </h1>
      ),
      key: '0',
    },
    {
      label: <h1 onClick={logOut}>{t('LOG_OUT')} </h1>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">{t('ACCOUNT_DETAILS')} </a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: t('HELP'),
      key: '3',
    },
  ];

  return (
    <div>
      {/* top nav bar section with log out part */}

      <div className="flex justify-between items-stretch p-5">
        {/* couple names */}
        <div className="flex justify-between font-serif text-[40px] gap-5 text-slate-500 ">
          <h1>{coupleNames.partnerFirstName}</h1>
          <h1>&</h1>
          <h1>{coupleNames.yourFirstName}</h1>
        </div>

        <div className="flex items-center   ">
          <img src={MainLogo} alt="" className="h-20" />
        </div>

        {/* log out Part */}
        <div className="mr-6">
          <div className="flex justify-between  gap-6">
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
            <Dropdown
              menu={{
                items,
              }}
              trigger={['hover']}
            >
              <button className="border px-4 py-2 ">
                {t('YOUR_ACCOUNT')}{' '}
              </button>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* second part */}
      <div className="flex  justify-center items-center gap-12">
        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  ">
          {t('ENGAGEMENT_PARTY')}
        </h1>

        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  ">
          {t('GREETINGS')}
        </h1>

        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom  border-b-2 ">
          {t('WEDDING')}
        </h1>

        <h1 className="text-[#BC8C05] font-semibold text-xl font-custom">
          {t('HOME_COMING')}
        </h1>
      </div>
      <hr className="border-t border-gray-300  " />

      {/* second layer */}
      <div className="bg-[#f5f1e6] h-80 mx-20 mb-10  ">
        <div className="grid grid-cols-4 gap-[20px]   items-center">
          {/* text */}
          <div className="flex flex-col mx-10 col-span-3">
            <h1 className="mt-0   text-[40px]  lg:text-[50px] text-[#BC8C05] font-bold font-manrope">
              {' '}
              {t('WEDDING_WEBSITE!!')}
            </h1>
            <p className="text-18 font-inter text-darkdray mt-5">
              {t('WE_UNDERSTAND')}
            </p>
          </div>
          <div className=" mr-10 col-span-1  ">
            <img
              src={Card2}
              width="250"
              height="50"
              // style={{ transform: 'rotate(-8deg)' }}
              alt=""
            />
          </div>
        </div>
      </div>
      <Spin spinning={loading} tip="Loading...">
        {/* actual templates section */}
        <div className="flex flex-col gap-10 my-20">
          {/* 1st section */}
          <div className="flex justify-center items-center gap-20 ">
            <div>
              <div className=" relative group">
                <img
                  onClick={() => {
                    navigate('preview', {
                      state: {
                        coupleNames: coupleNames,
                        ref: 'template1',
                        email: state.email,
                      },
                    });
                  }}
                  src={invitationImage}
                  class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
                />

                <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h1>{t('BLOOM_EMRACE')} </h1>
                  <FaHeart
                    onClick={() => {
                      uploadLinksToFirestore(invitationImage);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" relative group">
              <img
                onClick={() => {
                  navigate('preview', {
                    state: {
                      coupleNames: coupleNames,
                      ref: 'template2',
                      email: state.email,
                    },
                  });
                }}
                src={invitationImage2}
                class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
              />
              <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1>{t('FESTIVE_MELODY')} </h1>
                <FaHeart
                  onClick={() => {
                    uploadLinksToFirestore(invitationImage2);
                  }}
                />
              </div>
            </div>

            <div className=" relative group">
              <img
                onClick={() => {
                  navigate('preview', {
                    state: {
                      coupleNames: coupleNames,
                      ref: 'template3',
                      email: state.email,
                    },
                  });
                }}
                src={invitationImage3}
                class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
              />
              <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1>{t('SIHALA_UTHSAWA')} </h1>
                <FaHeart
                  onClick={() => {
                    uploadLinksToFirestore(invitationImage3);
                  }}
                />
              </div>
            </div>
            <div className=" relative group">
              <img
                onClick={() => {
                  navigate('preview', {
                    state: {
                      coupleNames: coupleNames,
                      ref: 'template4',
                      email: state.email,
                    },
                  });
                }}
                src={invitationImage4}
                class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
              />
              <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1> {t('ROYAL_INVITATION')}</h1>

                <FaHeart
                  onClick={() => {
                    uploadLinksToFirestore(invitationImage4);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-20 ">
            <div>
              <div className=" relative group">
                <img
                  onClick={() => {
                    navigate('preview', {
                      state: {
                        coupleNames: coupleNames,
                        ref: 'template5',
                        email: state.email,
                      },
                    });
                  }}
                  src={invitationImage5}
                  class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
                />

                <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h1>{t('MANGALA_ALI')} </h1>
                  <FaHeart
                    onClick={() => {
                      uploadLinksToFirestore(invitationImage);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" relative group">
              <img
                onClick={() => {
                  navigate('preview', {
                    state: {
                      coupleNames: coupleNames,
                      ref: 'template6',
                      email: state.email,
                    },
                  });
                }}
                src={invitationImage6}
                class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
              />
              <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1>Template Name</h1>
                <FaHeart
                  onClick={() => {
                    uploadLinksToFirestore(invitationImage2);
                  }}
                />
              </div>
            </div>

            <div className=" relative group">
              <img
                onClick={() => {
                  navigate('preview', {
                    state: {
                      coupleNames: coupleNames,
                      ref: 'template7',
                      email: state.email,
                    },
                  });
                }}
                src={invitationImage7}
                class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
              />
              <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1>Template Name</h1>
                <FaHeart
                  onClick={() => {
                    uploadLinksToFirestore(invitationImage3);
                  }}
                />
              </div>
            </div>
            <div className=" relative group">
              <img
                onClick={() => {
                  navigate('preview', {
                    state: {
                      coupleNames: coupleNames,
                      ref: 'template8',
                      email: state.email,
                    },
                  });
                }}
                src={invitationImage8}
                class="object-contain h-80 w-160 shadow-gray-700 shadow-sm"
              />
              <div className="flex justify-between items-center absolute bottom-0 w-full p-3 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1>Template Name</h1>

                <FaHeart
                  onClick={() => {
                    uploadLinksToFirestore(invitationImage4);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;
