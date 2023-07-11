import MapFieldButton from 'components/eventMap/buttons/MapFieldButton/MapFieldButton';
import interestField from 'data/lists/interestField';
import React from 'react';
import { ScrollView, View } from 'react-native';
import mapFieldButtonGroup from './MapFieldButtonGroup.style';

interface Props {
  getFieldEvent: (value: string) => void;
}

const MapFieldButtonGroup = ({ getFieldEvent }: Props) => {
  return (
    <ScrollView
      style={mapFieldButtonGroup.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {interestField.map((field) => (
        <MapFieldButton
          field={field}
          key={field.value}
          handlePress={getFieldEvent}
        />
      ))}
    </ScrollView>
  );
};

export default MapFieldButtonGroup;
