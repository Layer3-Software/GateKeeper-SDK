import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/GateKeeperModal';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0xe0FF5244D2be4a676475d9282aB9CFB6fe2322bB';
  const customization = {
    primaryColor: 'rgba(76, 130, 251, 0.24)',
    buttonTextColor: '#4C82FB',
    backgroundColor: '#0d1117',
    textColor: 'rgb(255, 255, 255)',
  };

  const kycCheck = 'e4536424-e6e2-4a4e-bae9-c2de803e2250';
  const geoIdCheck = '8f3fab01-3ead-4a9f-b11d-de6bfb8b5159';

  const checks = [kycCheck, geoIdCheck];

  return (
    <Modal
      account={accountNotVerified}
      checkIds={checks}
      customization={customization}
      polygonId
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
