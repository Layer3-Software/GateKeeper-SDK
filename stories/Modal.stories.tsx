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

  const kycCheck = '576cf5c8-3dac-4c03-9e15-ae3afaeb9917';
  const geoIdCheck = 'be2e57a0-8ea1-4a30-a605-0e78371dc3b4';
  const ofac = '7ae838ad-7d40-4c08-9eb1-8f999ae6ed4f';

  const checks = [geoIdCheck];

  return (
    <Modal
      account={accountNotVerified}
      checkIds={checks}
      geoIds={['AR']}
      customization={customization}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
