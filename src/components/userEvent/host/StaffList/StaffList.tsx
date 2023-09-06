import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import API_ERROR_MESSAGE from 'constants/app/errorMessage';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import queryKeys from 'constants/queries/queryKeys';
import useDialog from 'hooks/app/useDialog';
import useUniqueName from 'hooks/ledger/useUniqueName';
import {
  useMinusStaff,
  usePlusStaff,
  useStaffLists,
} from 'hooks/queries/ledger';
import { useFindUserByNickname } from 'hooks/queries/user';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import MENT_DIALOG from 'constants/common/dialogMessage';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import staffListStyles from './StaffList.style';

interface Props extends TextInputProps {
  mode: 'plus' | 'minus';
  eventInfoId: number;
  nickName?: string;
}

const StaffList = ({ nickName, eventInfoId, mode, ...rest }: Props) => {
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { data: staffList } = useStaffLists({
    eventInfoId,
  });
  const { data: others } = useFindUserByNickname({
    keyword: searchText.slice(1),
  });
  const { findUniqueUser } = useUniqueName({ staffs: staffList ?? [] });

  const handleNameTagPress = (value: string) => {
    setSearchText(`@${value}`);
    setIsSearching(false);
  };

  const handleSuccess = () => {
    openDialog({
      type: 'success',
      text: MENT_HOST.SUCCESS.ADD_STAFF,
      callback: () => {
        queryClient.invalidateQueries(
          queryKeys.ledgerKeys.staffByEventInfoId(eventInfoId),
        );
        setSearchText('');
        setIsSearching(false);
      },
    });
  };

  const handleError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
    });
  };

  const { mutateAsync: plusStaff, isLoading: isPlusStaffLoading } =
    usePlusStaff(handleSuccess, handleError);
  const { mutateAsync: minusStaff, isLoading: isMinusStaffLoading } =
    useMinusStaff(handleSuccess, handleError);

  const handleMinusStaff = async () => {
    if (!nickName) {
      return;
    }

    openDialog({
      type: 'warning',
      text: MENT_HOST.STAFF.DELETE_CONFIRM,
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
      apply: async () => {
        await minusStaff({ eventInfoId, staffName: nickName });
      },
    });
  };

  const handlePlusStaff = () => {
    if (!searchText) {
      return;
    }

    openDialog({
      type: 'success',
      text: MENT_HOST.STAFF.ADD_CONFIRM,
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
      apply: async () => {
        await plusStaff({ eventInfoId, nickname: searchText.slice(1) });
      },
    });
  };

  useEffect(() => {
    if (searchText.startsWith('@') && !isSearching) {
      setIsSearching(true);
    } else if (searchText === '') {
      setIsSearching(false);
    }
  }, [searchText]);

  return (
    <View>
      {(isPlusStaffLoading || isMinusStaffLoading) && (
        <WithIconLoading isActive backgroundColor={colors.background} />
      )}
      <View
        style={[
          staffListStyles.container,
          mode === 'plus' &&
            !searchText.startsWith('@') &&
            staffListStyles.inactiveContainer,
        ]}
      >
        {mode === 'plus' ? (
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={[
              staffListStyles.text,
              !searchText.startsWith('@') && staffListStyles.inActiveText,
            ]}
            placeholder={MENT_HOST.STAFF.NICKNAME_PLACEHOLDER}
            placeholderTextColor={colors.grey}
            {...rest}
          />
        ) : (
          <TextInput
            value={`@${nickName}`}
            editable={false}
            style={staffListStyles.text}
            {...rest}
          />
        )}

        {mode === 'plus' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              staffListStyles.iconWrapper,
              !searchText.startsWith('@') &&
                staffListStyles.inActiveIconWrapper,
            ]}
            onPress={handlePlusStaff}
          >
            <Icon name="IconPlus" size={12} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={staffListStyles.iconWrapper}
            onPress={handleMinusStaff}
          >
            <Icon name="IconMinus" size={12} />
          </TouchableOpacity>
        )}
      </View>

      <Spacing height={10} />

      {isSearching && (
        <ScrollView
          horizontal
          style={staffListStyles.searchContainer}
          contentContainerStyle={staffListStyles.searchContentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {others &&
            findUniqueUser(others)
              .slice(0, 3)
              .map((other, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={staffListStyles.nameTag}
                  onPress={() => handleNameTagPress(other)}
                >
                  <Text style={staffListStyles.searchText}>{`@${other}`}</Text>
                </TouchableOpacity>
              ))}

          {others && !others.length && (
            <Text variant="body2">{MENT_OPEN_EVENT.MAIN.EMPTY_NICKNAME}</Text>
          )}
          <Spacing height={30} />
        </ScrollView>
      )}
    </View>
  );
};

export default StaffList;
