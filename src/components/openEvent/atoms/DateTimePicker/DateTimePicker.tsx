import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { formatDateTime } from 'utils/date';
import openEventStyles from '../OpenEvent.style';
import dateTimePickerStyles from './DateTimePicker.style';

interface Props {
  date: Date;
  setDate: (newDate: Date) => void;
  disabled?: boolean;
  minimumDate?: Date;
  isEmpty?: boolean;
  hasError?: boolean;
  deletePossible?: boolean;
  onAdd?: (newDate: Date) => void;
  onDelete?: () => void;
}

const DateTimePicker = ({
  date,
  setDate,
  disabled = false,
  minimumDate = new Date(),
  isEmpty = false,
  hasError = false,
  deletePossible = false,
  onAdd,
  onDelete,
}: Props) => {
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<boolean>(false);

  const defaultOptions: DatePickerProps = {
    modal: true,
    theme: 'dark',
    date,
    minimumDate,
    cancelText: '취소',
  };

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
        {...defaultOptions}
        open={openDate}
        mode="date"
        title={MENT_OPEN_EVENT.DATE_PICKER_TITLE}
        confirmText="다음"
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
        {...defaultOptions}
        open={openTime}
        mode="time"
        title={MENT_OPEN_EVENT.TIME_PICKER_TITLE}
        confirmText="확인"
        onConfirm={(date) => {
          setOpenTime(false);
          setDate(date);
          if (onAdd) {
            onAdd(date);
          }
        }}
        onCancel={() => {
          setOpenTime(false);
        }}
      />

      {deletePossible && onDelete && (
        <TouchableOpacity
          style={[dateTimePickerStyles.exitWrapper]}
          activeOpacity={0.6}
          onPress={onDelete}
        >
          <Icon name="IconExitCircle" fill="grey" size={18} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default DateTimePicker;
