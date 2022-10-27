import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/LayerModal';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0xAA03727c738c60cc45887563e4986D0466DB5972';

  return <Modal account={accountNotVerified} />;
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
