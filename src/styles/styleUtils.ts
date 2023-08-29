import { PixelRatio } from 'react-native';

const getPixelRatio = PixelRatio.get();
export const getPixelSize = (size: number): number => size / getPixelRatio;

const fontScale = PixelRatio.getFontScale();
export const getFontSize = (size: number): number => size / fontScale;
