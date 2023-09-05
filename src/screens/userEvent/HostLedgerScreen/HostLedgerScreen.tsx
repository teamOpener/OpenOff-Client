import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import EmptyLayout from 'components/layout/EmptyLayout/EmptyLayout';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import ListLoading from 'components/suspense/loading/ListLoading/ListLoading';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import {
  ActionButton,
  IconText,
  LedgerHeader,
  LedgerSearchBar,
  SelectBottomSheet,
  UserCard,
} from 'components/userEvent/host';
import { LedgerScreenLayout } from 'components/userEvent/host/layout';
import API_ERROR_MESSAGE from 'constants/app/errorMessage';
import { StackMenu } from 'constants/app/menu';
import queryKeys from 'constants/queries/queryKeys';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import useDialog from 'hooks/app/useDialog';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useBottomSheet from 'hooks/ledger/useBottomSheet';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import {
  useLedgerStatus,
  useLedgerUserList,
  usePermitAllApplicant,
} from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import SortType from 'models/ledger/entity/SortType';
import { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import MENT_DIALOG from 'constants/common/dialogMessage';
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
  } = useLedgerUserList(params.eventIndex, selectedSortType, searchName);
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
      closeText: MENT_DIALOG.DIALOG.CONFIRM,
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

    openDialog({
      type: 'confirm',
      text: MENT_HOST.MAIN.PERMIT_ALL,
      apply: handlePermitAll,
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
    });
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
            label={MENT_HOST.APPLICANT.APPROVE_WITH_COUNT(
              eventStatus?.approvedCount ?? 0,
              eventStatus?.maxCount ?? 0,
            )}
          />
          <IconText
            iconName="IconUser"
            label={MENT_HOST.APPLICANT.ADMISSION_WITH_COUNT(
              eventStatus?.joinedCount ?? 0,
              eventStatus?.maxCount ?? 0,
            )}
          />
        </View>

        <View style={hostLedgerScreenStyles.spaceBetween}>
          <Text color="main" style={hostLedgerScreenStyles.approveText}>
            {MENT_HOST.APPLICANT.NOTAPPROVE_COUNT(
              eventStatus?.notApprovedCount ?? 0,
            )}
          </Text>
          <ActionButton
            disabled={eventStatus?.notApprovedCount === 0}
            label={MENT_HOST.APPLICANT.ALL_APPROVE}
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
              {selectedSortType === SortType.DATE
                ? MENT_HOST.MAIN.SORT.DATE
                : MENT_HOST.MAIN.SORT.NAME}
            </Text>
            <Icon
              name={openBottomSheet ? 'IconArrowUp' : 'IconArrowDown'}
              fill="white"
              size={15}
            />
          </TouchableOpacity>

          <LedgerSearchBar
            value={searchName}
            onChangeText={onChangeSearchName}
          />
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
