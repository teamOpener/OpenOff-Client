import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import queryKeys from 'constants/queryKeys';
import { useBookmark } from 'hooks/queries/bookmark';
import { ComponentProps, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import bookmarkButtonStyles from './BookmarkButton.style';

interface Props extends ComponentProps<typeof TouchableOpacity> {
  eventInfoId?: number;
  isEventBookmarked: boolean;
  type?: 'default' | 'scrap' | 'bookmark' | 'popular' | 'category';
}

const BookmarkButton = ({
  isEventBookmarked,
  eventInfoId,
  type = 'default',
  ...props
}: Props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(isEventBookmarked);
  const queryClient = useQueryClient();

  const handleSuccessBookmark = () => {
    queryClient.invalidateQueries(queryKeys.bookmarkKeys.all);
    queryClient.invalidateQueries(queryKeys.eventKeys.all);
  };

  const { mutate: bookmark } = useBookmark(handleSuccessBookmark);

  useEffect(() => {
    setIsBookmarked(isEventBookmarked);
  }, [isEventBookmarked]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    bookmark(eventInfoId ?? -1);
  };

  return (
    <TouchableOpacity
      style={bookmarkButtonStyles.bookmarkButton}
      onPress={handleBookmark}
      {...props}
    >
      {type === 'bookmark' && (
        <Icon name="IconFillHeart" size={20} fill="main" />
      )}
      {(type === 'default' || type === 'popular' || type === 'category') &&
        (isBookmarked ? (
          <Icon name="IconFillHeart" size={20} fill="main" />
        ) : (
          <Icon name="IconHeart" size={20} fill="white" />
        ))}
    </TouchableOpacity>
  );
};

export default BookmarkButton;
