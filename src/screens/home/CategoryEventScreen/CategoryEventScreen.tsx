import { RouteProp, useRoute } from '@react-navigation/native';
import TopFieldButtonGroup from 'components/home/groups/TopFieldButtonGroup/TopFieldButtonGroup';
import EventRowCardList from 'components/home/lists/EventRowCardList/EventRowCardList';
import fieldData from 'data/lists/fieldData';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Field } from 'types/apps/group';
import { useFieldEventLists } from 'hooks/queries/event';
import { FieldCode } from 'constants/code';
import categoryEventScreenStyles from './CategoryEventScreen.style';

type ParamList = {
  categoryData: {
    fieldValue: string;
  };
};

const CategoryEventScreen = () => {
  const { params } = useRoute<RouteProp<ParamList, 'categoryData'>>();
  const [eventFields, setFields] = useState<Field[]>(fieldData);
  const {
    data: fieldEventList,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useFieldEventLists(
    eventFields.find((fieldElement) => fieldElement.isActive === true)?.value ??
      FieldCode.EA,
  );

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

  const handleEndReached = () => {
    if (hasNextPage) fetchNextPage();
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
      <EventRowCardList
        pageData={fieldEventList}
        isFetching={isFetching}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        handleEndReached={handleEndReached}
      />
    </View>
  );
};

export default CategoryEventScreen;
