import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MENT_OPEN_EVENT from 'constants/openEvent';
import { formatDateTime } from 'utils/date';
import openEventStyles from '../OpenEvent.style';

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  disabled?: boolean;
  minimumDate?: Date;
  isEmpty?: boolean;
  hasError?: boolean;
}

const DateTimePicker = ({
  date,
  setDate,
  disabled = false,
  minimumDate = new Date(),
  isEmpty = false,
  hasError = false,
}: Props) => {
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<boolean>(false);

  const onPress = () => {
    if (disabled) return;
    setOpenDate(true);
  };

  if (!date) return null;

  return (
    <TouchableOpacity
      style={[
        openEventStyles.textWrapper,
        disabled && openEventStyles.textWrapperDisabled,
        hasError && openEventStyles.textWrapperError,
      ]}
      activeOpacity={disabled ? 1 : 0.6}
      onPress={onPress}
    >
      <Text
        style={[openEventStyles.text, isEmpty && openEventStyles.placeholder]}
      >
        {isEmpty
          ? MENT_OPEN_EVENT.DATE_PICKER_PLACEHOLDER
          : formatDateTime(date)}
      </Text>
      <DatePicker
        modal
        open={openDate}
        mode="date"
        date={date}
        theme="dark"
        minimumDate={minimumDate}
        androidVariant="iosClone"
        title={MENT_OPEN_EVENT.DATE_PICKER_TITLE}
        confirmText="다음"
        cancelText="취소"
        onConfirm={(date) => {
          setOpenDate(false);
          setDate(date);
          setOpenTime(true);
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
      />
      <DatePicker
        modal
        open={openTime}
        mode="time"
        date={date}
        theme="dark"
        minimumDate={minimumDate}
        androidVariant="iosClone"
        title={MENT_OPEN_EVENT.TIME_PICKER_TITLE}
        confirmText="확인"
        cancelText="취소"
        onConfirm={(date) => {
          setOpenTime(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpenTime(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default DateTimePicker;
