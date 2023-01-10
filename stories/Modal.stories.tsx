import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/GateKeeperModal';
import { DEFAULT_COLORS } from '../src/utils/constants';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0x227A176b0FD6F852322123698722F25046EB309A';
  const customization = {
    primaryColor: DEFAULT_COLORS.primaryColor,
    buttonTextColor: DEFAULT_COLORS.buttonTextColor,
    backgroundColor: DEFAULT_COLORS.backgroundColor,
    textColor: DEFAULT_COLORS.textColor,
  };

  const kycCheck = '724119ab-e1cb-4162-a92d-767dfce9e7be';
  const geoIdCheck = 'cca78470-d508-43c3-aa59-64bfbe90b5a2';
  const ofac = '7ae838ad-7d40-4c08-9eb1-8f999ae6ed4f';

  const checks = [kycCheck];

  return (
    <Modal
      account={accountNotVerified}
      checkIds={checks}
      geoIds={['']}
      customization={customization}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
