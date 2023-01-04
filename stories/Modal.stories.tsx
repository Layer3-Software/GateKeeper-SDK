import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/GateKeeperModal';
import { DEFAULT_COLORS } from '../src/utils/constants';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0xe0FF5244D2be4a676475d9282aB9CFB6fe2322bB';
  const customization = {
    primaryColor: DEFAULT_COLORS.primaryColor,
    buttonTextColor: DEFAULT_COLORS.buttonTextColor,
    backgroundColor: DEFAULT_COLORS.backgroundColor,
    textColor: DEFAULT_COLORS.textColor,
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
