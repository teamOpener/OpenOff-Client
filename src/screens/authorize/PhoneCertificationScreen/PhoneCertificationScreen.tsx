import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';
import PhoneAuthButton from 'components/authorize/buttons/PhoneAuthButton/PhoneAuthButton';
import phoneCertificationScreenStyles from './PhoneCertificationScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const PhoneCertificationScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [authnumber, setAuthnumber] = useState<string>('');
  const isActive =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    authnumber.length > 1 &&
    !validateAuthNumber(authnumber);
  const handlePress = () => {
    console.log(phonenumber);
  };
  return (
    <View style={phoneCertificationScreenStyles.container}>
      <Text style={phoneCertificationScreenStyles.title}>
        휴대폰 인증을 해주세요.
      </Text>
      <EssentialInput
        validation={validatePhoneNumber}
        label="휴대폰 번호"
        keyboardType="number-pad"
        value={phonenumber}
        setValue={setPhonenumber}
        type="phonenumber"
      >
        <PhoneAuthButton
          label="인증받기"
          active={!(validatePhoneNumber(phonenumber) || phonenumber.length < 2)}
          handlePress={handlePress}
        />
      </EssentialInput>
      <EssentialInput
        validation={validateAuthNumber}
        label="인증번호"
        keyboardType="number-pad"
        value={authnumber}
        setValue={setAuthnumber}
        type="authnumber"
      />
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({ type: UserInfoStatus.SET_AGREE_TO_TERM, value: 'Y' });
          navigation.navigate(AuthorizeMenu.EmailPassword);
        }}
        label="확인"
        isActive={isActive}
      />
    </View>
  );
};

export default PhoneCertificationScreen;
