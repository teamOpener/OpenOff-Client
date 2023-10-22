import Text from 'components/common/Text/Text';
import i18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import Spacing from 'components/common/Spacing/Spacing';
import hostNeedToLoginContainerStyles from './HostNeedToLoginContainer.style';

const HostNeedToLoginContainer = () => {
  return (
    <View style={hostNeedToLoginContainerStyles.container}>
      <Text variant="body2">{i18n.t('host_need_to_login')}</Text>
      <Spacing height={150} />
    </View>
  );
};

export default HostNeedToLoginContainer;
