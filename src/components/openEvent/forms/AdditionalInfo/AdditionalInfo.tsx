import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import additionalInfoStyles from './AdditionalInfo.style';

const AdditionalInfo = () => {
  return (
    <View>
      <OpenEvent.Label content="추가 수집 정보" />
      <View style={additionalInfoStyles.inputContainer}>
        <OpenEvent.Input placeholder="추가로 수집할 정보를 입력해주세요." />
        <OpenEvent.Input placeholder="추가로 수집할 정보를 입력해주세요." />
      </View>
    </View>
  );
};

export default AdditionalInfo;
