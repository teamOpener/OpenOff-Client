import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
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
      text: i18n.t('add_staff'),
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
      text: error.response?.data.message ?? i18n.t('default_error_message'),
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
      text: i18n.t('delete_confirm'),
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
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
      text: i18n.t('confirm'),
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
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
            placeholder={i18n.t('nickname_placeholder')}
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
            <Text variant="body2">{i18n.t('empty_nickname')}</Text>
          )}
          <Spacing height={30} />
        </ScrollView>
      )}
    </View>
  );
};

export default StaffList;
