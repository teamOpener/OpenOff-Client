import i18n from 'locales';
import Spacing from 'components/common/Spacing/Spacing';
import {
  CategorySelector,
  Tab,
  TabItem,
} from 'components/userEvent/participant';
import { BottomTabMenu } from 'constants/app/menu';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import useInterestFields from 'hooks/interest/useInterestFields';
import useTabRoute from 'hooks/navigator/useTabRoute';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Field } from 'types/interest';
import ParticipationEventContainer from 'containers/userEvent/ParticipationEventContainer';
import HostEventContainer from 'containers/userEvent/HostEventContainer';
import { useAuthorizeStore } from 'stores/Authorize';
import ParticipationNeedToLoginContainer from 'containers/userEvent/ParticipationNeedToLoginContainer/ParticipationNeedToLoginContainer';
import HostNeedToLoginContainer from 'containers/userEvent/HostNeedToLoginContainer/HostNeedToLoginContainer';
import userEventScreenStyles from './UserEventScreen.style';

const UserEventScreen = () => {
  const { params } = useTabRoute<BottomTabMenu.UserEvent>();
  const { isLogin } = useAuthorizeStore();

  const [activeTabName, setActiveTabName] = useState<UserEventTabItem>(
    UserEventTabItem.PARTICIPANT,
  );

  const { generateInterestFieldTags } = useInterestFields();

  const [field, setField] = useState<Field[]>(generateInterestFieldTags());
  const activeField = field.find((fieldData) => fieldData.isActive);

  const handleTab = (name: UserEventTabItem) => {
    setActiveTabName(name);
  };

  useEffect(() => {
    if (params && params.tab) {
      setActiveTabName(params.tab);
    }
  }, [params]);

  return (
    <View style={userEventScreenStyles.container}>
      <Tab>
        <TabItem
          label={i18n.t('participation_event')}
          isActive={activeTabName === UserEventTabItem.PARTICIPANT}
          onPress={() => handleTab(UserEventTabItem.PARTICIPANT)}
        />
        <TabItem
          label={i18n.t('hosted_event')}
          isActive={activeTabName === UserEventTabItem.HOST}
          onPress={() => handleTab(UserEventTabItem.HOST)}
        />
      </Tab>

      <Spacing height={13} />

      <CategorySelector field={field} setField={setField} />

      <Spacing height={9} />

      {/* 참여 이벤트 */}
      {activeTabName === UserEventTabItem.HOST &&
        (isLogin ? (
          <ParticipationEventContainer
            activeTabName={activeTabName}
            activeField={activeField}
          />
        ) : (
          <ParticipationNeedToLoginContainer />
        ))}
      {/* 주최 이벤트 */}
      {activeTabName === UserEventTabItem.PARTICIPANT &&
        (isLogin ? (
          <HostEventContainer
            activeTabName={activeTabName}
            activeField={activeField}
          />
        ) : (
          <HostNeedToLoginContainer />
        ))}
    </View>
  );
};

export default UserEventScreen;
