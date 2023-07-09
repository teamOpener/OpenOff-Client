import ErrorText from 'components/authorize/texts/ErrorText/ErrorText';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from 'styles/theme';
import baseInfoInputStyles from './BaseInfoInput.style';

interface Props {
  label: string;
  value: string;
  width: number;
  setValue: Dispatch<SetStateAction<string>>;
  validation: (value: string) => string | undefined;
  focusMode?: boolean;
}

const BaseInfoInput = ({
  label,
  value,
  setValue,
  validation,
  width,
  focusMode = false,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const resetValue = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setValue(focusMode ? '2000-00-00' : '');
  };
  const calcDay = (dayValue: number) => {
    if (dayValue >= 10) {
      return dayValue;
    }
    return `0${dayValue}`;
  };

  const dateFormatter = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${calcDay(month)}-${calcDay(day)}`;
  };
  return (
    <>
      <View style={{ ...baseInfoInputStyles.container, width }}>
        <Text style={{ ...baseInfoInputStyles.inputTitle, width }}>
          {label}
        </Text>
        <TextInput
          onFocus={
            focusMode
              ? () => {
                  setOpen(true);
                }
              : () => {
                  return false;
                }
          }
          value={value}
          style={{
            ...baseInfoInputStyles.input,
            width,
            color: validation(value) ? colors.error : colors.white,
            borderColor: validation(value) ? colors.error : colors.main,
          }}
          onChangeText={(value) => setValue(value)}
        />
        <View
          style={{ ...baseInfoInputStyles.resetPosition, left: width - 18 }}
        >
          <TouchableOpacity onPress={resetValue}>
            <Image
              style={baseInfoInputStyles.resetImage}
              // eslint-disable-next-line global-require
              source={require('../../../../assets/images/xbutton.png')}
            />
          </TouchableOpacity>
        </View>
        {!focusMode && (
          <ErrorText validation={validation} value={value} width={width} />
        )}
      </View>
      {focusMode && (
        <DatePicker
          modal
          title="날짜를 선택해주세요."
          mode="date"
          textColor="white"
          theme="dark"
          open={open}
          date={new Date(value)}
          onConfirm={(date) => {
            setOpen(false);
            setValue(dateFormatter(date));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default BaseInfoInput;
