import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FieldButtonGroup from 'components/authorize/groups/FieldButtonGroup/FieldButtonGroup';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import fieldData from 'data/lists/fieldData';
import { useConcludeOnBoarding } from 'hooks/queries/user';
import { Dispatch, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { colors } from 'styles/theme';
import { Field } from 'types/apps/group';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import interestFieldScreenStyles from './InterestFieldScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const InterestFieldScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [interestField, setInterestField] = useState<Field[]>(fieldData);
  const { mutateAsync: concludeOnBoarding, isLoading } =
    useConcludeOnBoarding();

  useEffect(() => {
    setInterestField(interestField);
  }, [interestField]);

  const computedCount = () => {
    let count = 0;
    interestField.forEach((mappingField) => {
      if (mappingField.isActive) {
        count += 1;
      }
    });
    return count;
  };

  const handleAuthorize = () => {
    concludeOnBoarding({
      onBoarding: {
        nickname: '',
        username: '',
        gender: 'MAN',
        year: 0,
        month: 0,
        day: 0,
      },
      fields: {
        fieldTypeList: interestField
          .filter((fieldElement) => fieldElement.isActive)
          .map((field) => field.value),
      },
    }).then(() => {
      dispatch({
        type: UserInfoStatus.SET_INTEREST_FIELD,
        interestField: interestField.filter(
          (fieldElement) => fieldElement.isActive,
        ),
      });
      navigation.navigate(AuthorizeMenu.JoinComplete);
    });
  };

  if (isLoading) {
    return <CommonLoading isActive backgroundColor={colors.background} />;
  }

  return (
    <ScreenCover
      titleElements={['관심 분야를 설정해주세요.']}
      authorizeButton={{
        handlePress: handleAuthorize,
        label: '확인',
        isActive: computedCount() >= 1,
      }}
    >
      <Image
        style={interestFieldScreenStyles.fieldInfomation}
        source={require('../../../../assets/images/interestFieldInfo.png')}
      />
      <FieldButtonGroup
        fields={interestField}
        setFields={setInterestField}
        computedCount={computedCount()}
      />
    </ScreenCover>
  );
};

export default InterestFieldScreen;
