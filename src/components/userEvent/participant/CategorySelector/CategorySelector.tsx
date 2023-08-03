import React, { useState } from 'react';
import { LayoutChangeEvent, TouchableOpacity, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { FieldDataType } from 'types/event/filedDataType';
import { FieldCode } from 'constants/code';
import { CONSTANT_PARTICIPANT } from 'constants/userEvent/participant/participantConstants';
import categorySelectorStyles from './CategorySelector.style';
import TagGroup from '../Tag/TagGroup';
import Tag from '../Tag/Tag';

interface Props {
  field: FieldDataType[];
  setField: React.Dispatch<FieldDataType[]>;
}

const CategorySelector = ({ field, setField }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [barHeight, setBarHeight] = useState<number>(
    CONSTANT_PARTICIPANT.BAR_INITIAL_HEIGHT,
  );

  const activeField = field.find((fieldData) => fieldData.isActive);

  const handleHeight = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setBarHeight(height);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleField = (activeFieldCode: FieldCode | null) => {
    const newFieldData = field.map((fieldData) => ({
      ...fieldData,
      isActive: activeFieldCode !== null && fieldData.value === activeFieldCode,
    }));

    setField(newFieldData);
    setIsOpen(false);
  };

  return (
    <View style={categorySelectorStyles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={categorySelectorStyles.container}
        hitSlop={{ right: 11 }}
        onPress={handleOpen}
        onLayout={handleHeight}
      >
        <Text style={categorySelectorStyles.title}>
          {activeField?.label ?? '전체'}
        </Text>
        <Icon
          name={isOpen ? 'IconArrowUp' : 'IconArrowDown'}
          size={13}
          fill="white"
        />
      </TouchableOpacity>

      {isOpen && (
        <TagGroup style={{ top: barHeight }}>
          <Tag
            label="전체"
            isSelected={!activeField}
            onPress={() => handleField(null)}
          />
          {field.map((fieldData) => (
            <Tag
              key={fieldData.value}
              label={fieldData.label}
              isSelected={fieldData.isActive}
              onPress={() => handleField(fieldData.value)}
            />
          ))}
        </TagGroup>
      )}
    </View>
  );
};

export default CategorySelector;
