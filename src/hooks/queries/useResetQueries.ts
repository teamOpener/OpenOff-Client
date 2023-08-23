import { useQueryClient } from '@tanstack/react-query';

const useResetQueries = () => {
  const queryClient = useQueryClient();

  const resetQueries = (keys: Array<Array<string | number>>) => {
    if (!Array.isArray(keys)) {
      return;
    }

    keys.forEach((key) => {
      queryClient.invalidateQueries(key);
    });
  };

  return { resetQueries };
};

export default useResetQueries;
