import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import FieldButtonGroup from 'components/authorize/groups/FieldButtonGroup/FieldButtonGroup';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import field from 'data/lists/field';
import { Dispatch, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Field } from 'types/apps/group';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import interestFieldScreenStyles from './InterestFieldScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const InterestFieldScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [interestField, setInterestField] = useState<Field[]>(field);
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
  return (
    <View style={interestFieldScreenStyles.container}>
      <Text style={interestFieldScreenStyles.title}>
        관심 분야를 설정해주세요.
      </Text>
      <Image
        style={interestFieldScreenStyles.fieldInfomation}
        // eslint-disable-next-line global-require
        source={require('../../../assets/images/joinInformation.png')}
      />
      <FieldButtonGroup
        fields={interestField}
        setFields={setInterestField}
        computedCount={computedCount()}
      />
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({
            type: UserInfoStatus.SET_INTEREST_FIELD,
            interestField: fields.filter((field) => field.isActive),
          });
          navigation.navigate(AuthorizeMenu.JoinComplete);
        }}
        label="확인"
        isActive={computedCount() >= 1}
      />
    </View>
  );
};

export default InterestFieldScreen;
