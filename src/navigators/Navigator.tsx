import CommonSuspense from 'components/suspense/loading/CommonSuspense/CommonSuspense';
import { useAuthorizeStore } from 'stores/Authorize';
import AuthorizeNavigator from './AuthorizeNavigator';
import StackNavigator from './StackNavigator';

const Navigator = () => {
  const { isLogin } = useAuthorizeStore();

  return isLogin ? (
    <CommonSuspense>
      <StackNavigator />
    </CommonSuspense>
  ) : (
    <CommonSuspense>
      <AuthorizeNavigator />
    </CommonSuspense>
  );
};

export default Navigator;
