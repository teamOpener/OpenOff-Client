import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { QRCheckType } from 'types/hostQr/QRCheck';
import qRResultViewStyles from './QRResultView.style';

interface Props {
  qrCheckType: QRCheckType;
  text: string;
}

const QRResultView = ({ qrCheckType, text }: Props) => {
  if (qrCheckType === 'default' || text === '') {
    return null;
  }

  const borderColor =
    qrCheckType === 'success' ? colors.lightGreen : colors.error;
  const textColor = qrCheckType === 'success' ? 'lightGreen' : 'error';

  return (
    <View style={[qRResultViewStyles.resultWrapper, { borderColor }]}>
      <Text color={textColor} style={qRResultViewStyles.resultText}>
        {text}
      </Text>
    </View>
  );
};

export default QRResultView;
