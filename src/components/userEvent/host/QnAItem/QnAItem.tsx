import { ScrollView } from 'react-native';
import Text from 'components/common/Text/Text';
import { QnAInfo } from 'models/ledger/entity/QnAInfo';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import qnAItemStyles from './QnAItem.style';

interface Props {
  index: number;
  qnaInfo: QnAInfo;
}

const QnAItem = ({ index, qnaInfo }: Props) => {
  return (
    <SpaceLayout direction="row" size={10} style={qnAItemStyles.full}>
      <Text color="main" style={qnAItemStyles.text}>{`질문${index + 1}`}</Text>

      <SpaceLayout size={9} style={qnAItemStyles.full}>
        <Text style={qnAItemStyles.text}>{qnaInfo.question}</Text>
        <ScrollView style={qnAItemStyles.answerWrapper}>
          <Text style={qnAItemStyles.text}>{qnaInfo.answer}</Text>
        </ScrollView>
      </SpaceLayout>
    </SpaceLayout>
  );
};

export default QnAItem;
