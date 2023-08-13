import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { FieldCode, getFieldName } from 'constants/code';
import { TouchableOpacity, View } from 'react-native';
import { ticketListDateFormatter } from 'utils/date';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import ticketListStyles from './TicketList.style';
import XSmallTag from '../XSmallTag/XSmallTag';

interface Props {
  eventTitle: string;
  eventDateList: string[];
  fieldTypeList: FieldCode[];
  onPress: () => void;
}

const TicketList = ({
  eventTitle,
  eventDateList,
  fieldTypeList,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={ticketListStyles.container}
      onPress={onPress}
    >
      <View style={ticketListStyles.info}>
        <View>
          <Text style={ticketListStyles.titleText}>{eventTitle}</Text>
          <Text>{ticketListDateFormatter(eventDateList)}</Text>
        </View>
        <SpaceLayout direction="row" size={5}>
          {fieldTypeList.map((fieldType, idx) => (
            <XSmallTag key={idx} label={getFieldName(fieldType)} />
          ))}
        </SpaceLayout>
      </View>

      <View style={ticketListStyles.line}>
        <View style={ticketListStyles.circle} />
        <View style={ticketListStyles.circle} />
      </View>

      <View style={ticketListStyles.more}>
        <Icon name="IconArrowRight" size={16} fill="white" />
      </View>
    </TouchableOpacity>
  );
};

export default TicketList;
