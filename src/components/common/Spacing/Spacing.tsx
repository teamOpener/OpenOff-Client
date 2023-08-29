import { View } from 'react-native';

interface Props {
  height: number;
}

const Spacing = ({ height }: Props) => {
  return <View style={{ height }} />;
};

export default Spacing;
