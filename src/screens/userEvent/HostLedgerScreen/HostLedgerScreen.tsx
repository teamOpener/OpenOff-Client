import { useEffect, useState } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { colors } from 'styles/theme';
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
import {
  useLedgerStatus,
  useLedgerUserList,
  usePermitAllApplicant,
} from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import useNavigator from 'hooks/navigator/useNavigator';
import useBottomSheet from 'hooks/ledger/useBottomSheet';
import useDialog from 'hooks/app/useDialog';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useStackRoute from 'hooks/navigator/useStackRoute';
import SortType from 'models/ledger/entity/SortType';
import { ApiErrorResponse } from 'types/ApiResponse';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import queryKeys from 'constants/queryKeys';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import ListLoading from 'components/suspense/loading/ListLoading/ListLoading';
import hostLedgerScreenStyles from './HostLedgerScreen.style';

const HostLedgerScreen = () => {
  const queryClient = useQueryClient();
  const { stackNavigation } = useNavigator();
  const { params } = useStackRoute<StackMenu.HostLedger>();
  const { openDialog } = useDialog();

  const { data: eventStatus } = useLedgerStatus(params.eventIndex);

  const [searchName, onChangeSearchName] = useState<string>('');

  const { resetQueries } = useResetQueries();

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
    isLoading: isLedgerListLoading,
  } = useLedgerUserList(
    params.eventIndex,
    selectedSortType,
    searchName ?? undefined,
  );
  const flatLedgerUserList = ledgerUserList?.pages.flatMap(
    (page) => page.data.content,
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={15} />;

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const refreshData = (keyword?: string) => {
    resetQueries(
      resetQueryKeys.refreshLedgerList({
        eventIndexId: params.eventIndex,
        sortType: selectedSortType,
        keyword,
      }),
    );
  };

  const { refreshing, onRefresh } = usePullToRefresh({ callback: refreshData });

  /**
   * 일괄 승인
   */

  const handlePermitSuccess = () => {
    openDialog({
      type: 'success',
      text: MENT_HOST.SUCCESS.PERMIT_ALL,
      closeText: '확인',
    });
    queryClient.invalidateQueries(queryKeys.hostKeys.ledgerList);
    queryClient.invalidateQueries(
      queryKeys.hostKeys.statusByIndexId(params.eventIndex),
    );
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
    });
  };

  const { mutateAsync: permitAllApplicant, isLoading: isPermitAllLoading } =
    usePermitAllApplicant(handlePermitSuccess, handlePermitError);

  const handlePermitAll = async () => {
    await permitAllApplicant({ eventIndexId: params.eventIndex });
  };

  const handlePermitAllButtonPress = async () => {
    if (!eventStatus) {
      return;
    }

    const availableCount = eventStatus.maxCount - eventStatus.approvedCount;
    if (availableCount < eventStatus.notApprovedCount) {
      openDialog({
        type: 'validate',
        text: MENT_HOST.ERROR.OVERFLOW_AVAILABLE,
      });
      return;
    }

    openDialog({
      type: 'confirm',
      text: MENT_HOST.MAIN.PERMIT_ALL,
      apply: handlePermitAll,
      applyText: '예',
      closeText: '아니오',
    });
  };

  /**
   * 검색
   */

  const handleSearch = () => {
    // TODO
    console.log('refresh');
    refreshData(searchName);
  };

  const handleEraser = () => {
    onChangeSearchName('');
    refreshData();
  };

  const headerTitle = () => (
    <LedgerHeader
      title={eventStatus?.eventTitle ?? ''}
      date={eventStatus?.eventDate ?? ''}
    />
  );

  useEffect(() => {
    stackNavigation.setOptions({
      headerTitle,
    });
  }, []);

  return (
    <LedgerScreenLayout>
      {isPermitAllLoading && (
        <WithIconLoading isActive backgroundColor={colors.background} />
      )}
      <SpaceLayout size={23} style={hostLedgerScreenStyles.statusContainer}>
        <View style={hostLedgerScreenStyles.spaceBetween}>
          <IconText
            iconName="IconUser"
            label={`승인완료 ${eventStatus?.approvedCount ?? 0}/${
              eventStatus?.maxCount ?? 0
            }`}
          />
          <IconText
            iconName="IconUser"
            label={`입장완료 ${eventStatus?.joinedCount ?? 0}/${
              eventStatus?.maxCount ?? 0
            }`}
          />
        </View>

        <View style={hostLedgerScreenStyles.spaceBetween}>
          <Text color="main" style={hostLedgerScreenStyles.approveText}>
            {`${eventStatus?.notApprovedCount ?? 0}명 승인 대기중`}
          </Text>
          <ActionButton
            disabled={eventStatus?.notApprovedCount === 0}
            label="일괄 승인"
            style={hostLedgerScreenStyles.totalApproveBtn}
            onPress={handlePermitAllButtonPress}
          />
        </View>

        <View
          style={[
            hostLedgerScreenStyles.spaceBetween,
            hostLedgerScreenStyles.searchContainerGap,
          ]}
        >
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
            <TouchableOpacity activeOpacity={0.8} onPress={handleSearch}>
              <Icon name="IconSearch" fill="white" />
            </TouchableOpacity>
          </SpaceLayout>
        </View>
      </SpaceLayout>

      {flatLedgerUserList?.length === 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <EmptyLayout helpText={MENT_HOST.MAIN.EMPTY_LEDGER} />
        </ScrollView>
      ) : (
        <View style={hostLedgerScreenStyles.scrollContainer}>
          <FlatList
            data={flatLedgerUserList}
            ItemSeparatorComponent={ItemSeparatorComponent}
            contentContainerStyle={hostLedgerScreenStyles.flatListContentStyle}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            renderItem={({ item }) => (
              <UserCard
                eventApplicantInfo={item}
                eventIndexId={params.eventIndex}
              />
            )}
            ListFooterComponent={
              hasNextPage || isLedgerListLoading ? <ListLoading /> : null
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
