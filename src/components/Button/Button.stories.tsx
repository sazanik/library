import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from './Button';

export default {
  title: 'Custom/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  children: 'MaterialButton',
  variant: 'outlined',
  size: 'medium',
  color: 'primary',
};
