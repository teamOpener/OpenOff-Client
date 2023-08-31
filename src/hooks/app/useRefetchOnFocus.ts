import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAppState } from './useAppState';

const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  useAppState({
    onForeground: refetch,
  });
};

export default useRefetchOnFocus;
