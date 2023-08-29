import React from 'react';
import { View } from 'react-native';
import tagGroupStyles from './TagGroup.style';

interface Props {
  children: React.ReactNode;
}

const TagGroup = ({ children }: Props) => {
  return <View style={tagGroupStyles.container}>{children}</View>;
};

export default TagGroup;
