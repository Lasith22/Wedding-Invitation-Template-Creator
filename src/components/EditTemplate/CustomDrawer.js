import React from 'react';
import { Drawer, Select, ColorPicker } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
const CustomDrawer = ({
  open,
  onClose,
  fontSize,
  setFontSize,
  color,
  selectFonts,
  handleSelectFonts,
  editingElement,
  setColor,
  handleColorChange,
}) => {
  return (
    <Drawer
      placement="top"
      onClose={onClose}
      open={open}
      width={100}
      height={80}
      getContainer={false}
      closeIcon={false}
    >
      <div className="flex justify-center items-center gap-10">
        <Select
          style={{ width: 300 }}
          onChange={handleSelectFonts}
          value={selectFonts}
          defaultValue={selectFonts}
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
        <ColorPicker onChange={handleColorChange} />

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

      {/* Add other controls for fontSize etc. as needed */}
    </Drawer>
  );
};

export default CustomDrawer;
