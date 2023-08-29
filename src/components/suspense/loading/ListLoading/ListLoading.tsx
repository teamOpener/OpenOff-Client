import { View, ActivityIndicator } from 'react-native';

interface Props {
  padding?: number;
}

const ListLoading = ({ padding = 50 }: Props) => {
  return (
    <View style={{ paddingVertical: padding }}>
      <ActivityIndicator />
    </View>
  );
};

export default ListLoading;
