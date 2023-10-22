declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-config' {
  export interface NativeConfig {
    OPENOFF_NON_AUTHENTICATION_TOKEN: string;
    OPENOFF_PROD_SERVER?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
