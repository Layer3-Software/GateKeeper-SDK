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

  const kycCheck = '9f376739-5d9e-4e12-9bdc-4498a8203883';
  const geoIdCheck = 'aee00f30-1928-4ba3-97aa-823dd0b62572';
  const ofac = '1e460f23-745d-4d0d-98bb-d715bf211608';
  const nft = 'e896b4a3-31e1-419d-bb32-f81ad6c37d92';

  const checks = [nft];

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
