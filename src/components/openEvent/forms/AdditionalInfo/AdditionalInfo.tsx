import i18n from 'locales';
import Icon from 'components/common/Icon/Icon';
import { OpenEvent } from 'components/openEvent';
import { TouchableOpacity, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import additionalInfoStyles from './AdditionalInfo.style';

const AdditionalInfo = () => {
  const { openEvent, setOpenEvent } = useOpenEventStore();
  const { additionalInformation } = openEvent;

  const addInfo = () => {
    const newInfo = [...additionalInformation, ''];
    setOpenEvent({ ...openEvent, additionalInformation: newInfo });
  };

  const removeInfo = (idx: number) => {
    const newInfo = [...additionalInformation];
    newInfo.splice(idx, 1);
    setOpenEvent({ ...openEvent, additionalInformation: newInfo });
  };

  const handleChangeText = (value: string, idx: number) => {
    const newInfo = [...additionalInformation];
    newInfo[idx] = value;
    setOpenEvent({ ...openEvent, additionalInformation: newInfo });
  };

  return (
    <View>
      <View style={additionalInfoStyles.rowContainer}>
        <OpenEvent.Label content={i18n.t('additional_info')} />
        <TouchableOpacity
          activeOpacity={0.6}
          style={additionalInfoStyles.iconContainer}
          onPress={addInfo}
        >
          <Icon name="IconPlus" size={10} style={additionalInfoStyles.icon} />
        </TouchableOpacity>
      </View>

      <View style={additionalInfoStyles.infoGroup}>
        {additionalInformation.map((info, idx) => (
          <View key={idx} style={additionalInfoStyles.inputContainer}>
            <View
              style={[
                additionalInfoStyles.rowContainer,
                additionalInfoStyles.inputRowContainer,
              ]}
            >
              <OpenEvent.Input
                placeholder={i18n.t('additional_placeholder')}
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
