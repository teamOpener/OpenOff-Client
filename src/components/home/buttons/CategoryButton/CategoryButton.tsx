import React from 'react';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { InterestInfoResponseDto } from 'models/interest/response/InterestInfoResponseDto';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { FieldCode } from 'constants/interest';
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
  const names = fieldData.interestValue.split('/');
  const selectedIcon = iconMapping[fieldData.interestConstName];

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
