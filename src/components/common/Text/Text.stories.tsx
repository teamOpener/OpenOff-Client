import { ComponentMeta, ComponentStory } from '@storybook/react';

import Text from './Text';

export default {
  title: 'components/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => (
  <Text {...args}>Hello</Text>
);

// default color는 white입니다.
export const Header1 = Template.bind({});
Header1.args = {
  variant: 'h1',
};

export const Body1 = Template.bind({});
Body1.args = {
  variant: 'body1',
  color: 'point',
};

// 임의로 style을 전달해줘도 됩니다.
export const Body2 = Template.bind({});
Body2.args = {
  variant: 'body2',
  style: { color: '#737373' },
};
