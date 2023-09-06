import { RouteProp, useRoute } from '@react-navigation/native';
import TopFieldButtonGroup from 'components/home/groups/TopFieldButtonGroup/TopFieldButtonGroup';
import InfinityEventCardList from 'components/home/lists/InfinityEventCardList/InfinityEventCardList';
import { FieldCode } from 'constants/interest/interest';
import useInterestFields from 'hooks/interest/useInterestFields';
import { useFieldEventLists } from 'hooks/queries/event';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Field } from 'types/interest';
import categoryEventScreenStyles from './CategoryEventScreen.style';

type ParamList = {
  categoryData: {
    fieldValue: string;
  };
};

const CategoryEventScreen = () => {
  const { params } = useRoute<RouteProp<ParamList, 'categoryData'>>();

  const { generateInterestFieldTags } = useInterestFields();

  const [eventFields, setFields] = useState<Field[]>(
    generateInterestFieldTags(),
  );
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
    setEventFields(generateInterestFieldTags(), params.fieldValue);
  }, [params.fieldValue]);

  return (
    <View style={categoryEventScreenStyles.container}>
      <TopFieldButtonGroup
        field={eventFields}
        handleFieldPress={handleFieldPress}
      />
      <InfinityEventCardList
        isFetching={isFetching}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        pageData={fieldEventList}
        handleEndReached={handleEndReached}
        type="category"
      />
    </View>
  );
};

export default CategoryEventScreen;
