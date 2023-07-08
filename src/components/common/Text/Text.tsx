import React from 'react';
import { Text as RNText } from 'react-native';
import textStyles from 'styles/textStyles';
import { colors } from 'styles/theme';

interface Props extends React.ComponentProps<typeof RNText> {
  variant?: keyof typeof textStyles;
  color?: keyof typeof colors;
}

export default function Text({ style, variant, color, ...rest }: Props) {
  return (
    <RNText
      style={[
        variant && textStyles[variant],
        {
          color: color ? colors[color] : colors.white,
          ...(style as object),
        },
      ]}
      {...rest}
    />
  );
}

Text.defaultProps = {
  variant: textStyles.body1,
};
