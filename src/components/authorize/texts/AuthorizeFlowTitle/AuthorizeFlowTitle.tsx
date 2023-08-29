import Text from 'components/common/Text/Text';
import { useId } from 'react';
import { View } from 'react-native';
import authorizeFlowTitleStyles from './AuthorizeFlowTitle.style';

interface Props {
  titleElements: string[];
}

const AuthorizeFlowTitle = ({ titleElements }: Props) => {
  const titleId = useId();
  return (
    <View>
      {titleElements.length === 0 ? null : (
        <View style={authorizeFlowTitleStyles.titleContainer}>
          {titleElements.map((title, _id) => (
            <Text
              key={titleId + _id}
              variant="h1"
              style={authorizeFlowTitleStyles.title}
            >
              {title}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default AuthorizeFlowTitle;
