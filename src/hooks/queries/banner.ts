import { useQuery } from '@tanstack/react-query';
import getBannerImages from 'apis/banner';
import queryKeys from 'constants/queries/queryKeys';

// eslint-disable-next-line import/prefer-default-export
export const useGetBannerImages = () => {
  return useQuery([...queryKeys.bannerKeys.all], () => getBannerImages(), {
    select: (data) => data.data,
    suspense: false,
  });
};
