import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/LayerModal';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0xAc4b0639A5b6509134fB3AB37A2BBc410974a0eb';

  return <Modal account={accountNotVerified} />;
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
