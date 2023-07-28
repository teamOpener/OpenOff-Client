import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import MENT_OPEN_EVENT from 'constants/openEvent';
import Spacing from 'components/common/Spacing/Spacing';
import Divider from 'components/common/Divider/Divider';
import FixedButton from 'components/common/FixedButton/FixedButton';
import { OpenEvent, OpenEventForm } from 'components/openEvent';
import useOpenEventValidator from 'hooks/openEvent/useOpenEventValidator';
import openEventScreenStyles from './OpenEventScreen.style';

const OpenEventScreen = () => {
  const { init, openEvent, setOpenEventErrorMessage } = useOpenEventStore();

  const { hasError, errorMessage } = useOpenEventValidator({ openEvent });

  const handlePress = () => {
    if (hasError) {
      setOpenEventErrorMessage(errorMessage);
      return;
    }
    // TODO: submit -> success/fail
    console.log(openEvent);
  };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View style={openEventScreenStyles.wrapper}>
      <ScrollView
        style={openEventScreenStyles.container}
        contentContainerStyle={openEventScreenStyles.containerContent}
      >
        <OpenEvent.Header title={MENT_OPEN_EVENT.INFO} />

        <OpenEventForm.Field />
        <OpenEventForm.Title />
        <OpenEventForm.ApplicationPeriod />
        <OpenEventForm.Period />
        {/* TODO */}
        <OpenEventForm.Address />
        <OpenEventForm.Cost />
        <OpenEventForm.RecruitmentNumber />
        <OpenEventForm.Description />
        <OpenEventForm.UploadImage />
        {/* <OpenEventForm.AdditionalInfo /> */}

        <Divider height={1} color="darkGrey" />

        <OpenEvent.Header title={MENT_OPEN_EVENT.INFO} />
        {/* TODO */}
        <OpenEventForm.HostName />
        <OpenEventForm.HostPhoneNumber />
        <OpenEventForm.HostEmail />

        <Divider height={1} color="darkGrey" />

        <OpenEvent.Header title="개인정보 수집 및 이용" />
        {/* TODO */}

        <OpenEvent.Header title="유의사항" />
        {/* TODO */}

        <Spacing height={156} />
      </ScrollView>

      <FixedButton label={MENT_OPEN_EVENT.MAIN.SUBMIT} onPress={handlePress} />
    </View>
  );
};

export default OpenEventScreen;
