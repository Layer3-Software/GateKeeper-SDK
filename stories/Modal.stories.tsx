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

  const kycCheck = '024841b1-593e-45f5-ae99-2310359bf954';
  const geoIdCheck = 'aee00f30-1928-4ba3-97aa-823dd0b62572';
  const ofac = '1e460f23-745d-4d0d-98bb-d715bf211608';
  const nft = 'e896b4a3-31e1-419d-bb32-f81ad6c37d92';

  const checks = [kycCheck];

  // Uniswap colors
  const darkMode = {
    primaryColor: 'rgba(76, 130, 251, 0.24)',
    buttonTextColor: '#4C82FB',
    backgroundColor: '#0d1117',
    textColor: 'rgb(255, 255, 255)',
  };
  const lightMode = {
    primaryColor: 'rgba(251, 17, 142, 0.24)',
    buttonTextColor: '#FB138E',
    backgroundColor: 'rgb(255, 255, 255)',
    textColor: 'rgb(13, 17, 28)',
  };

  const lightModeOn = false;
  return (
    <Modal
      account={accountNotVerified}
      checkIds={checks}
      customization={lightModeOn ? lightMode : darkMode}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
