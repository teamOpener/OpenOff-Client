import Spacing from 'components/common/Spacing/Spacing';
import EventCardList from 'components/home/lists/EventCardList/EventCardList';
import useInterestFields from 'hooks/interest/useInterestFields';
import { usePersonalEventLists } from 'hooks/queries/event';
import { useMyInfo } from 'hooks/queries/user';
import i18n from 'locales';

const PersonalEventContainer = () => {
  const { data: personalEventLists, isLoading: isPersonalLoading } =
    usePersonalEventLists();

  const { data: userInfo } = useMyInfo({ isLogin: true });

  const { generateInterestFieldTags } = useInterestFields();

  const userInterest = userInfo?.userInfo.fieldTypeList.map((field) => {
    return `#${
      generateInterestFieldTags().find(
        (fieldElement) => fieldElement.value === field,
      )?.label
    }   `;
  });
  return (
    <EventCardList
      isLoading={isPersonalLoading}
      events={personalEventLists}
      title={i18n.t('personal_event_commend')}
      subTitle={userInterest?.join('') ?? ''}
    />
  );
};

export default PersonalEventContainer;
