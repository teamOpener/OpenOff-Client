import i18n from 'locales';
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
        {dayjs(date).format(i18n.t('ledger_date_format'))}
      </Text>
    </View>
  );
};

export default LedgerHeader;
