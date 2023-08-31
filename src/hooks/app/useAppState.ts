/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export interface AppStateHookSettings {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export interface AppStateHookResult {
  appState: AppStateStatus;
}

type Handler = (state: AppStateStatus) => void;

export const useAppState = (
  settings?: AppStateHookSettings,
): AppStateHookResult => {
  const { onChange, onForeground, onBackground } = settings || {};
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange: Handler = (nextAppState) => {
      if (nextAppState === 'active' && appState !== 'active') {
        onForeground && onForeground();
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        onBackground && onBackground();
      }
      setAppState(nextAppState);
      onChange && onChange(nextAppState);
    };

    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => listener.remove();
  }, [onChange, onForeground, onBackground, appState]);

  return { appState };
};
