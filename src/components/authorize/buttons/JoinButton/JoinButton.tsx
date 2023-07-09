import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthorizeMenu } from 'constants/menu';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from 'types/apps/menu';
import Text from '../../../common/Text/Text';
import joinButtonStyle from './JoinButton.style';

const JoinButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <TouchableOpacity
        style={joinButtonStyle.container}
        onPress={() => navigation.navigate(AuthorizeMenu.AgreeToTerm)}
      >
        <Text variant="caption" color="white">
          회원가입
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinButton;
