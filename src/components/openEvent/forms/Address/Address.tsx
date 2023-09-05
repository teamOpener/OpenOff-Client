import { OpenEvent } from 'components/openEvent';
import { HelpText } from 'components/openEvent/atoms';
import StatusType from 'constants/app/status';
import useNavigator from 'hooks/navigator/useNavigator';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import addressStyles from './Address.style';

const Address = () => {
  const { stackNavigation } = useNavigator();
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { address } = openEvent;
  const hasError = !!openEventErrorMessage.address;

  const handleSearch = () => {
    stackNavigation.navigate('SearchAddress');
  };

  const handleChangeText = (value: string) => {
    setOpenEvent({
      ...openEvent,
      address: { roadAddress: address.roadAddress, detailAddress: value },
    });
    setOpenEventErrorMessage({
      ...openEventErrorMessage,
      hostPhoneNumber: null,
    });
  };

  /**
   * 도로명 주소가 바뀔 경우, 상세 주소를 초기화합니다.
   */
  useEffect(() => {
    if (!openEvent.address.detailAddress) {
      setOpenEvent({
        ...openEvent,
        address: { roadAddress: address.roadAddress, detailAddress: '' },
      });
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        address: null,
      });
    }
  }, [openEvent.address.detailAddress]);

  return (
    <View>
      <View style={addressStyles.horizontalView}>
        <OpenEvent.Label content="이벤트 장소" />
        <OpenEvent.FindButton onPress={handleSearch} />
      </View>

      <View style={addressStyles.inputContainer}>
        <OpenEvent.Input
          value={openEvent.address.roadAddress ?? ''}
          editable={false}
          placeholder="주소를 검색해주세요."
          status={hasError ? StatusType.error : StatusType.default}
        />

        <OpenEvent.Input
          value={address.detailAddress ?? ''}
          onChangeText={handleChangeText}
          placeholder="상세 주소를 입력해주세요."
          status={hasError ? StatusType.error : StatusType.default}
          editable={!!openEvent.address.roadAddress}
          disabled={!openEvent.address.roadAddress}
        />

        {hasError && (
          <HelpText
            status={StatusType.error}
            content={openEventErrorMessage.address ?? ''}
          />
        )}
      </View>
    </View>
  );
};

export default Address;
