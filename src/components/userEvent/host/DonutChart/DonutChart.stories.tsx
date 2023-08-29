import { ComponentMeta, ComponentStory } from '@storybook/react';

import DonutChart from './DonutChart';

export default {
  title: 'components/userEvent/host/DonutChart',
  component: DonutChart,
} as ComponentMeta<typeof DonutChart>;

const Template: ComponentStory<typeof DonutChart> = (args) => (
  <DonutChart {...args} />
);

export const GreenDonut = Template.bind({});
GreenDonut.args = {
  size: 150,
  innerStrokeWidth: 3,
  strokeWidth: 5,
  progress: 50,
  circleRadius: 7,
  color: 'lightGreen',
};

export const PurpleDonut = Template.bind({});
PurpleDonut.args = {
  size: 150,
  innerStrokeWidth: 3,
  strokeWidth: 5,
  progress: 50,
  circleRadius: 7,
  color: 'main',
};
