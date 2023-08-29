import { Text } from 'react-native';
import headTextStyles from './HeadText.style';

interface Props {
  title: string;
}

const HeadText = ({ title }: Props) => {
  return <Text style={headTextStyles.title}>{title}</Text>;
};

export default HeadText;
