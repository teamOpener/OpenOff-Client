import AlertCard from 'components/home/cards/AlertCard/AlertCard';
import alertList from 'mocks/lists/alertList';
import { ScrollView } from 'react-native';
import alertScreenStyles from './AlertScreen.style';

const AlertScreen = () => {
  return (
    <ScrollView style={alertScreenStyles.container}>
      {alertList.map((alert, _id) => (
        <AlertCard key={_id} alert={alert} />
      ))}
    </ScrollView>
  );
};

export default AlertScreen;
