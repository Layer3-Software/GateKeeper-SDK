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

  const kycCheck = 'e4cce52a-d330-4978-b250-6c6d5626b42e';
  const geoIdCheck = 'aee00f30-1928-4ba3-97aa-823dd0b62572';
  const ofac = '1e460f23-745d-4d0d-98bb-d715bf211608';
  const nft = '1f5da523-d65c-4862-b07c-3c780fca53f4';

  const checks = [nft, kycCheck];

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
      nftClaimLinks={nftsClaimLinks}
      customization={lightModeOn ? lightMode : darkMode}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
