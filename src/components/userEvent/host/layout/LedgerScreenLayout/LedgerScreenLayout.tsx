import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import ledgerScreenLayoutStyles from './LedgerScreenLayout.style';

const LedgerScreenLayout = ({ children }: PropsWithChildren) => {
  return <View style={ledgerScreenLayoutStyles.container}>{children}</View>;
};

export default LedgerScreenLayout;
