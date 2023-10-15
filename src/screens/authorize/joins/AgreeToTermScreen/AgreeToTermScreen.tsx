import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import CheckButton from 'components/authorize/buttons/CheckButton/CheckButton';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import { AuthorizeMenu } from 'constants/app/menu';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
import { UserInfoStatus } from 'constants/authorize/join';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { BackHandler, Linking, View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import { Action, JoinInfo } from 'types/join';
import agreeToTermScreenStyles from './AgreeToTermScreen.style';

interface AgreeList {
  [key: string]: boolean;
}

interface Props {
  state: JoinInfo;
  dispatch: Dispatch<Action>;
}

const AgreeToTermScreen = ({ dispatch, state }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [term, setTerm] = useState<AgreeList>({
    allAgree: false,
    termToTeenager: false,
    termToUse: false,
    termToPrivacy: false,
    termToMarketing: false,
  });

  const handleSingleTerm = (key: string) => {
    setTerm((checkTerm) => {
      return { ...checkTerm, [key]: !checkTerm[key] };
    });
  };

  const handleAuthorizeFlow = () => {
    dispatch({ type: UserInfoStatus.SET_AGREE_TO_TERM, term: 'Y' });
    if (state.accountType === 'NORMAL') {
      navigation.navigate(AuthorizeMenu.PhoneCertification);
      return;
    }
    navigation.navigate(AuthorizeMenu.Nickname);
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          BackHandler.exitApp();
          return true;
        },
      );
      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    if (
      term.termToMarketing &&
      term.termToPrivacy &&
      term.termToTeenager &&
      term.termToUse
    ) {
      setTerm((checkTerm) => {
        return { ...checkTerm, allAgree: true };
      });
    } else {
      setTerm((checkTerm) => {
        return { ...checkTerm, allAgree: false };
      });
    }
  }, [
    term.termToMarketing,
    term.termToPrivacy,
    term.termToTeenager,
    term.termToUse,
  ]);

  const isActive = term.termToPrivacy && term.termToTeenager && term.termToUse;
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: handleAuthorizeFlow,
        label: MENT_AUTHORIZE.AGREE_TO_TERM.CONFIRM,
        isActive,
      }}
      titleElements={MENT_AUTHORIZE.AGREE_TO_TERM.TITLE}
    >
      <View style={agreeToTermScreenStyles.checkButtonContainer}>
        <CheckButton
          value={term.allAgree}
          handlePress={() => {
            setTerm({
              allAgree: !term.allAgree,
              termToTeenager: !term.allAgree,
              termToUse: !term.allAgree,
              termToPrivacy: !term.allAgree,
              termToMarketing: !term.allAgree,
            });
          }}
          marginBottom={17}
          label={MENT_AUTHORIZE.AGREE_TO_TERM.ALL_AGREE}
        />
        <CheckButton
          value={term.termToTeenager}
          handlePress={() => handleSingleTerm('termToTeenager')}
          label={MENT_AUTHORIZE.AGREE_TO_TERM.TERM_TO_TEENAGER}
        />
        <CheckButton
          value={term.termToUse}
          handlePress={() => handleSingleTerm('termToUse')}
          label={MENT_AUTHORIZE.AGREE_TO_TERM.TERM_TO_USE}
          handleDetailPress={() => {
            Linking.openURL(
              'https://navy-web.notion.site/fa8cb5d161d143409c331f4e3e7f30b1?pvs=4',
            );
          }}
        />
        <CheckButton
          value={term.termToPrivacy}
          handlePress={() => handleSingleTerm('termToPrivacy')}
          label={MENT_AUTHORIZE.AGREE_TO_TERM.TERM_TO_PRIVACY}
          handleDetailPress={() => {
            Linking.openURL(
              'https://navy-web.notion.site/efa559e8c07e40f484705b2fdca06524?pvs=4',
            );
          }}
        />
        <CheckButton
          value={term.termToMarketing}
          handlePress={() => handleSingleTerm('termToMarketing')}
          label={MENT_AUTHORIZE.AGREE_TO_TERM.TERM_TO_MARKETING}
          handleDetailPress={() => {
            Linking.openURL(
              'https://navy-web.notion.site/4da0a8c248094ce9ba3faf76d96466ab?pvs=4',
            );
          }}
        />
      </View>
    </ScreenCover>
  );
};

export default AgreeToTermScreen;
