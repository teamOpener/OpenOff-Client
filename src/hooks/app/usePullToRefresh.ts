import { useState } from 'react';

interface Props {
  callback: () => void;
}

const usePullToRefresh = ({ callback }: Props) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    callback();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return { refreshing, onRefresh };
};

export default usePullToRefresh;
