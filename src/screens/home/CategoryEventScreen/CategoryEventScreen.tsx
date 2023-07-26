import { RouteProp, useRoute } from '@react-navigation/native';
import TopFieldButtonGroup from 'components/home/groups/TopFieldButtonGroup/TopFieldButtonGroup';
import EventRowCardList from 'components/home/lists/EventRowCardList/EventRowCardList';
import eventList from 'data/lists/eventList';
import fieldData from 'data/lists/fieldData';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Field } from 'types/apps/group';
import categoryEventScreenStyles from './CategoryEventScreen.style';

type ParamList = {
  categoryData: {
    fieldValue: string;
  };
};

const CategoryEventScreen = () => {
  const { params } = useRoute<RouteProp<ParamList, 'categoryData'>>();
  const [eventFields, setFields] = useState<Field[]>(fieldData);
  const setEventFields = (fields: Field[], value: string) => {
    setFields(() =>
      fields.map((fieldElement) => {
        // eslint-disable-next-line no-param-reassign
        if (fieldElement.value === value) fieldElement.isActive = true;
        // eslint-disable-next-line no-param-reassign
        else fieldElement.isActive = false;
        return fieldElement;
      }),
    );
  };
  const handleFieldPress = (value: string) => {
    setEventFields(eventFields, value);
  };
  useEffect(() => {
    setEventFields(fieldData, params.fieldValue);
  }, [params.fieldValue]);
  return (
    <View style={categoryEventScreenStyles.container}>
      <TopFieldButtonGroup
        field={eventFields}
        handleFieldPress={handleFieldPress}
      />
      <EventRowCardList eventList={eventList} />
    </View>
  );
};

export default CategoryEventScreen;
