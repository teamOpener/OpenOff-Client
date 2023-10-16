import i18n from 'locales';
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
import { StackMenu } from 'constants/app/menu';
import queryKeys from 'constants/queries/queryKeys';
import resetQueryKeys from 'constants/queries/resetQueryKey';
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
      text: i18n.t('permit_all'),
      closeText: i18n.t('confirm'),
    });
    queryClient.invalidateQueries(queryKeys.hostKeys.ledgerList);
    queryClient.invalidateQueries(
      queryKeys.hostKeys.statusByIndexId(params.eventIndex),
    );
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('default_error_message'),
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
      text: i18n.t('permit_all'),
      apply: handlePermitAll,
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
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
            label={i18n.t('approve_with_count', {
              approvedCount: eventStatus?.approvedCount ?? 0,
              maxCount: eventStatus?.maxCount ?? 0,
            })}
          />
          <IconText
            iconName="IconUser"
            label={i18n.t('admission_with_count', {
              joinedCount: eventStatus?.joinedCount ?? 0,
              maxCount: eventStatus?.maxCount ?? 0,
            })}
          />
        </View>

        <View style={hostLedgerScreenStyles.spaceBetween}>
          <Text color="main" style={hostLedgerScreenStyles.approveText}>
            {i18n.t('not_approve_count', {
              notApprovedCount: eventStatus?.notApprovedCount ?? 0,
            })}
          </Text>
          <ActionButton
            disabled={eventStatus?.notApprovedCount === 0}
            label={i18n.t('all_approve')}
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
                ? i18n.t('sort_date')
                : i18n.t('sort_name')}
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
          <EmptyLayout helpText={i18n.t('empty_ledger')} />
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
