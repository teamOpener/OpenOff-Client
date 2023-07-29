import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import Icon from 'components/common/Icon/Icon';
import { useOpenEventStore } from 'stores/OpenEventStore';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import additionalInfoStyles from './AdditionalInfo.style';

const AdditionalInfo = () => {
  const { openEvent, setOpenEvent } = useOpenEventStore();
  const [additionalInfo, setAdditionalInfo] = useState<string[]>(['']);

  // TODO: 빈 정보 갯수 제한
  const addInfo = () => {
    const newInfo = [...additionalInfo, ''];
    setAdditionalInfo(newInfo);
  };

  const removeInfo = (idx: number) => {
    // TODO: 없어도 될 것 같긴함
    // if (additionalInfo.length === 1) {
    //   return;
    // }
    const newInfo = [...additionalInfo];
    newInfo.splice(idx, 1);
    setAdditionalInfo(newInfo);
  };

  const handleChangeText = (value: string, idx: number) => {
    const newInfo = [...additionalInfo];
    newInfo[idx] = value;
    setAdditionalInfo(newInfo);
  };

  // 공백인 데이터들 빼고 저장합니다.
  useEffect(() => {
    const nonEmptyStrings = additionalInfo.filter((item) => item.trim() !== '');

    setOpenEvent({
      ...openEvent,
      additionalInformation: nonEmptyStrings,
    });
  }, [additionalInfo]);

  return (
    <View>
      <View style={additionalInfoStyles.rowContainer}>
        <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.ADDITIONAL_INFO} />
        <TouchableOpacity
          activeOpacity={0.6}
          style={additionalInfoStyles.iconContainer}
          onPress={addInfo}
        >
          <Icon name="IconPlus" size={10} style={additionalInfoStyles.icon} />
        </TouchableOpacity>
      </View>

      <View style={additionalInfoStyles.infoGroup}>
        {additionalInfo.map((info, idx) => (
          <View key={idx} style={additionalInfoStyles.inputContainer}>
            <View
              style={[
                additionalInfoStyles.rowContainer,
                additionalInfoStyles.inputRowContainer,
              ]}
            >
              <OpenEvent.Input
                placeholder={MENT_OPEN_EVENT.PLACEHOLDER.ADDITIONAL_INFO}
                value={info}
                onChangeText={(value) => handleChangeText(value, idx)}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={additionalInfoStyles.iconContainer}
                onPress={() => removeInfo(idx)}
              >
                <Icon
                  name="IconMinus"
                  size={10}
                  style={additionalInfoStyles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AdditionalInfo;
