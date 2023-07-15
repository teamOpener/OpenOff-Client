import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthorizeMenu } from 'constants/menu';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthStackParamList } from 'types/apps/menu';
import Text from '../../../common/Text/Text';
import joinButtonStyle from './JoinButton.style';

const JoinButton = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <View style={joinButtonStyle.container}>
      <TouchableOpacity
        style={joinButtonStyle.buttonContainer}
        onPress={() => navigation.navigate(AuthorizeMenu.EmailPassword)}
      >
        <Text variant="caption" color="white">
          회원가입
        </Text>
      </TouchableOpacity>
      <Text variant="caption" color="white">{`   |   `}</Text>
      <TouchableOpacity>
        <Text
          variant="caption"
          color="white"
          onPress={() => navigation.navigate(AuthorizeMenu.EmailPasswordFind)}
        >
          아이디/비밀번호 찾기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinButton;
