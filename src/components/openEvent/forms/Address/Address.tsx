import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { debounce } from 'lodash';
import { OpenEvent } from 'components/openEvent';
import useNavigator from 'hooks/navigator/useNavigator';
import { useOpenEventStore } from 'stores/OpenEventStore';
import StatusType from 'constants/status';
import { HelpText } from 'components/openEvent/OpenEvent';
import addressStyles from './Address.style';

const Address = () => {
  const { stackNavigation } = useNavigator();
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const [detailAddress, setDetailAddress] = useState<string>('');

  const handleSearch = () => {
    stackNavigation.navigate('SearchAddress');
  };

  const hasError = !!openEventErrorMessage.address.roadAddress;

  const handleDetailAddress = useCallback(
    debounce((value) => {
      setOpenEvent({
        ...openEvent,
        address: {
          roadAddress: openEvent.address.roadAddress,
          detailAddress: value,
        },
      });
    }, 500),
    [],
  );

  /**
   * 도로명 주소가 바뀔 경우, 상세 주소를 초기화합니다.
   */
  useEffect(() => {
    if (!openEvent.address.detailAddress) {
      setDetailAddress('');
    }
  }, [openEvent.address.detailAddress]);

  useEffect(() => {
    if (!detailAddress) return;

    handleDetailAddress(detailAddress);
  }, [detailAddress]);

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
          value={detailAddress}
          onChangeText={setDetailAddress}
          placeholder="상세 주소를 입력해주세요."
          status={hasError ? StatusType.error : StatusType.default}
          editable={!!openEvent.address.roadAddress}
          disabled={!openEvent.address.roadAddress}
        />
      </View>

      {hasError && <HelpText content="" />}
    </View>
  );
};

export default Address;
