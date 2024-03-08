import React, { useState } from 'react';

import { Form, Input } from 'antd';
const { TextArea } = Input;
const FormTemplate = () => {
  const [coupleName, SetCoupleName] = useState('');

  const onCoupleNameChange = (value) => {
    SetCoupleName(value);
  };
  console.log('Name', coupleName);
  return (
    <>
      <div>
        <Form>
          <Form.Item name="note" label="Couple Name">
            <TextArea onChange={onCoupleNameChange} rows={4} />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormTemplate;
