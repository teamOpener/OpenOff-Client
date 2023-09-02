import { PropsWithChildren, Suspense } from 'react';
import { colors } from 'styles/theme';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';

const CommonSuspense = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <WithIconLoading isActive backgroundColor={colors.background} />
      }
    >
      {children}
    </Suspense>
  );
};

export default CommonSuspense;
