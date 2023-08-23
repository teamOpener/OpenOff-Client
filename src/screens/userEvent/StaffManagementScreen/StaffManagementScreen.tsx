import dayjs from 'dayjs';
import { ScrollView, View } from 'react-native';
import Text from 'components/common/Text/Text';
import { StackMenu } from 'constants/menu';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useLedgerStatus, useStaffLists } from 'hooks/queries/ledger';
import StaffType from 'models/ledger/entity/StaffType';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Spacing from 'components/common/Spacing/Spacing';
import { StaffList } from 'components/userEvent/host';
import Icon from 'components/common/Icon/Icon';
import staffManagementScreenStyles from './StaffManagementScreen.style';

const StaffManagementScreen = () => {
  const { params } = useStackRoute<StackMenu.StaffManagement>();

  const { data: eventInfo } = useLedgerStatus(params.eventIndex);

  const { data: staffList } = useStaffLists({
    eventInfoId: params.eventId,
  });
  const host = staffList?.find((staff) => staff.staffType === StaffType.M);
  const subStaff = staffList?.filter(
    (staff) => staff.staffType === StaffType.S,
  );

  return (
    <View style={staffManagementScreenStyles.container}>
      <SpaceLayout
        direction="row"
        size={10}
        style={staffManagementScreenStyles.infoContainer}
      >
        <Icon name="IconCalendar" size={15} fill="white" />
        <Text style={staffManagementScreenStyles.infoText}>
          {dayjs(eventInfo?.eventDate).format('M/D(ddd) HH:MM')}
        </Text>
      </SpaceLayout>

      <Spacing height={30} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SpaceLayout size={10}>
          <Text style={staffManagementScreenStyles.text}>주최자</Text>
          <View style={staffManagementScreenStyles.hostWrapper}>
            <Text style={staffManagementScreenStyles.text} color="main">
              {host?.staffName ?? ''}
            </Text>
          </View>
        </SpaceLayout>

        <Spacing height={30} />

        <Text style={staffManagementScreenStyles.text}>스태프</Text>
        <Spacing height={10} />

        <SpaceLayout size={16}>
          {subStaff?.map((staff) => (
            <StaffList
              key={staff.userId}
              nickName={staff.staffName}
              mode="minus"
              eventInfoId={params.eventId}
            />
          ))}

          <StaffList mode="plus" eventInfoId={params.eventId} />
        </SpaceLayout>
      </ScrollView>
    </View>
  );
};

export default StaffManagementScreen;
