import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomButton } from './CustomButton';

export default {
  title: 'Custom/CustomButton',
  component: CustomButton,
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => (
  <CustomButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  children: 'Button',
  variant: 'outlined',
  size: 'medium',
  color: 'primary',
};