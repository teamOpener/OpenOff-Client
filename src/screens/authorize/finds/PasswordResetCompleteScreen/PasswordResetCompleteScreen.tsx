import React from 'react';
import { View, Image } from 'react-native';
import Text from 'components/common/Text/Text';
import passwordResetCompleteScreenStyles from './PasswordResetCompleteScreen.style';

const PasswordResetCompleteScreen = () => {
  return (
    <View style={passwordResetCompleteScreenStyles.authorizeContainer}>
      <Image
        style={passwordResetCompleteScreenStyles.checkImage}
        source={require('../../../../assets/images/check.png')}
      />
      <Text variant="h4" color="main">
        비밀번호 변경이 완료되었습니다.
      </Text>
      <Text variant="body2" color="white">
        다시 로그인을 해주세요.
      </Text>
    </View>
  );
};

export default PasswordResetCompleteScreen;
