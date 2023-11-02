import i18n from 'locales';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
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

  const defaultOptions: DatePickerProps = {
    modal: true,
    theme: 'dark',
    date,
    minimumDate,
    cancelText: i18n.t('cancel'),
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
        {isEmpty ? i18n.t('date_picker_placeholder') : formatDateTime(date)}
      </Text>
      <DatePicker
        {...defaultOptions}
        open={openDate}
        mode="datetime"
        title={i18n.t('select_date_and_time')}
        confirmText={i18n.t('confirm')}
        onConfirm={(date) => {
          setOpenDate(false);
          setDate(date);
          if (onAdd) {
            onAdd(date);
          }
        }}
        onCancel={() => {
          setOpenDate(false);
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
