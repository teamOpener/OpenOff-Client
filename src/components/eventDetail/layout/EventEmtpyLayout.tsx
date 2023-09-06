import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import eventEmptyLayoutStyles from './EventEmptyLayout.style';

interface Props {
  helpText?: string;
}

const EventEmptyLayout = ({ helpText }: Props) => {
  return (
    <View style={eventEmptyLayoutStyles.container}>
      <Text variant="body2">
        {helpText ?? MENT_EVENT_DETAIL.ERROR.EMPTY_EVENT}
      </Text>
    </View>
  );
};

export default EventEmptyLayout;
