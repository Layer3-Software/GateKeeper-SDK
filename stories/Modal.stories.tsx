import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/GateKeeperModal';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountVerified = '0x082370c203b19508281eb57fBD8b104Cd9A28fbd';
  const accountNotVerified = '0x76b9623D3C55c3cCFe294f53C8E78A892231404F';
  const customization = {
    primaryColor: 'rgba(76, 130, 251, 0.24)',
    buttonTextColor: '#4C82FB',
    backgroundColor: '#0d1117',
    textColor: 'rgb(255, 255, 255)',
  };

  return (
    <Modal
      account={accountNotVerified}
      checkIds={['0d0cf1c6-8c89-4ca6-b1f4-61652f42f7a4']}
      customization={customization}
    />
  );
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
