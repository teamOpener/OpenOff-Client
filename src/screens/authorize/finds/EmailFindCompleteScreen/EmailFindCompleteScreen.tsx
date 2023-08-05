import React from 'react';
import { View, Image } from 'react-native';
import Text from 'components/common/Text/Text';
import emailFindCompleteScreenStyles from './EmailFindCompleteScreen.style';

const EmailFindCompleteScreen = () => {
  return (
    <View style={emailFindCompleteScreenStyles.authorizeContainer}>
      <Image
        style={emailFindCompleteScreenStyles.checkImage}
        source={require('../../../../assets/images/check.png')}
      />
      <Text variant="h4" color="main">
        아이디 찾기 결과입니다!
      </Text>
    </View>
  );
};

export default EmailFindCompleteScreen;
