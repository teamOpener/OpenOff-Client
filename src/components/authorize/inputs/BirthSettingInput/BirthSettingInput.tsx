import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors } from 'styles/theme';
import { dateFormatter } from 'utils/date';
import birthSettingInputStyles from './BirthSettingInput.style';

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  validation: (value: string) => string | undefined;
}

const BirthSettingInput = ({ label, value, setValue, validation }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const resetValue = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setValue('2000-00-00');
  };

  const handleShowDatePicker = () => {
    setOpen(true);
  };

  return (
    <>
      <View style={birthSettingInputStyles.container}>
        <Text style={{ ...birthSettingInputStyles.labelText }}>{label}</Text>
        <Spacing height={20} />

        <View
          style={[
            birthSettingInputStyles.inputContainer,
            {
              borderBottomColor: validation(value) ? colors.error : colors.main,
            },
          ]}
        >
          <Pressable
            style={[birthSettingInputStyles.input]}
            onPress={handleShowDatePicker}
          >
            <Text
              variant="body1"
              style={{
                color: validation(value) ? colors.error : colors.white,
              }}
            >
              {value}
            </Text>
          </Pressable>
          <TouchableOpacity onPress={resetValue}>
            <Icon name="IconExitCircle" size={18} fill="main" />
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        modal
        title="날짜를 선택해주세요."
        mode="date"
        textColor="white"
        theme="dark"
        open={open}
        minimumDate={new Date('1910-01-01')}
        maximumDate={new Date()}
        date={new Date(value)}
        confirmText="적용"
        cancelText="닫기"
        onConfirm={(date) => {
          setValue(() => {
            return dateFormatter(date);
          });
          setOpen(() => {
            return false;
          });
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default BirthSettingInput;
