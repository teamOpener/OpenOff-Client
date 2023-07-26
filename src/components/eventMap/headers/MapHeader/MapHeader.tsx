import React from 'react';
import { Pressable, View } from 'react-native';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import mapHeaderStyles from './MapHeader.style';

interface Props {
  title: string;
  backPress: () => void;
}

const MapHeader = ({ title, backPress }: Props) => {
  return (
    <View style={mapHeaderStyles.container}>
      <Pressable style={mapHeaderStyles.backButton} onPress={backPress}>
        <Icon name="IconArrowLeft" size={20} />
      </Pressable>
      <Text style={mapHeaderStyles.title} color="white">
        {title}
      </Text>
    </View>
  );
};

export default MapHeader;
