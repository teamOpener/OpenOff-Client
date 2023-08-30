import MapFieldButton from 'components/eventMap/buttons/MapFieldButton/MapFieldButton';
import fieldData from 'data/lists/fieldData';
import { memo } from 'react';
import { ScrollView } from 'react-native';
import { Field } from 'types/interest';
import useInterestFields from 'hooks/interest/useInterestFields';
import mapFieldButtonGroup from './MapFieldButtonGroup.style';

interface Props {
  handleShowFieldEvent: (field: Field) => void;
}

const MapFieldButtonGroup = ({ handleShowFieldEvent }: Props) => {
  const { generateInterestFieldTags } = useInterestFields();
  return (
    <ScrollView
      style={mapFieldButtonGroup.container}
      contentContainerStyle={mapFieldButtonGroup.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {generateInterestFieldTags().map((field) => (
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
