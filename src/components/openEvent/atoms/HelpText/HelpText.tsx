import Text from 'components/common/Text/Text';
import StatusType from 'constants/app/status';

interface Props {
  content: string;
  status?: StatusType;
}

const HelpText = ({ content, status = StatusType.default }: Props) => {
  return (
    <Text
      variant="body3"
      color={status === StatusType.error ? 'error' : 'main'}
    >
      {content}
    </Text>
  );
};

export default HelpText;
