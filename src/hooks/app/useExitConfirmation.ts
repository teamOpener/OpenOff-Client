import { useEffect } from 'react';
import { BackHandler } from 'react-native';

interface Props {
  isActive: boolean;
  callback: () => void;
}

const useExitConfirmation = ({ isActive, callback }: Props) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const backAction = () => {
      callback();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // eslint-disable-next-line consistent-return
    return () => backHandler.remove();
  }, [isActive, callback]);
};

export default useExitConfirmation;
