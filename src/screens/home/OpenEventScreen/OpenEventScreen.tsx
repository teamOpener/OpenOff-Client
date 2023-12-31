import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import Divider from 'components/common/Divider/Divider';
import FixedButton from 'components/common/FixedButton/FixedButton';
import HeadText from 'components/common/HeadText/HeadText';
import Spacing from 'components/common/Spacing/Spacing';
import KeyboardAvoidingScreenLayout from 'components/layout/KeyboardAvoidingScreenLayout/KeyboardAvoidingScreenLayout';
import BackButton from 'components/navigator/BackButton';
import BackEventButton from 'components/navigator/BackEventButton';
import { OpenEventForm } from 'components/openEvent';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import queryKeys from 'constants/queries/queryKeys';
import useDialog from 'hooks/app/useDialog';
import useExitConfirmation from 'hooks/app/useExitConfirmation';
import useNavigator from 'hooks/navigator/useNavigator';
import useImageUpload from 'hooks/openEvent/useImageUpload';
import useOpenEventValidator from 'hooks/openEvent/useOpenEventValidator';
import { useCreateEvent } from 'hooks/queries/event';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import getNonEmptyStrings from 'utils/common';
import extractUserIds from 'utils/openEvent';
import openEventScreenStyles from './OpenEventScreen.style';

const OpenEventScreen = () => {
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();

  const { init, openEvent, setOpenEventErrorMessage } = useOpenEventStore();
  const { hasError, errorMessage } = useOpenEventValidator({ openEvent });

  /**
   * 이미지 업로드
   */
  const handleUploadImageSuccess = () => {
    //
  };

  const handleUploadImageError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('fail_updload_image'),
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
      text: i18n.t('create_event_title'),
      contents: i18n.t('create_event_content'),
      callback: () => {
        stackNavigation.goBack();
        queryClient.invalidateQueries(queryKeys.hostKeys.list);
      },
    });
  };

  const handleCreateEventError = (error?: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error?.response?.data.message ?? i18n.t('fail_create_event'),
    });
  };

  const handleCreateEventTypeError = () => {
    openDialog({
      type: 'validate',
      text: i18n.t('fail_upload_type'),
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
      openEvent.cost === null ||
      !openEvent.recruitmentNumber ||
      !openEvent.description ||
      !openEvent.imageBuilders.length ||
      !openEvent.hostName ||
      !openEvent.hostPhoneNumber ||
      !openEvent.hostEmail
    ) {
      handleCreateEventTypeError();
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
      eventFee: openEvent.cost ?? 0,
      maxParticipant: openEvent.recruitmentNumber,
      description: openEvent.description,
      imageDataList: imageUrlList,
      extraQuestionList: getNonEmptyStrings(openEvent.additionalInformation),
      hostName: openEvent.hostName,
      staffIdList: extractUserIds(openEvent.staffList),
      hostPhoneNumber: openEvent.hostPhoneNumber,
      hostEmail: openEvent.hostEmail,
    };

    await createEvent(submitForm);
  };

  /**
   * 로딩 상태 제어
   * 이벤트 업로드 중, 뒤로가기 막기
   */
  const isUploading = isImageUploadLoading || isCreateEventLoading;

  const backEventCallback = () => {
    openDialog({
      type: 'validate',
      text: i18n.t('creating_event'),
    });
  };

  useExitConfirmation({ isActive: isUploading, callback: backEventCallback });

  useEffect(() => {
    if (isUploading) {
      stackNavigation.setOptions({
        headerLeft: () => BackEventButton({ callback: backEventCallback }),
      });
      return;
    }
    stackNavigation.setOptions({
      headerLeft: BackButton,
    });
  }, [isCreateEventLoading, isImageUploadLoading]);

  useEffect(() => {
    init();
    return () => {
      init();
    };
  }, []);

  return (
    <KeyboardAvoidingScreenLayout>
      {isUploading && (
        <WithIconLoading
          isActive
          backgroundColor={colors.background}
          text={i18n.t('creating_event')}
        />
      )}

      <ScrollView
        style={openEventScreenStyles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={openEventScreenStyles.containerContent}
      >
        <HeadText title={i18n.t('info')} />

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

        <HeadText title={i18n.t('info')} />

        <OpenEventForm.HostName />
        {/* TODO 본인은 staff로 추가 못하게 */}
        <OpenEventForm.SubHost />
        <OpenEventForm.HostPhoneNumber />
        <OpenEventForm.HostEmail />

        {/* <Divider height={1} color="darkGrey" /> */}

        {/* TODO 개인정보, 유의사항 */}
        {/* <HeadText title="개인정보 수집 및 이용" /> */}
        {/* <HeadText title="유의사항" /> */}

        <Spacing height={156} />
      </ScrollView>

      <FixedButton
        label={i18n.t('open_a_event')}
        onPress={handleCreateEventPress}
      />
    </KeyboardAvoidingScreenLayout>
  );
};

export default OpenEventScreen;
