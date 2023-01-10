import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/GateKeeperModal';
import { DEFAULT_COLORS } from '../src/utils/constants';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0x227A176b0FD6F851322123698722F25046EB309A';
  const customization = {
    primaryColor: DEFAULT_COLORS.primaryColor,
    buttonTextColor: DEFAULT_COLORS.buttonTextColor,
    backgroundColor: DEFAULT_COLORS.backgroundColor,
    textColor: DEFAULT_COLORS.textColor,
  };

  const kycCheck = '576cf5c8-3dac-4c03-9e15-ae3afaeb9917';
  const geoIdCheck = '63e61579-3238-488e-9e14-909328f69397';
  const ofac = 'c7fd2eb3-692b-4a88-a2d7-844f3ae83bc1';

  const checks = [geoIdCheck];

  return (
    <Modal
      account={accountNotVerified}
      checkIds={checks}
      customization={customization}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
