import SelectBoxButton from 'components/eventMap/buttons/SelectBoxButton/SelectBoxButton';
import SingleOptionGroup from 'components/eventMap/groups/SingleOptionGroup/SingleOptionGroup';
import { useState } from 'react';
import { View } from 'react-native';
import Option from 'types/apps/selectbox';
import singleSelectBoxStyles from './SingleSelectBox.style';

interface Props {
  options: Option[];
  label: string;
  select: (option: Option) => void;
}

const SingleSelectBox = ({ options, label, select }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleOpenOption = () => {
    setIsActive(!isActive);
  };
  return (
    <View style={singleSelectBoxStyles.container}>
      <SelectBoxButton
        label={label}
        handlePress={handleOpenOption}
        isActive={isActive}
      />
      {isActive && (
        <SingleOptionGroup
          options={options}
          select={(option: Option) => {
            select(option);
            setIsActive(!isActive);
          }}
        />
      )}
    </View>
  );
};

export default SingleSelectBox;
