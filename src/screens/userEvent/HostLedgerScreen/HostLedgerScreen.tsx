import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { StackMenu } from 'constants/menu';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import { LedgerScreenLayout } from 'components/userEvent/host/layout';
import {
  ActionButton,
  IconText,
  LedgerHeader,
  SelectBottomSheet,
  UserCard,
} from 'components/userEvent/host';
import EmptyLayout from 'components/layout/EmptyLayout/EmptyLayout';
import useRouteParams from 'hooks/navigator/useRouteParams';
import {
  useLedgerStatus,
  useLedgerUserList,
  usePermitAllApplicant,
} from 'hooks/queries/ledger';
import useNavigator from 'hooks/navigator/useNavigator';
import { useEventDetail } from 'hooks/queries/event';
import useBottomSheet from 'hooks/ledger/useBottomSheet';
import SortType from 'models/ledger/entity/SortType';
import { ApiErrorResponse } from 'types/ApiResponse';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import queryKeys from 'constants/queryKeys';
import hostLedgerScreenStyles from './HostLedgerScreen.style';

const HostLedgerScreen = () => {
  const { stackNavigation } = useNavigator();
  const params = useRouteParams<StackMenu.HostLedger>();

  const { data: eventStatus } = useLedgerStatus(params?.eventIndex ?? 0);
  const { data: eventInfo } = useEventDetail(params?.eventId ?? 0);

  const [searchName, onChangeSearchName] = useState<string>('');

  const {
    bottomSheetModalRef,
    openBottomSheet,
    selectedSortType,
    presentModal,
    closeModal,
    handleSortType,
  } = useBottomSheet();

  const {
    data: ledgerUserList,
    hasNextPage,
    fetchNextPage,
  } = useLedgerUserList(params?.eventIndex ?? 0, selectedSortType);
  const flatLedgerUserList = ledgerUserList?.pages.flatMap(
    (x) => x.data.content,
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={15} />;

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const queryClient = useQueryClient();

  const handlePermitSuccess = () => {
    queryClient.invalidateQueries(queryKeys.hostKeys.ledgerList);
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    // TODO
    Alert.alert(error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT);
  };

  const { mutateAsync: permitAllApplicant } = usePermitAllApplicant(
    handlePermitSuccess,
    handlePermitError,
  );

  const handleBatchApproval = async () => {
    if (!params || !eventStatus) {
      return;
    }
    const availableCount = eventStatus.maxCount - eventStatus.approvedCount;
    if (availableCount < eventStatus.notApprovedCount) {
      Alert.alert(MENT_HOST.ERROR.OVERFLOW_AVAILABLE); // TODO dialog로
      return;
    }
    await permitAllApplicant({ eventIndexId: params.eventIndex });
  };

  const handleSearch = () => {
    // TODO
  };

  const handleEraser = () => {
    onChangeSearchName('');
  };

  const headerTitle = () => (
    <LedgerHeader
      title={eventInfo?.title ?? ''}
      date={eventStatus?.eventDate ?? ''}
    />
  );

  useEffect(() => {
    stackNavigation.setOptions({
      headerTitle,
    });
  }, []);

  if (!eventStatus || !params?.eventId || !params?.eventIndex) {
    return null;
  }

  return (
    <LedgerScreenLayout>
      <SpaceLayout size={23} style={hostLedgerScreenStyles.statusContainer}>
        <View style={hostLedgerScreenStyles.spaceBetween}>
          <IconText
            iconName="IconUser"
            label={`승인완료 ${eventStatus.approvedCount}/${eventStatus.maxCount}`}
          />
          <IconText
            iconName="IconUser"
            label={`입장완료 ${eventStatus.joinedCount}/${eventStatus.maxCount}`}
          />
        </View>

        <View style={hostLedgerScreenStyles.spaceBetween}>
          <Text color="main" style={hostLedgerScreenStyles.approveText}>
            {`${eventStatus.notApprovedCount}명 승인 대기중`}
          </Text>
          <ActionButton
            disabled={eventStatus.notApprovedCount === 0}
            label="일괄 승인"
            style={hostLedgerScreenStyles.totalApproveBtn}
            onPress={handleBatchApproval}
          />
        </View>

        <View
          style={[
            hostLedgerScreenStyles.spaceBetween,
            hostLedgerScreenStyles.searchContainerGap,
          ]}
        >
          <SpaceLayout
            direction="row"
            size={8}
            style={[
              hostLedgerScreenStyles.alignItemCenter,
              hostLedgerScreenStyles.full,
            ]}
          >
            <View style={hostLedgerScreenStyles.searchOuterContainer}>
              <TextInput
                style={hostLedgerScreenStyles.searchInnerContainer}
                value={searchName}
                onChangeText={onChangeSearchName}
              />
              {searchName && (
                <Icon
                  name="IconExitCircle"
                  size={16}
                  fill="grey"
                  onPress={handleEraser}
                />
              )}
            </View>

            <Icon name="IconSearch" fill="white" onPress={handleSearch} />
          </SpaceLayout>

          <TouchableOpacity
            style={hostLedgerScreenStyles.sortBtn}
            onPress={presentModal}
          >
            <Text style={hostLedgerScreenStyles.sortBtnText}>
              {selectedSortType === SortType.DATE ? '신청순' : '이름순'}
            </Text>
            <Icon
              name={openBottomSheet ? 'IconArrowUp' : 'IconArrowDown'}
              fill="white"
              size={15}
            />
          </TouchableOpacity>
        </View>
      </SpaceLayout>

      {flatLedgerUserList?.length === 0 ? (
        <EmptyLayout helpText={MENT_HOST.MAIN.EMPTY_LEDGER} />
      ) : (
        <View style={hostLedgerScreenStyles.scrollContainer}>
          <FlatList
            data={flatLedgerUserList}
            ItemSeparatorComponent={ItemSeparatorComponent}
            contentContainerStyle={hostLedgerScreenStyles.flatListContentStyle}
            onEndReachedThreshold={0.2}
            onEndReached={onEndReached}
            renderItem={({ item }) => <UserCard eventApplicantInfo={item} />}
          />
        </View>
      )}

      <SelectBottomSheet
        ref={bottomSheetModalRef}
        selectedSortType={selectedSortType}
        setSelectedSortType={handleSortType}
        handleModalClose={closeModal}
      />
    </LedgerScreenLayout>
  );
};

export default HostLedgerScreen;
