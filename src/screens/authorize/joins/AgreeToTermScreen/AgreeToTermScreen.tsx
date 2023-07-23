import { NavigationProp, useNavigation } from '@react-navigation/native';
import CheckButton from 'components/authorize/buttons/CheckButton/CheckButton';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import agreeToTermScreenStyles from './AgreeToTermScreen.style';

interface AgreeList {
  [key: string]: boolean;
}

interface Props {
  dispatch: Dispatch<Action>;
}

const AgreeToTermScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [term, setTerm] = useState<AgreeList>({
    allAgree: false,
    termToTeenager: false,
    termToUse: false,
    termToPrivacy: false,
    termToMarketing: false,
  });
  const handleSingleTerm = (key: string) => {
    setTerm((checkTerm) => {
      return { ...checkTerm, [key]: !checkTerm[key] };
    });
  };
  useEffect(() => {
    if (
      term.termToMarketing &&
      term.termToPrivacy &&
      term.termToTeenager &&
      term.termToUse
    ) {
      setTerm((checkTerm) => {
        return { ...checkTerm, allAgree: true };
      });
    } else {
      setTerm((checkTerm) => {
        return { ...checkTerm, allAgree: false };
      });
    }
  }, [
    term.termToMarketing,
    term.termToPrivacy,
    term.termToTeenager,
    term.termToUse,
  ]);
  const isActive = term.termToPrivacy && term.termToTeenager && term.termToUse;
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () => {
          dispatch({ type: UserInfoStatus.SET_AGREE_TO_TERM, term: 'Y' });
          navigation.navigate(AuthorizeMenu.PhoneCertification);
        },
        label: '확인',
        isActive,
      }}
    >
      <View style={agreeToTermScreenStyles.titleContainer}>
        <Text variant="h1" color="white">
          서비스 이용 약관에
        </Text>
        <Text variant="h1" color="white">
          동의해 주세요.
        </Text>
      </View>
      <View style={agreeToTermScreenStyles.checkButtonContainer}>
        <CheckButton
          value={term.allAgree}
          handlePress={() => {
            setTerm({
              allAgree: !term.allAgree,
              termToTeenager: !term.allAgree,
              termToUse: !term.allAgree,
              termToPrivacy: !term.allAgree,
              termToMarketing: !term.allAgree,
            });
          }}
          marginBottom={30}
          label="네, 모두 동의합니다."
        />
        <CheckButton
          value={term.termToTeenager}
          handlePress={() => handleSingleTerm('termToTeenager')}
          label="(필수) 만 14세 이상입니다."
        />
        <CheckButton
          value={term.termToUse}
          handlePress={() => handleSingleTerm('termToUse')}
          label="(필수) 서비스 이용약관"
        />
        <CheckButton
          value={term.termToPrivacy}
          handlePress={() => handleSingleTerm('termToPrivacy')}
          label="(필수) 개인정보 수집 이용"
        />
        <CheckButton
          value={term.termToMarketing}
          handlePress={() => handleSingleTerm('termToMarketing')}
          label="(선택) 마케팅 정보 수신동의"
        />
      </View>
    </ScreenCover>
  );
};

export default AgreeToTermScreen;
