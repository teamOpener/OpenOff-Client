import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import Spacing from 'components/common/Spacing/Spacing';
import Divider from 'components/common/Divider/Divider';
import FixedButton from 'components/common/FixedButton/FixedButton';
import { OpenEventForm } from 'components/openEvent';
import HeadText from 'components/common/HeadText/HeadText';
import BackButton from 'components/navigator/BackButton';
import BackEventButton from 'components/navigator/BackEventButton';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import useOpenEventValidator from 'hooks/openEvent/useOpenEventValidator';
import { useCreateEvent } from 'hooks/queries/event';
import useNavigator from 'hooks/navigator/useNavigator';
import useImageUpload from 'hooks/openEvent/useImageUpload';
import useDialog from 'hooks/app/useDialog';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import { ApiErrorResponse } from 'types/ApiResponse';
import getNonEmptyStrings from 'utils/common';
import openEventScreenStyles from './OpenEventScreen.style';

const OpenEventScreen = () => {
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const { init, openEvent, setOpenEventErrorMessage } = useOpenEventStore();
  const { hasError, errorMessage } = useOpenEventValidator({ openEvent });

  const backEventCallback = () => {
    openDialog({
      type: 'validate',
      text: MENT_OPEN_EVENT.LOADING.CREATE,
    });
  };

  /**
   * 이미지 업로드
   */
  const handleUploadImageSuccess = () => {
    //
  };

  const handleUploadImageError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? MENT_OPEN_EVENT.ERROR.UPLOAD_IMAGE,
    });
  };

  const { uploadImages, isLoading: isImageUploadLoading } = useImageUpload({
    imageBuilders: openEvent.imageBuilders,
    successCallback: handleUploadImageSuccess,
    errorCallback: handleUploadImageError,
  });

  /**
   * 이벤트 업로드
   */
  const handleCreateEventSuccess = () => {
    openDialog({
      type: 'success',
      text: MENT_OPEN_EVENT.SUCCESS.CREATE_EVENT_TITLE,
      contents: MENT_OPEN_EVENT.SUCCESS.CREATE_EVENT_CONTENT,
      callback: () => {
        stackNavigation.goBack();
      },
    });
  };

  const handleCreateEventError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? MENT_OPEN_EVENT.ERROR.CREATE_EVENT,
    });
  };

  const { mutateAsync: createEvent, isLoading: isCreateEventLoading } =
    useCreateEvent(handleCreateEventSuccess, handleCreateEventError);

  const handleCreateEventPress = async () => {
    // 1. 유효성 검사
    if (hasError) {
      setOpenEventErrorMessage(errorMessage);
      return;
    }

    try {
      // 2. 이미지 업로드
      const imageUrlList = await uploadImages();

      // TODO refactor
      // 3. 이벤트 개설
      if (
        !openEvent.field.length ||
        !openEvent.title ||
        !openEvent.applicationStartDate ||
        !openEvent.applicationEndDate ||
        !openEvent.eventDates.length ||
        !openEvent.address.roadAddress ||
        !openEvent.cost ||
        !openEvent.recruitmentNumber ||
        !openEvent.description ||
        !openEvent.imageBuilders.length ||
        !openEvent.hostName ||
        !openEvent.hostPhoneNumber ||
        !openEvent.hostEmail
      ) {
        return;
      }

      const submitForm: CreateNewEventRequestDto = {
        fieldTypeList: openEvent.field,
        title: openEvent.title,
        applicationStartDate: openEvent.applicationStartDate,
        applicationEndDate: openEvent.applicationEndDate,
        eventDates: openEvent.eventDates,
        streetLoadAddress: openEvent.address.roadAddress,
        detailAddress: openEvent.address.detailAddress ?? '',
        eventFee: openEvent.cost,
        maxParticipant: openEvent.recruitmentNumber,
        description: openEvent.description,
        imageDataList: imageUrlList,
        extraQuestionList: getNonEmptyStrings(openEvent.additionalInformation),
        hostName: openEvent.hostName,
        staffIdList: openEvent.staffIdList ?? [],
        hostPhoneNumber: openEvent.hostPhoneNumber,
        hostEmail: openEvent.hostEmail,
      };

      await createEvent(submitForm);
    } catch (error) {
      handleCreateEventError(error as ApiErrorResponse);
    }
  };

  useEffect(() => {
    init();
    return () => {
      init();
    };
  }, []);

  /**
   * 이벤트 업로드 중, 뒤로가기 막기
   */
  // TODO android device
  useEffect(() => {
    if (isImageUploadLoading || isCreateEventLoading) {
      stackNavigation.setOptions({
        headerLeft: () => BackEventButton({ callback: backEventCallback }),
      });
      return;
    }
    stackNavigation.setOptions({
      headerLeft: BackButton,
    });
  }, [isCreateEventLoading, isImageUploadLoading]);

  if (isImageUploadLoading || isCreateEventLoading)
    return <WithIconLoading isActive text={MENT_OPEN_EVENT.LOADING.CREATE} />;

  return (
    <View style={openEventScreenStyles.wrapper}>
      <ScrollView
        style={openEventScreenStyles.container}
        contentContainerStyle={openEventScreenStyles.containerContent}
      >
        <HeadText title={MENT_OPEN_EVENT.INFO} />

        <OpenEventForm.Field />
        <OpenEventForm.Title />
        <OpenEventForm.ApplicationPeriod />
        <OpenEventForm.Period />
        <OpenEventForm.Address />
        <OpenEventForm.Cost />
        <OpenEventForm.RecruitmentNumber />
        {/* TODO description 길이 제한 확인 */}
        <OpenEventForm.Description />
        <OpenEventForm.UploadImage />
        <OpenEventForm.AdditionalInfo />

        <Divider height={1} color="darkGrey" />

        <HeadText title={MENT_OPEN_EVENT.INFO} />

        <OpenEventForm.HostName />
        <OpenEventForm.HostPhoneNumber />
        <OpenEventForm.HostEmail />
        {/* TODO: 주최자 추가 기능 */}

        <Divider height={1} color="darkGrey" />

        {/* TODO 개인정보, 유의사항 */}
        <HeadText title="개인정보 수집 및 이용" />
        <HeadText title="유의사항" />

        <Spacing height={156} />
      </ScrollView>

      <FixedButton
        label={MENT_OPEN_EVENT.MAIN.SUBMIT}
        onPress={handleCreateEventPress}
      />
    </View>
  );
};

export default OpenEventScreen;
