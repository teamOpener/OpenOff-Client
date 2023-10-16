import i18n from 'locales';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { FieldCode } from 'constants/interest/interest';
import { InterestInfoResponseDto } from 'models/interest/response/InterestInfoResponseDto';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { IconName } from 'types/icon';
import categoryButtonStyles from './CategoryButton.style';

interface Props extends TouchableOpacityProps {
  fieldData: InterestInfoResponseDto;
}

const iconMapping: Record<FieldCode, IconName> = {
  [FieldCode.FD]: 'IconTicketCircles',
  [FieldCode.S]: 'IconTicketHeart',
  [FieldCode.FSDH]: 'IconSnow',
  [FieldCode.PF]: 'IconShuriken',
  [FieldCode.EA]: 'IconFourCircle',
  [FieldCode.EE]: 'IconTicketStar',
};

const CategoryButton = ({ fieldData, ...rest }: Props) => {
  const code = fieldData.interestConstName as keyof typeof FieldCode;
  const translatedCode = i18n.t(code);
  const names = translatedCode.split('/');
  const selectedIcon =
    iconMapping[fieldData.interestConstName] ?? 'IconTicketStar';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
      style={categoryButtonStyles.buttonContainer}
    >
      <Icon name={selectedIcon} size={45} fill="main" />
      <View style={categoryButtonStyles.textContainer}>
        {names.map((name, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <Text
                variant="bodySB"
                color="white"
                style={categoryButtonStyles.centerDot}
              >
                •
              </Text>
            )}
            <Text variant="bodySB" color="white">
              {name}
            </Text>
          </React.Fragment>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryButton;
