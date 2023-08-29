import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  direction?: 'row' | 'column';
  size: number;
}

const SpaceLayout = ({
  direction = 'column',
  size,
  style,
  children,
  ...rest
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
      {...rest}
    >
      {children}
    </View>
  );
};

export default SpaceLayout;
