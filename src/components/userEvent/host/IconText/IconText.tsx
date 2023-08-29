import * as Icons from 'assets/icons';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import iconTextStyles from './IconText.style';

interface Props {
  iconName: keyof typeof Icons;
  label: string;
}

const IconText = ({ iconName, label }: Props) => {
  return (
    <SpaceLayout
      direction="row"
      size={5}
      style={iconTextStyles.alignItemCenter}
    >
      <Icon name={iconName} size={15} fill="white" />
      <Text style={iconTextStyles.peopleText}>{label}</Text>
    </SpaceLayout>
  );
};

export default IconText;
