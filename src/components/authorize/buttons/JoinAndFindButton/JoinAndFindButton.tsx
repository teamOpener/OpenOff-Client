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
        activeOpacity={0.8}
        style={joinAndFindButtonStyle.buttonContainer}
        onPress={() => navigation.navigate(AuthorizeMenu.EmailPassword)}
      >
        <Text style={joinAndFindButtonStyle.text}>회원가입</Text>
      </TouchableOpacity>
      <Text style={joinAndFindButtonStyle.text}>{`   |   `}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(AuthorizeMenu.EmailPasswordFind)}
      >
        <Text style={joinAndFindButtonStyle.text}>아이디/비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinAndFindButton;
