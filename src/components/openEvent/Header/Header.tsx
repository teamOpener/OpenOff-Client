import { Text } from 'react-native';
import headerStyles from './Header.style';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return <Text style={headerStyles.title}>{title}</Text>;
};

export default Header;
