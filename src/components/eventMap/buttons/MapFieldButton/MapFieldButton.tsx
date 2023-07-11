import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Field } from 'types/apps/group';
import Text from '../../../common/Text/Text';
import mapFieldButtonStyles from './MapFieldButton.style';

interface Props {
  field: Field;
  handlePress: (value: string) => void;
}

const MapFieldButton = ({ field, handlePress }: Props) => {
  return (
    <TouchableOpacity
      style={mapFieldButtonStyles.container}
      onPress={() => handlePress(field.value)}
    >
      <Text variant="body1" color="main">
        {field.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MapFieldButton;
