import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './Icon';

export default {
  title: 'components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Home = Template.bind({});
Home.args = {
  name: 'IconHome',
  fill: 'error',
  size: 42,
};

export const Map = Template.bind({});
Map.args = {
  name: 'IconMap',
  fill: 'point',
};

export const Ticket = Template.bind({});
Ticket.args = {
  name: 'IconTicket',
  size: 50,
};
