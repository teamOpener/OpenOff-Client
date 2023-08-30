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
      style={mapFieldButtonStyles.container}
      onPress={() => handlePress(field)}
    >
      <Text variant="body1" color="main">
        {field.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MapFieldButton;
