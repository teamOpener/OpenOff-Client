import { ApiErrorResponse } from 'types/ApiResponse';
import { TouchableOpacity, View } from 'react-native';
import {
  useQueryClient,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import fallbackErrorStyles from './FallbackError.style';

const FallbackError = ({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) => {
  const { reset } = useQueryErrorResetBoundary();
  const queryClient = useQueryClient();

  const err = error as ApiErrorResponse;
  const data = err.response?.data;
  const errorMessage = data?.message;

  const resetErrors = () => {
    queryClient.clear();
    reset();
    resetError();
  };

  return (
    <View style={[fallbackErrorStyles.container]}>
      <View style={fallbackErrorStyles.iconWrapper}>
        <Icon name="IconExit" fill="white" />
      </View>
      <Text variant="h4" style={fallbackErrorStyles.errorText}>
        {errorMessage ?? '에러가 발생했습니다.'}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={fallbackErrorStyles.button}
        onPress={resetErrors}
      >
        <Text variant="h4">홈으로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FallbackError;
