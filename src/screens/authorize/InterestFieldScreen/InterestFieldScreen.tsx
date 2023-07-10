import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import FieldButtonGroup from 'components/authorize/groups/FieldButtonGroup/FieldButtonGroup';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import interestField from 'data/lists/interestField';
import { Dispatch, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Field } from 'types/apps/group';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import interestFieldScreenStyles from './InterestFieldScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const InterestFieldScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fields, setFields] = useState<Field[]>(interestField);
  useEffect(() => {
    setFields(interestField);
  }, []);
  const computedCount = () => {
    let count = 0;
    fields.forEach((mappingField) => {
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
        fields={fields}
        setFields={setFields}
        computedCount={computedCount()}
      />
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({ type: UserInfoStatus.SET_AGREE_TO_TERM, term: 'Y' });
          navigation.navigate(AuthorizeMenu.JoinComplete);
        }}
        label="확인"
        isActive={computedCount() >= 1}
      />
    </View>
  );
};

export default InterestFieldScreen;
