import Text from 'components/common/Text/Text';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import timerTextStyles from './TimerText.style';

interface Trigger {
  active: boolean;
  reactive: boolean;
}

interface Props {
  setTimerTrigger: Dispatch<SetStateAction<Trigger>>;
  timerTrigger: Trigger;
  setRetry: Dispatch<SetStateAction<boolean>>;
}

const TimerText = memo(({ setTimerTrigger, timerTrigger, setRetry }: Props) => {
  const MINUTES_IN_MS = 5 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const [currentReactive, setCurrentReactive] = useState<boolean>(
    timerTrigger.active,
  );
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      setRetry(false);
      clearInterval(timer);
      setTimerTrigger({ ...timerTrigger, active: !timerTrigger.active });
    }
    if (currentReactive !== timerTrigger.reactive) {
      setTimeLeft(MINUTES_IN_MS);
      setCurrentReactive(timerTrigger.reactive);
    }
    return () => {
      clearInterval(timer);
    };
  }, [
    MINUTES_IN_MS,
    currentReactive,
    setTimerTrigger,
    timeLeft,
    timerTrigger,
    setRetry,
  ]);

  return (
    <Text variant="body3" color="error" style={timerTextStyles.textContainer}>
      {MENT_AUTHORIZE.PHONE_CERTIFICATION.REMAINING_TIME} {minutes} : {second}
    </Text>
  );
});

export default TimerText;
