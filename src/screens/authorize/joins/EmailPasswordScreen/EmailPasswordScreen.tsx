import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import useDialog from 'hooks/app/useDialog';
import { useEmailCheck, useNormalSignUp } from 'hooks/queries/auth';
import { Dispatch, useState } from 'react';
import { colors } from 'styles/theme';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateEmail, validatePassword } from 'utils/validate';

interface Props {
  dispatch: Dispatch<Action>;
}

const EmailPasswordScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { openDialog } = useDialog();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutateAsync: checkEmail, isLoading: isEmailCheckLoading } =
    useEmailCheck();

  const { mutateAsync: normalSignUp, isLoading: isNormalSignUpLoading } =
    useNormalSignUp();

  const isActive =
    !validateEmail(email) &&
    email.length > 1 &&
    !validatePassword(password) &&
    password.length > 1;

  const handleNormalSignUp = async () => {
    await normalSignUp({ email, password });
    dispatch({
      type: UserInfoStatus.SET_EMAIL_ADDRESS_PASSWORD,
      emailPassword: { email, password },
    });
    navigation.navigate(AuthorizeMenu.AgreeToTerm);
  };

  const handleAuthorize = async () => {
    const checkInfo = await checkEmail(email);
    if (checkInfo.data?.check) handleNormalSignUp();
    else openDialog({ text: '중복된 이메일입니다.', type: 'validate' });
  };

  if (isEmailCheckLoading || isNormalSignUpLoading)
    return <CommonLoading isActive backgroundColor={colors.background} />;

  return (
    <ScreenCover
      authorizeButton={{
        handlePress: handleAuthorize,
        label: '확인',
        isActive,
      }}
      titleElements={['이메일과 비밀번호를', '입력해주세요.']}
    >
      <EssentialInput
        validation={validateEmail}
        label="이메일 주소"
        value={email}
        setValue={setEmail}
        type="email"
      />
      <EssentialInput
        validation={validatePassword}
        label="비밀번호"
        value={password}
        setValue={setPassword}
        type="password"
      />
    </ScreenCover>
  );
};

export default EmailPasswordScreen;
