import { useQueryClient } from '@tanstack/react-query';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FieldButtonGroup from 'components/authorize/groups/FieldButtonGroup/FieldButtonGroup';
import Spacing from 'components/common/Spacing/Spacing';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import queryKeys from 'constants/queryKeys';
import MENT_USER from 'constants/user/userConstants';
import useDialog from 'hooks/app/useDialog';
import useInterestField from 'hooks/authorize/useInterestField';
import useNavigator from 'hooks/navigator/useNavigator';
import { useUpdateInterestField } from 'hooks/queries/interest';
import { useMyInfo } from 'hooks/queries/user';
import { useEffect } from 'react';
import { Image } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { Field } from 'types/interest';
import userInterestResetScreenStyles from './UserInterestResetScreen.style';

const UserInterestResetScreen = () => {
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();

  const handleSuccessUpdateField = () => {
    queryClient.invalidateQueries(queryKeys.userKeys.myInfo);
    queryClient.invalidateQueries(queryKeys.eventKeys.all);
    openDialog({
      type: 'success',
      text: MENT_USER.SUCCESS.INTEREST_SETTING_SUCCESS,
      callback: () => stackNavigation.goBack(),
    });
  };

  const handleErrorUpdateField = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? MENT_USER.ERROR.SERVER,
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
    const makeFieldActive = (field: Field) => {
      userInfo?.userInfo.fieldTypeList.forEach((userFieldValue) => {
        // eslint-disable-next-line no-param-reassign
        if (userFieldValue === field.value) field.isActive = true;
      });
      return field;
    };
    const userInterestField = interestField.map(makeFieldActive);
    setInterestField(userInterestField);
  }, []);

  if (isLoading) {
    return <CommonLoading isActive backgroundColor={colors.background} />;
  }

  return (
    <ScreenCover
      titleElements={MENT_USER.INTEREST_RESET.COMMENTS_ON_SETTING_INTERESTS}
      authorizeButton={{
        handlePress: handleAuthorize,
        label: MENT_USER.AUTHORIZE_BUTTON_TEXT,
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
