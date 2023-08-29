import { useEffect } from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const useBlinkingEffect = (interval: number) => {
  const isVisible = useSharedValue<boolean>(true);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      isVisible.value = !isVisible.value;
    }, interval);

    return () => clearInterval(flickerInterval);
  }, [interval]);

  const opacity = useDerivedValue(() => {
    return withTiming(isVisible.value ? 1 : 0, {
      duration: 200,
      easing: Easing.ease,
    });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return animatedStyle;
};

export default useBlinkingEffect;
