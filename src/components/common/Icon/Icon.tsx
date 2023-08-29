import { SvgProps } from 'react-native-svg';
import * as Icons from 'assets/icons';
import { colors } from 'styles/theme';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  fill?: keyof typeof colors;
  size?: number;
};

const Icon = ({ name, fill = 'white', size = 20, ...props }: IconProps) => {
  const CustomIcon = Icons[name];

  return (
    <CustomIcon {...props} fill={colors[fill]} width={size} height={size} />
  );
};

export default Icon;
