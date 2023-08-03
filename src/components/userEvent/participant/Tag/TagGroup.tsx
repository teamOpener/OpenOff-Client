import React from 'react';
import { View, ViewProps } from 'react-native';
import tagGroupStyles from './TagGroup.style';

interface Props extends ViewProps {
  children: React.ReactNode;
}

const TagGroup = ({ children, style }: Props) => {
  return <View style={[tagGroupStyles.container, style]}>{children}</View>;
};

export default TagGroup;
