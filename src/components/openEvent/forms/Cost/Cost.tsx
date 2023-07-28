import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import { useOpenEventStore } from 'stores/OpenEventStore';

import costStyles from './Cost.style';

const Cost = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();

  const [isFree, setIsFree] = useState<boolean>(true);
  const [cost, setCost] = useState<string>('0');

  const handleIsFree = (newIsFree: boolean) => {
    if (newIsFree) {
      setCost('0');
      setOpenEvent({ ...openEvent, cost: 0 });
    } else {
      setCost('');
    }

    setIsFree(newIsFree);
  };

  /**
   * 0원으로 입력했을 경우, 자동으로 무료로 바뀌도록 합니다.
   */
  const handleFocusOut = () => {
    if (cost === '0') {
      handleIsFree(true);
    }
  };

  /**
   *
   * 숫자만 입력할 수 있도록 합니다.
   */
  const handlePrice = (value: string) => {
    const numericCost = Number(value.split(' ')[1]);

    if (Number.isNaN(numericCost)) {
      return;
    }

    // TODO: 3자리마다 쉼표 추가
    setCost(numericCost.toString());
  };

  useEffect(() => {
    const numericCost = Number(cost) || 0;

    setOpenEvent({ ...openEvent, cost: numericCost });
  }, [cost]);

  return (
    <View>
      <OpenEvent.Label content="참가 비용" />
      <View style={costStyles.horizontalView}>
        <OpenEvent.Tag
          label="무료"
          isSelected={isFree}
          onPress={() => handleIsFree(true)}
        />
        <OpenEvent.Tag
          label="유료"
          isSelected={!isFree}
          onPress={() => handleIsFree(false)}
        />
        <OpenEvent.Input
          value={`₩ ${cost}`}
          onChangeText={handlePrice}
          onEndEditing={handleFocusOut}
          style={costStyles.input}
          editable={!isFree}
          disabled={isFree}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default Cost;
