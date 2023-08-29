import Text from 'components/common/Text/Text';
import dayjs from 'dayjs';
import { View } from 'react-native';
import ledgerHeaderStyles from './LedgerHeader.style';

interface Props {
  title: string;
  date: string;
}

const LedgerHeader = ({ title, date }: Props) => {
  return (
    <View style={ledgerHeaderStyles.container}>
      <Text style={ledgerHeaderStyles.titleText} numberOfLines={1}>
        {title}
      </Text>
      <Text style={ledgerHeaderStyles.subTitleText}>
        {dayjs(date).format('M/DD ddd요일 HH:MM')}
      </Text>
    </View>
  );
};

export default LedgerHeader;
