import OptionButton from 'components/eventMap/buttons/OptionButton/OptionButton';
import { View } from 'react-native';
import Option from 'types/apps/selectbox';
import singleOptionGroupStyles from './SingleOptionGroup.style';

interface Props {
  options: Option[];
  select: (option: Option) => void;
}

const SingleOptionGroup = ({ options, select }: Props) => {
  return (
    <View style={singleOptionGroupStyles.container}>
      {options.map((option) => (
        <OptionButton key={option.value} option={option} select={select} />
      ))}
    </View>
  );
};

export default SingleOptionGroup;
