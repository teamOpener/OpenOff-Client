import { useQueryClient } from '@tanstack/react-query';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FieldButtonGroup from 'components/authorize/groups/FieldButtonGroup/FieldButtonGroup';
import Spacing from 'components/common/Spacing/Spacing';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import queryKeys from 'constants/queryKeys';
import useInterestField from 'hooks/authorize/useInterestField';
import useNavigator from 'hooks/navigator/useNavigator';
import { useUpdateInterestField } from 'hooks/queries/interest';
import { useMyInfo } from 'hooks/queries/user';
import { useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import DialogContext from 'utils/DialogContext';
import userInterestResetScreenStyles from './UserInterestResetScreen.style';

const UserInterestResetScreen = () => {
  const COMMENTS_ON_SETTING_INTERESTS = ['관심 분야를 설정해주세요.'];
  const AUTHORIZE_BUTTON_TEXT = '확인';
  const INTEREST_SETTING_COMPLETED = '관심분야 설정이 완료되었습니다!';
  const UNKNOWN_ERROR = '서버상에 알 수 없는 에러가 발생했습니다!';
  const { stackNavigation } = useNavigator();
  const { openDialog } = useContext(DialogContext);
  const query = useQueryClient();

  const handleSuccessUpdateField = () => {
    query.invalidateQueries(queryKeys.userKeys.myInfo);
    query.invalidateQueries(queryKeys.eventKeys.all);
    openDialog({
      type: 'success',
      text: INTEREST_SETTING_COMPLETED,
      callback: () => stackNavigation.goBack(),
    });
  };

  const handleErrorUpdateField = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? UNKNOWN_ERROR,
    });
  };

  const { computedCount, setInterestField, interestField } = useInterestField();
  const { data: userInfo } = useMyInfo();
  const { mutateAsync: updateInterestField, isLoading } =
    useUpdateInterestField(handleSuccessUpdateField, handleErrorUpdateField);

  const handleAuthorize = async () => {
    const fieldTypeList = interestField
      .filter((fieldElement) => fieldElement.isActive)
      .map((field) => field.value);
    await updateInterestField({
      fieldTypeList,
    });
  };

  useEffect(() => {
    const userInterestField = interestField.map((field) => {
      userInfo?.userInfo.fieldTypeList.forEach((userFieldValue) => {
        // eslint-disable-next-line no-param-reassign
        if (userFieldValue === field.value) field.isActive = true;
      });
      return field;
    });
    setInterestField(userInterestField);
  }, []);

  if (isLoading) {
    return <CommonLoading isActive backgroundColor={colors.background} />;
  }

  return (
    <ScreenCover
      titleElements={COMMENTS_ON_SETTING_INTERESTS}
      authorizeButton={{
        handlePress: handleAuthorize,
        label: AUTHORIZE_BUTTON_TEXT,
        isActive: computedCount() >= 1,
      }}
    >
      <Image
        source={require('../../../assets/images/interestFieldInfo.png')}
        style={userInterestResetScreenStyles.fieldInfoImage}
      />
      <Spacing height={42} />

      <FieldButtonGroup
        fields={interestField}
        setFields={setInterestField}
        computedCount={computedCount()}
      />
    </ScreenCover>
  );
};

export default UserInterestResetScreen;
