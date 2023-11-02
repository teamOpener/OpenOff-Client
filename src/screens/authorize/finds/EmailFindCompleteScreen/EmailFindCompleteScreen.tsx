import i18n from 'locales';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import { AuthorizeMenu } from 'constants/app/menu';
import { Image, View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import emailFindCompleteScreenStyles from './EmailFindCompleteScreen.style';

interface Props {
  email?: string;
}

const EmailFindCompleteScreen = ({ email }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () => navigation.navigate(AuthorizeMenu.Login),
        label: i18n.t('authorize.back_to_login'),
        isActive: true,
      }}
    >
      <View style={emailFindCompleteScreenStyles.authorizeContainer}>
        <Image
          style={emailFindCompleteScreenStyles.checkImage}
          source={require('../../../../assets/images/check.png')}
        />
        <Text variant="h4" color="main">
          {i18n.t('authorize.find_id_result')}
        </Text>
        <Text variant="h3" color="white">
          {email}
        </Text>
      </View>
    </ScreenCover>
  );
};

export default EmailFindCompleteScreen;
