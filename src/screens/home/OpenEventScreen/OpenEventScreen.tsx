import { useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import MENT_OPEN_EVENT from 'constants/openEvent';
import Spacing from 'components/common/Spacing/Spacing';
import Divider from 'components/common/Divider/Divider';
import FixedButton from 'components/common/FixedButton/FixedButton';
import { OpenEvent, OpenEventForm } from 'components/openEvent';
import useOpenEventValidator from 'hooks/openEvent/useOpenEventValidator';
import { useCreateEvent } from 'hooks/queries/event';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import useNavigator from 'hooks/navigator/useNavigator';
import openEventScreenStyles from './OpenEventScreen.style';

const OpenEventScreen = () => {
  const { stackNavigation } = useNavigator();

  const { init, openEvent, setOpenEventErrorMessage } = useOpenEventStore();
  const { hasError, errorMessage } = useOpenEventValidator({ openEvent });

  const handleSuccess = () => {
    // TODO
    Alert.alert('성공');
    stackNavigation.goBack();
  };

  const handleError = () => {
    // TODO
  };

  const { mutateAsync: createEvent, isLoading } = useCreateEvent(
    handleSuccess,
    handleError,
  );

  const handlePress = () => {
    if (hasError) {
      setOpenEventErrorMessage(errorMessage);
      return;
    }

    console.log(openEvent);
    const submitForm: CreateNewEventRequestDto = {
      fieldTypeList: [],
      title: openEvent.title!,
      applicationStartDate: openEvent.applicationStartDate!,
      applicationEndDate: openEvent.applicationEndDate!,
      eventDates: openEvent.eventDates,
      streetLoadAddress: openEvent.address.roadAddress!,
      detailAddress: openEvent.address.detailAddress!,
      eventFee: openEvent.cost!,
      maxParticipant: openEvent.recruitmentNumber!,
      description: openEvent.description!,
      imageDataList: [],
      extraQuestionList: openEvent.additionalInformation,
      hostName: openEvent.hostName!,
      hostPhoneNumber: openEvent.hostPhoneNumber!,
      hostEmail: openEvent.hostEmail!,
    };

    createEvent(submitForm);
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
        {/* TODO: 로딩화면제작 */}
        <OpenEvent.Header title={MENT_OPEN_EVENT.INFO} />

        <OpenEventForm.Field />
        <OpenEventForm.Title />
        <OpenEventForm.ApplicationPeriod />
        <OpenEventForm.Period />
        <OpenEventForm.Address />
        <OpenEventForm.Cost />
        <OpenEventForm.RecruitmentNumber />
        <OpenEventForm.Description />
        <OpenEventForm.UploadImage />
        {/* <OpenEventForm.AdditionalInfo /> */}

        <Divider height={1} color="darkGrey" />

        <OpenEvent.Header title={MENT_OPEN_EVENT.INFO} />

        <OpenEventForm.HostName />
        <OpenEventForm.HostPhoneNumber />
        <OpenEventForm.HostEmail />
        {/* TODO: 주최자 추가 기능 */}

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
