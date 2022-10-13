import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/LayerModal';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountVerified = '0xc9f200abB8a628af2ad821755F0119dAed0F5513';
  const accountNotVerified = '0xc9f200abB8a628af2ad821755F0119dAed0F5515';

  return <Modal kycType={['0']} account={accountVerified} />;
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
