import { View } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';
import { useOpenEventStore } from 'stores/OpenEventStore';
import useNavigator from 'hooks/navigator/useNavigator';
import searchAddressScreenStyles from './SearchAddressScreen.style';

const SearchAddressScreen = () => {
  const { openEvent, setOpenEvent } = useOpenEventStore();
  const { stackNavigation } = useNavigator();

  const handleSelected = (data: OnCompleteParams) => {
    setOpenEvent({
      ...openEvent,
      address: {
        roadAddress: data.roadAddress,
        detailAddress: '',
      },
    });
    stackNavigation.goBack();
  };

  const handleError = () => {
    // TODO
  };

  return (
    <View style={searchAddressScreenStyles.container}>
      <Postcode
        style={searchAddressScreenStyles.innerContainer}
        jsOptions={{ animation: true, autoMapping: true }}
        onSelected={handleSelected}
        onError={handleError}
      />
    </View>
  );
};

export default SearchAddressScreen;
