import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthorizeMenu } from 'constants/app/menu';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
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
        <Text style={joinAndFindButtonStyle.text}>
          {MENT_AUTHORIZE.LOGIN.JOIN_THE_MEMBERSHIP}
        </Text>
      </TouchableOpacity>
      <Text style={joinAndFindButtonStyle.text}>
        {MENT_AUTHORIZE.LOGIN.EMPTY_BAR}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(AuthorizeMenu.EmailPasswordFind)}
      >
        <Text style={joinAndFindButtonStyle.text}>
          {MENT_AUTHORIZE.LOGIN.FIND_ID_PASSWORD}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinAndFindButton;
