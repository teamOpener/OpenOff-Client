import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SelectControlButton from 'components/eventMap/buttons/SelectControlButton/SelectControlButton';
import SelectDetailBox from 'components/eventMap/selectboxes/SelectDetailBox/SelectDetailBox';
import SelectStatus from 'constants/selectBox';
import {
  applicationAbleOptions,
  participantOptions,
  payOptions,
} from 'data/selectData';
import { Dispatch } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { Action, Option, SelectBox } from 'types/apps/selectbox';
import selectDetailGroupStyles from './SelectDetailGroup.style';

interface Props {
  selectState: SelectBox;
  selectDispatch: Dispatch<Action>;
  closeDetailGroup: () => void;
}

const SelectDetailGroup = ({
  selectState,
  selectDispatch,
  closeDetailGroup,
}: Props) => {
  const initializeSelect = () => {
    selectDispatch({ type: SelectStatus.RESET_SELECT });
    closeDetailGroup();
  };
  const applySelect = () => {
    closeDetailGroup();
  };
  return (
    <View style={selectDetailGroupStyles.container}>
      <View style={selectDetailGroupStyles.detailTitle}>
        <Text variant="h2" color="white">
          필터
        </Text>
        <View />
        <TouchableOpacity onPress={closeDetailGroup}>
          <Icon name="IconClose" size={20} fill="grey" />
        </TouchableOpacity>
      </View>
      <SelectDetailBox
        currentOption={selectState.payOption}
        options={payOptions}
        label="비용"
        select={(option: Option) => {
          selectDispatch({
            type: SelectStatus.SET_PAY_OPTION,
            option,
          });
        }}
      />
      <View style={selectDetailGroupStyles.boxLine} />
      <SelectDetailBox
        currentOption={selectState.participantOption}
        options={participantOptions}
        label="참여 인원"
        select={(option: Option) => {
          selectDispatch({
            type: SelectStatus.SET_PARTICIPANT_OPTION,
            option,
          });
        }}
      />
      <View style={selectDetailGroupStyles.boxLine} />
      <SelectDetailBox
        currentOption={selectState.applicationAbleOption}
        options={applicationAbleOptions}
        label="신청 현황"
        select={(option: Option) => {
          selectDispatch({
            type: SelectStatus.SET_APPLICATION_ABLE_OPTION,
            option,
          });
        }}
      />
      <View style={selectDetailGroupStyles.controlContainer}>
        <SelectControlButton
          handlePress={initializeSelect}
          borderColor={colors.grey}
          label="초기화"
          color="grey"
        />
        <SelectControlButton
          handlePress={applySelect}
          borderColor={colors.main}
          backgroundColor={colors.main}
          label="적용"
          color="white"
        />
      </View>
    </View>
  );
};

export default SelectDetailGroup;
