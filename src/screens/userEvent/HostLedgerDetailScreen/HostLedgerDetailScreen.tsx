import { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Spacing from 'components/common/Spacing/Spacing';
import EmptyLayout from 'components/layout/EmptyLayout/EmptyLayout';
import { QnAItem, UserHeader } from 'components/userEvent/host';
import { LedgerScreenLayout } from 'components/userEvent/host/layout';
import { StackMenu } from 'constants/menu';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useApplicantQnA } from 'hooks/queries/ledger';
import useNavigator from 'hooks/navigator/useNavigator';
import hostLedgerDetailScreenStyles from './HostLedgerDetailScreen.style';

const HostLedgerDetailScreen = () => {
  const { stackNavigation } = useNavigator();
  const { params } = useStackRoute<StackMenu.HostLedgerDetail>();

  const { data: qna } = useApplicantQnA({ ledgerId: params.ledgerId });

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={30} />;

  useEffect(() => {
    stackNavigation.setOptions({
      headerTitle: qna?.eventTitle ?? '',
    });
  }, [qna?.eventTitle]);

  if (!qna) {
    return null;
  }

  return (
    <LedgerScreenLayout>
      <UserHeader userInfo={qna} ledgerId={params.ledgerId} />
      {qna.qnAInfoList.length === 0 ? (
        <EmptyLayout helpText="추가질문이 없습니다." />
      ) : (
        <View style={hostLedgerDetailScreenStyles.scrollContainer}>
          <FlatList
            data={qna.qnAInfoList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparatorComponent}
            contentContainerStyle={
              hostLedgerDetailScreenStyles.flatListContentStyle
            }
            renderItem={({ item, index }) => (
              <QnAItem index={index} qnaInfo={item} />
            )}
          />
        </View>
      )}
    </LedgerScreenLayout>
  );
};

export default HostLedgerDetailScreen;
