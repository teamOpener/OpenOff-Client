import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import queryKeys from 'constants/queryKeys';
import { useBookmark } from 'hooks/queries/bookmark';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import bookmarkButtonStyles from './BookmarkButton.style';

interface Props {
  eventInfoId?: number;
  isEventBookmarked: boolean;
  type?: 'default' | 'scrap' | 'rowEvent';
}

const BookmarkButton = ({
  isEventBookmarked,
  eventInfoId,
  type = 'default',
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
    >
      {(type === 'default' || type === 'rowEvent') &&
        (isBookmarked ? (
          <Icon
            name="IconFillHeart"
            size={type === 'rowEvent' ? 16 : 20}
            fill="main"
          />
        ) : (
          <Icon
            name="IconHeart"
            size={type === 'rowEvent' ? 16 : 20}
            fill={type === 'rowEvent' ? 'darkGrey' : 'white'}
          />
        ))}
    </TouchableOpacity>
  );
};

export default BookmarkButton;
