import React, { SetStateAction } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import ledgerSearchBarStyles from './LedgerSearchBar.style';

interface Props {
  value: string;
  onChangeText: React.Dispatch<SetStateAction<string>>;
}

const LedgerSearchBar = ({ value, onChangeText }: Props) => {
  const handleEraser = () => {
    onChangeText('');
  };

  return (
    <SpaceLayout
      direction="row"
      size={8}
      style={[
        ledgerSearchBarStyles.alignItemCenter,
        ledgerSearchBarStyles.full,
      ]}
    >
      <View style={ledgerSearchBarStyles.searchOuterContainer}>
        <TextInput
          style={ledgerSearchBarStyles.searchInnerContainer}
          value={value}
          onChangeText={onChangeText}
        />
        {value && (
          <Icon
            name="IconExitCircle"
            size={16}
            fill="grey"
            onPress={handleEraser}
          />
        )}
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <Icon name="IconSearch" fill="white" />
      </TouchableOpacity>
    </SpaceLayout>
  );
};

export default LedgerSearchBar;
