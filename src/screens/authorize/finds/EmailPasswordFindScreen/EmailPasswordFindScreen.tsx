import Text from 'components/common/Text/Text';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import EmailFindScreen from '../EmailFindScreen/EmailFindScreen';
import emailPasswordFindScreenStyles from './EmailPasswordFindScreen.style';

const EmailPasswordFindScreen = () => {
  const [screenMode, setScreenMode] = useState<'id' | 'password'>('id');
  return (
    <View style={emailPasswordFindScreenStyles.container}>
      <View style={emailPasswordFindScreenStyles.titleContainer}>
        <Text variant="h3" color="white">
          {screenMode === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
        </Text>
      </View>
      <View style={emailPasswordFindScreenStyles.findController}>
        <TouchableOpacity
          style={emailPasswordFindScreenStyles.button}
          onPress={() => setScreenMode('id')}
        >
          <View style={emailPasswordFindScreenStyles.buttonTextContainer}>
            <Text>아이디</Text>
          </View>
          <View
            style={{
              ...emailPasswordFindScreenStyles.activeNotifier,
              backgroundColor:
                screenMode === 'id' ? colors.main : colors.background,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={emailPasswordFindScreenStyles.button}
          onPress={() => setScreenMode('password')}
        >
          <View style={emailPasswordFindScreenStyles.buttonTextContainer}>
            <Text>비밀번호</Text>
          </View>
          <View
            style={{
              ...emailPasswordFindScreenStyles.activeNotifier,
              backgroundColor:
                screenMode === 'password' ? colors.main : colors.background,
            }}
          />
        </TouchableOpacity>
      </View>
      {screenMode === 'id' ? <EmailFindScreen /> : <View />}
    </View>
  );
};

export default EmailPasswordFindScreen;
