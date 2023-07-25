import MapFieldButton from 'components/eventMap/buttons/MapFieldButton/MapFieldButton';
import fieldData from 'data/lists/fieldData';
import { memo } from 'react';
import { ScrollView } from 'react-native';
import { Field } from 'types/apps/group';
import mapFieldButtonGroup from './MapFieldButtonGroup.style';

interface Props {
  getFieldEvent: (field: Field) => void;
}

const MapFieldButtonGroup = ({ getFieldEvent }: Props) => {
  return (
    <ScrollView
      style={mapFieldButtonGroup.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {fieldData.map((field) => (
        <MapFieldButton
          field={field}
          key={field.value}
          handlePress={getFieldEvent}
        />
      ))}
    </ScrollView>
  );
};

export default memo(MapFieldButtonGroup);
