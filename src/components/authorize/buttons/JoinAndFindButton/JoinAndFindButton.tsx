import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthorizeMenu } from 'constants/menu';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthStackParamList } from 'types/apps/menu';
import Text from '../../../common/Text/Text';
import joinAndFindButtonStyle from './JoinAndFindButton.style';

const JoinAndFindButton = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <View style={joinAndFindButtonStyle.container}>
      <TouchableOpacity
        style={joinAndFindButtonStyle.buttonContainer}
        onPress={() => navigation.navigate(AuthorizeMenu.EmailPassword)}
      >
        <Text variant="caption" color="white">
          회원가입
        </Text>
      </TouchableOpacity>
      <Text variant="caption" color="white">{`   |   `}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(AuthorizeMenu.EmailPasswordFind)}
      >
        <Text variant="caption" color="white">
          아이디/비밀번호 찾기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinAndFindButton;
