import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { OpenEvent } from 'components/openEvent';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
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
  const { cost } = openEvent;
  const hasError = !!openEventErrorMessage.cost;

  const [isFree, setIsFree] = useState<boolean>(!openEvent.cost);

  /**
   * 0원으로 입력하거나 빈 칸으로 남겨 둘 경우, 자동으로 무료로 바뀌도록 합니다.
  TODO: focus 안했을 때에도 동작하도록 
   */
  const handleFocusOut = () => {
    if (isFree) {
      return;
    }
    if (cost === 0 || cost === null) {
      setIsFree(true);
    }
  };

  const handleIsFree = (isFreeValue: boolean) => {
    setIsFree(isFreeValue);
    if (isFreeValue) {
      setOpenEvent({ ...openEvent, cost: 0 });
    } else {
      setOpenEvent({ ...openEvent, cost: null });
    }
  };

  /**
   * 숫자만 입력할 수 있도록 합니다.
   */
  const handleChangeText = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');

    // TODO: 3자리마다 쉼표 추가
    setOpenEvent({ ...openEvent, cost: Number(numbersOnly) });
  };

  useEffect(() => {
    if (cost !== null && openEventErrorMessage.cost) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        cost: null,
      });
    }
  }, [cost]);

  return (
    <View>
      <OpenEvent.Label content="참가 비용" />
      <SpaceLayout size={10}>
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
        </View>

        <View style={costStyles.absoluteContainer}>
          <OpenEvent.Input
            // eslint-disable-next-line no-nested-ternary
            value={`₩ ${isFree ? '0' : cost === null ? '' : cost}`}
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
      </SpaceLayout>
    </View>
  );
};

export default Cost;
