import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Field } from 'types/interest';
import Text from '../../../common/Text/Text';
import mapFieldButtonStyles from './MapFieldButton.style';

interface Props {
  field: Field;
  handlePress: (field: Field) => void;
}

const MapFieldButton = ({ field, handlePress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={mapFieldButtonStyles.container}
      onPress={() => handlePress(field)}
    >
      <Text style={mapFieldButtonStyles.label} color="black">
        {field.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MapFieldButton;
