import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/GateKeeperModal';
import { DEFAULT_COLORS } from '../src/utils/constants';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0x85d6298705d6b9885Eaa2de262df9442353d0218';
  const customization = {
    primaryColor: DEFAULT_COLORS.primaryColor,
    buttonTextColor: DEFAULT_COLORS.buttonTextColor,
    backgroundColor: DEFAULT_COLORS.backgroundColor,
    textColor: DEFAULT_COLORS.textColor,
  };

  const kycCheck = 'e4cce52a-d330-4978-b250-6c6d5626b42e';
  const geoIdCheck = 'aee00f30-1928-4ba3-97aa-823dd0b62572';
  const ofac = '1e460f23-745d-4d0d-98bb-d715bf211608';
  const nft = '669498c4-604c-4ac0-8c7e-48c816c86f60';

  const role1 = 'f10543de-b5e0-426d-986e-6d4ecdcb10e6';
  // const role2 = '0174a672-f900-41b2-aeb4-86a9073ec9c0';
  // const role3 = '7de606d4-2416-4938-8e3b-77a9e3e409cc';

  const roles = [role1];
  const checks = [];

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

  const nftsClaimLinks = {
    [nft]: {
      claimLink:
        'https://opensea.io/assets?search[query]=0xdb46d1dc155634fbc732f92e853b10b288ad5a1d',
    },
  };

  const lightModeOn = false;
  return (
    <Modal
      account={accountNotVerified}
      checkIds={checks}
      roles={roles}
      nftClaimLinks={nftsClaimLinks}
      customization={lightModeOn ? lightMode : darkMode}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
