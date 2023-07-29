import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { HelpText } from 'components/openEvent/atoms';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import StatusType from 'constants/status';

import costStyles from './Cost.style';

const Cost = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const hasError = !!openEventErrorMessage.cost;

  const [isFree, setIsFree] = useState<boolean>(true);
  const [cost, setCost] = useState<string>('0');
  const numericCost = Number(cost);

  /**
   * 0원으로 입력하거나 빈 칸으로 남겨 둘 경우, 자동으로 무료로 바뀌도록 합니다.
  TODO: focus 안했을 때에도 동작하도록 
   */
  const handleFocusOut = () => {
    if (isFree) {
      return;
    }
    if (cost === '0') {
      setIsFree(true);
    } else if (cost === '') {
      setIsFree(true);
    }
  };

  /**
   * 숫자만 입력할 수 있도록 합니다.
   */
  const handleChangeText = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');

    // TODO: 3자리마다 쉼표 추가
    setCost(numbersOnly);
  };

  useEffect(() => {
    if (isFree) {
      setCost('0');
      setOpenEvent({ ...openEvent, cost: 0 });
    } else {
      setCost('');
      setOpenEvent({ ...openEvent, cost: null });
    }
  }, [isFree]);

  useEffect(() => {
    if (cost !== '' && openEventErrorMessage.cost) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        cost: null,
      });
    }

    if (!isFree) {
      setOpenEvent({ ...openEvent, cost: numericCost });
    }
  }, [cost]);

  return (
    <View>
      <OpenEvent.Label content="참가 비용" />
      <View style={costStyles.horizontalView}>
        <OpenEvent.Tag
          label="무료"
          isSelected={isFree}
          onPress={() => setIsFree(true)}
        />
        <OpenEvent.Tag
          label="유료"
          isSelected={!isFree}
          onPress={() => setIsFree(false)}
        />

        <View style={costStyles.absoluteContainer}>
          <OpenEvent.Input
            value={`₩ ${isFree ? '0' : cost}`}
            onChangeText={handleChangeText}
            onEndEditing={handleFocusOut}
            style={costStyles.input}
            editable={!isFree}
            disabled={isFree}
            keyboardType="numeric"
            status={hasError ? StatusType.error : StatusType.default}
          />
          <View style={costStyles.absoluteHelpText}>
            {hasError && (
              <HelpText
                status={StatusType.error}
                content={MENT_OPEN_EVENT.ERROR.COST}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cost;
