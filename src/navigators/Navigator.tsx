import CommonSuspense from 'components/suspense/loading/CommonSuspense/CommonSuspense';
import StackNavigator from './StackNavigator';

const Navigator = () => {
  return (
    <CommonSuspense>
      <StackNavigator />
    </CommonSuspense>
  );
  // const { isLogin } = useAuthorizeStore();

  // return isLogin ? (
  //   <CommonSuspense>
  //     <StackNavigator />
  //   </CommonSuspense>
  // ) : (
  //   <CommonSuspense>
  //     <AuthorizeNavigator />
  //   </CommonSuspense>
  // );
};

export default Navigator;
