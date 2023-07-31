import { PropsWithChildren } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

interface Props extends PropsWithChildren {
  direction?: 'row' | 'column';
  size: number;
  style?: StyleProp<ViewStyle>;
}

const SpaceLayout = ({
  direction = 'column',
  size,
  style,
  children,
}: Props) => {
  return (
    <View
      style={[
        {
          flexDirection: direction,
          gap: size,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default SpaceLayout;
