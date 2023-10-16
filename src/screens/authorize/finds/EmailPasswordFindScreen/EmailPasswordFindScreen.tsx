import i18n from 'locales';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text/Text';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import EmailFindScreen from '../EmailFindScreen/EmailFindScreen';
import PasswordFindScreen from '../PasswordFindScreen/PasswordFindScreen';
import emailPasswordFindScreenStyles from './EmailPasswordFindScreen.style';

type ParamList = {
  passwordFind: undefined;
};

const EmailPasswordFindScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [screenMode, setScreenMode] = useState<'id' | 'password'>('id');

  useEffect(() => {
    navigation.setOptions({
      title: screenMode === 'id' ? i18n.t('find_id') : i18n.t('find_password'),
    });
  }, [navigation, screenMode]);

  return (
    <View style={emailPasswordFindScreenStyles.container}>
      <View style={emailPasswordFindScreenStyles.findController}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            emailPasswordFindScreenStyles.button,
            screenMode === 'id' && emailPasswordFindScreenStyles.activeButton,
          ]}
          onPress={() => setScreenMode('id')}
        >
          <View style={emailPasswordFindScreenStyles.buttonTextContainer}>
            <Text style={emailPasswordFindScreenStyles.tabText}>
              {i18n.t('id')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            emailPasswordFindScreenStyles.button,
            screenMode === 'password' &&
              emailPasswordFindScreenStyles.activeButton,
          ]}
          onPress={() => setScreenMode('password')}
        >
          <View style={emailPasswordFindScreenStyles.buttonTextContainer}>
            <Text style={emailPasswordFindScreenStyles.tabText}>
              {i18n.t('password')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {screenMode === 'id' ? <EmailFindScreen /> : <PasswordFindScreen />}
    </View>
  );
};

export default EmailPasswordFindScreen;
