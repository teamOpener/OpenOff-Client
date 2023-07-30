import React from 'react';
import { View } from 'react-native';
import alertList from 'mocks/lists/alertList';
import AlertCard from 'components/home/cards/AlertCard/AlertCard';
import alertScreenStyles from './AlertScreen.style';

const AlertScreen = () => {
  return (
    <View style={alertScreenStyles.container}>
      {alertList.map((alert, _id) => (
        <AlertCard key={_id} alert={alert} />
      ))}
    </View>
  );
};

export default AlertScreen;
