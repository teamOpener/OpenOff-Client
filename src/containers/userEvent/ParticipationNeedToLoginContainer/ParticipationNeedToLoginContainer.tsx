import Text from 'components/common/Text/Text';
import i18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import Spacing from 'components/common/Spacing/Spacing';
import participationNeedToLoginContainerStyles from './ParticipationNeedToLoginContainer.style';

const ParticipationNeedToLoginContainer = () => {
  return (
    <View style={participationNeedToLoginContainerStyles.container}>
      <Text variant="body2">{i18n.t('participation_need_to_login')}</Text>
      <Spacing height={150} />
    </View>
  );
};

export default ParticipationNeedToLoginContainer;
