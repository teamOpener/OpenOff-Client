import dayjs from 'dayjs';
import { colors } from 'styles/theme';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import Text from 'components/common/Text/Text';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import Icon from 'components/common/Icon/Icon';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import TicketType from 'models/ledger/entity/TicketType';
import * as Icons from 'assets/icons';
import useNavigator from 'hooks/navigator/useNavigator';
import ticketCardStyles from './TicketCard.style';

interface Props extends ViewProps {
  ticketInfo: MyTicketInfoResponseDto;
}

const TicketCard = ({ ticketInfo, style, ...rest }: Props) => {
  const { stackNavigation } = useNavigator();

  const whiteTypes: TicketType[] = [TicketType.A, TicketType.C, TicketType.E];
  const isWhiteType: boolean = whiteTypes.includes(ticketInfo.ticketType);

  const textColor: keyof typeof colors = isWhiteType ? 'main' : 'white';

  const getIconName = (ticketType: TicketType): keyof typeof Icons => {
    switch (ticketType) {
      case TicketType.F:
      case TicketType.E:
        return 'IconTicketCircle';
      case TicketType.D:
      case TicketType.C:
        return 'IconTicketHeart';
      case TicketType.B:
      case TicketType.A:
      default:
        return 'IconTicketStar';
    }
  };

  const handlePressDetail = (eventInfoId: number) => {
    stackNavigation.navigate('EventDetail', {
      id: eventInfoId,
    });
  };

  // TODO: 승인 거부, 취소 - 회색?, opacity?
  return (
    <View
      style={[
        ticketCardStyles.container,
        style,
        {
          backgroundColor: isWhiteType ? colors.white : colors.main,
        },
      ]}
      {...rest}
    >
      <View style={ticketCardStyles.eventMainInfo}>
        <Text color={textColor} style={ticketCardStyles.title}>
          {ticketInfo.eventTitle}
        </Text>
        <Text color={textColor} style={ticketCardStyles.address}>
          {/* TODO: getFullAddress util 함수 사용 */}
          {ticketInfo.streetRoadAddress}
        </Text>
        <Text
          color={textColor}
          style={ticketCardStyles.reservationNumber}
        >{`${MENT_PARTICIPANT.MAIN.RESERVATION_NUMBER}: ${ticketInfo.ticketIndex}`}</Text>
      </View>

      <View style={ticketCardStyles.iconContainer}>
        <Icon
          name={getIconName(ticketInfo.ticketType)}
          fill="background"
          size={125}
        />
        <Icon
          name={
            getIconName(ticketInfo.ticketType) === 'IconTicketCircle'
              ? 'IconTicketCircles'
              : getIconName(ticketInfo.ticketType)
          }
          fill={textColor}
          size={125}
        />
        <Icon
          name={getIconName(ticketInfo.ticketType)}
          fill="background"
          size={125}
        />
      </View>

      <View style={ticketCardStyles.eventSubInfo}>
        <View>
          <Text color={textColor} style={ticketCardStyles.dateTitle}>
            {MENT_PARTICIPANT.MAIN.DATE_TIME}
          </Text>
          <View style={ticketCardStyles.dateContainer}>
            <Text color={textColor} style={ticketCardStyles.date}>
              {dayjs(ticketInfo.eventDate).format('M/DD')}
            </Text>
            <Text color={textColor} style={ticketCardStyles.day}>
              {`(${dayjs(ticketInfo.eventDate).format('ddd')})`}
            </Text>
          </View>
          <Text color={textColor} style={ticketCardStyles.time}>
            {dayjs(ticketInfo.eventDate).format('hh:mm')}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={ticketCardStyles.btn}
          onPress={() => handlePressDetail(ticketInfo.eventInfoId)}
        >
          <Text color="main" style={ticketCardStyles.btnText}>
            {MENT_PARTICIPANT.MAIN.EVENT_DETAIL}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TicketCard;
