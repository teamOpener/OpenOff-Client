import i18n from 'locales';
import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import eventEmptyLayoutStyles from './EventEmptyLayout.style';

interface Props {
  helpText?: string;
}

const EventEmptyLayout = ({ helpText }: Props) => {
  return (
    <View style={eventEmptyLayoutStyles.container}>
      <Text variant="body2">
        {helpText ?? i18n.t('event_detail.empty_event')}
      </Text>
    </View>
  );
};

export default EventEmptyLayout;
