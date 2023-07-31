import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { AlertCode } from 'constants/code';
import { SelectUserAlertResponse } from 'models/alert/response/SelectUserAlertResponse.Dto';
import { View } from 'react-native';
import alertCardStyles from './AlertCard.style';

interface Props {
  alert: SelectUserAlertResponse;
}

const AlertCard = ({ alert }: Props) => {
  const TODAY = '오늘';
  const YESTERDAY = '어제';
  const getAlertDiffDate = (regDate: string) => {
    const currentDate = new Date();
    const newRegDate = new Date(regDate);
    const diffDate = currentDate.getTime() - newRegDate.getTime();
    const calcDiffDate = Math.abs(diffDate / (1000 * 60 * 60 * 24));
    if (calcDiffDate > 1) {
      return TODAY;
    }
    if (calcDiffDate === 1) {
      return YESTERDAY;
    }
    return `${newRegDate.getMonth() + 1}월 ${newRegDate.getDate()}일`;
  };
  return (
    <View style={alertCardStyles.container}>
      {alert.alertType === AlertCode.EA ? (
        <Icon name="IconMegaPhone" size={23} fill="main" />
      ) : (
        <Icon name="IconAlertComment" size={23} fill="main" />
      )}
      <View style={alertCardStyles.alertInfo}>
        <Text style={alertCardStyles.alertTitle}>{alert.title}</Text>
        <Text style={alertCardStyles.alertDate}>
          {getAlertDiffDate(alert.regDate)}
        </Text>
      </View>
    </View>
  );
};

export default AlertCard;
