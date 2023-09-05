import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FieldButtonGroup from 'components/authorize/groups/FieldButtonGroup/FieldButtonGroup';
import Spacing from 'components/common/Spacing/Spacing';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { AuthorizeMenu } from 'constants/app/menu';
import { UserInfoStatus } from 'constants/authorize/join';
import useInterestField from 'hooks/authorize/useInterestField';
import { useConcludeOnBoarding } from 'hooks/queries/user';
import { Dispatch, useEffect } from 'react';
import { Image } from 'react-native';
import { colors } from 'styles/theme';
import { AuthStackParamList } from 'types/apps/menu';
import { Action, JoinInfo } from 'types/join';
import interestFieldScreenStyles from './InterestFieldScreen.style';

interface Props {
  state: JoinInfo;
  dispatch: Dispatch<Action>;
}

const InterestFieldScreen = ({ state, dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { computedCount, setInterestField, interestField } = useInterestField();
  const { mutateAsync: concludeOnBoarding, isLoading } =
    useConcludeOnBoarding();

  useEffect(() => {
    setInterestField(interestField);
  }, [interestField]);

  const handleAuthorize = async () => {
    const params = {
      onBoarding: {
        nickname: state.nickname,
        username: state.username,
        gender: state.gender,
        year: parseInt(state.birth.substring(0, 4), 10),
        month: parseInt(state.birth.substring(5, 7), 10),
        day: parseInt(state.birth.substring(8, 10), 10),
      },
      fields: {
        fieldTypeList: interestField
          .filter((fieldElement) => fieldElement.isActive)
          .map((field) => field.value),
      },
    };
    await concludeOnBoarding(params);
    dispatch({
      type: UserInfoStatus.SET_INTEREST_FIELD,
      interestField: interestField.filter(
        (fieldElement) => fieldElement.isActive,
      ),
    });
    navigation.navigate(AuthorizeMenu.JoinComplete);
  };

  if (isLoading) {
    return <CommonLoading isActive backgroundColor={colors.background} />;
  }

  return (
    <ScreenCover
      titleElements={['관심 분야를 설정해주세요.']}
      authorizeButton={{
        handlePress: handleAuthorize,
        label: '다음',
        isActive: computedCount() >= 1,
      }}
    >
      <Image
        style={interestFieldScreenStyles.fieldInfomation}
        source={require('../../../../assets/images/interestFieldInfo.png')}
      />
      <Spacing height={42} />

      <FieldButtonGroup
        fields={interestField}
        setFields={setInterestField}
        computedCount={computedCount()}
      />
    </ScreenCover>
  );
};

export default InterestFieldScreen;
