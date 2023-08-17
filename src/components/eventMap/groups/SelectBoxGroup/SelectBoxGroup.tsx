import Icon from 'components/common/Icon/Icon';
import SingleSelectBox from 'components/eventMap/selectboxes/SingleSelectBox/SingleSelectBox';
import { SelectStatus } from 'constants/selectBox';
import {
  applicationAbleOptions,
  participantOptions,
  payOptions,
} from 'data/selectData';
import { Dispatch } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Action, Option, SelectBox } from 'types/apps/selectbox';
import selectBoxGroup from './SelectBoxGroup.style';

interface Props {
  selectState: SelectBox;
  selectDispatch: Dispatch<Action>;
  openDetailGroup: () => void;
}

const SelectBoxGroup = ({
  selectState,
  selectDispatch,
  openDetailGroup,
}: Props) => {
  return (
    <View style={selectBoxGroup.selectContainer}>
      <TouchableOpacity
        onPress={openDetailGroup}
        style={selectBoxGroup.buttonContainer}
      >
        <Icon fill="white" name="IconSetting" size={15} />
      </TouchableOpacity>
      <SingleSelectBox
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
      <SingleSelectBox
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
      <SingleSelectBox
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
    </View>
  );
};

export default SelectBoxGroup;
