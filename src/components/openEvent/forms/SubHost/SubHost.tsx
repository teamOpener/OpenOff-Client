import i18n from 'locales';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { OpenEvent } from 'components/openEvent';
import { useFindUserByNickname } from 'hooks/queries/user';
import { SearchNicknameResponseDto } from 'models/user/response/SearchNicknameResponseDto';
import { useEffect, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import subHostStyles from './SubHost.style';

const SubHost = () => {
  const { openEvent, setOpenEvent } = useOpenEventStore();
  const { staffList } = openEvent;

  const [nickName, setNickname] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleChangeText = (value: string) => {
    setNickname(value);
  };

  const { data: others } = useFindUserByNickname({
    keyword: nickName.slice(1),
  });

  const handleAddStaff = (user: SearchNicknameResponseDto) => {
    const newStaffList = [...openEvent.staffList, user];

    setOpenEvent({
      ...openEvent,
      staffList: newStaffList,
    });
    setNickname('');
  };

  const handleRemoveStaff = (idx: number) => {
    const newStaffList = [...staffList];

    if (idx >= 0 && idx < newStaffList.length) {
      newStaffList.splice(idx, 1);
      setOpenEvent({ ...openEvent, staffList: newStaffList });
    }
  };

  useEffect(() => {
    if (nickName.startsWith('@') && !isSearching) {
      setIsSearching(true);
    } else if (nickName === '') {
      setIsSearching(false);
    }
  }, [nickName]);

  return (
    <View>
      <OpenEvent.Label content={i18n.t('staff')} />
      <View
        style={[
          subHostStyles.container,
          isSearching && subHostStyles.searchingContainer,
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={subHostStyles.contentContainer}
        >
          {staffList.map((staff, idx) => (
            <OpenEvent.NameTag
              label={staff.nickname}
              onPress={() => handleRemoveStaff(idx)}
            />
          ))}
          <TextInput
            style={[subHostStyles.inputContainer, subHostStyles.inputText]}
            placeholderTextColor="#A4A4A4"
            value={nickName}
            onChangeText={handleChangeText}
            placeholder={i18n.t('nickname_placeholder')}
          />
        </ScrollView>
      </View>

      {isSearching && (
        <ScrollView style={subHostStyles.searchContainer}>
          {others &&
            others.map((other) => (
              <OpenEvent.NickNameList
                label={other.nickname}
                onPress={() => handleAddStaff(other)}
              />
            ))}
          {others && !others.length && (
            <Text style={subHostStyles.inputText}>
              {i18n.t('empty_nickname')}
            </Text>
          )}
          <Spacing height={30} />
        </ScrollView>
      )}
    </View>
  );
};

export default SubHost;
