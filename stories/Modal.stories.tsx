import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../src/components/LayerModal';

export default {
  title: 'KYC/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const accountNotVerified = '0x76b9623D3C55c3cCFe294f53C8E78A892231404F';

  return <Modal account={accountNotVerified} />;
};

export const ModalTemplate = Template.bind({});

ModalTemplate.args = {};
