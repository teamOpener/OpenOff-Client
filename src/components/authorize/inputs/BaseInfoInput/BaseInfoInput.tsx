import ErrorText from 'components/authorize/texts/ErrorText/ErrorText';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from 'styles/theme';
import { dateFormatter } from 'utils/date';
import Spacing from 'components/common/Spacing/Spacing';
import baseInfoInputStyles from './BaseInfoInput.style';

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  validation: (value: string) => string | undefined;
  focusMode?: boolean;
}

const BaseInfoInput = ({
  label,
  value,
  setValue,
  validation,
  focusMode = false,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const resetValue = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setValue(focusMode ? '2000-00-00' : '');
  };
  return (
    <>
      <View style={baseInfoInputStyles.container}>
        <Text style={{ ...baseInfoInputStyles.labelText }}>{label}</Text>
        <Spacing height={20} />

        <View
          style={[
            baseInfoInputStyles.inputContainer,
            {
              borderBottomColor: validation(value) ? colors.error : colors.main,
            },
          ]}
        >
          {!focusMode ? (
            <TextInput
              value={value}
              style={{
                ...baseInfoInputStyles.input,
                color: validation(value) ? colors.error : colors.white,
              }}
              onChangeText={(inputValue) => setValue(inputValue)}
            />
          ) : (
            <Pressable
              style={baseInfoInputStyles.input}
              onPress={() => setOpen(true)}
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
          )}

          <TouchableOpacity onPress={resetValue}>
            <Icon name="IconExitCircle" size={18} fill="main" />
          </TouchableOpacity>
        </View>

        <Spacing height={5} />

        {!focusMode && <ErrorText validation={validation} value={value} />}
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
          confirmText="적용"
          cancelText="닫기"
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
