import MapFieldButton from 'components/eventMap/buttons/MapFieldButton/MapFieldButton';
import fieldData from 'data/lists/fieldData';
import { memo } from 'react';
import { ScrollView } from 'react-native';
import { Field } from 'types/interest';
import mapFieldButtonGroup from './MapFieldButtonGroup.style';

interface Props {
  handleShowFieldEvent: (field: Field) => void;
}

const MapFieldButtonGroup = ({ handleShowFieldEvent }: Props) => {
  return (
    <ScrollView
      style={mapFieldButtonGroup.container}
      contentContainerStyle={mapFieldButtonGroup.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {fieldData.map((field) => (
        <MapFieldButton
          field={field}
          key={field.value}
          handlePress={handleShowFieldEvent}
        />
      ))}
    </ScrollView>
  );
};

export default memo(MapFieldButtonGroup);
