import { View } from 'react-native';
import { colors } from 'styles/theme';

interface Props {
  height: number;
  color?: keyof typeof colors;
}

const Divider = ({ height, color = 'main' }: Props) => {
  return <View style={{ height, backgroundColor: colors[color] }} />;
};

export default Divider;
