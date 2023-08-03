import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { PropsWithChildren } from 'react';

const Tab = ({ children }: PropsWithChildren) => {
  return (
    <SpaceLayout direction="row" size={0}>
      {children}
    </SpaceLayout>
  );
};

export default Tab;
