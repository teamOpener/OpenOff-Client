import Icon from 'components/common/Icon/Icon';
import SingleSelectBox from 'components/eventMap/selectboxes/SingleSelectBox/SingleSelectBox';
import {
  applicationAbleOptions,
  participantOptions,
  payOptions,
} from 'data/selectData';
import { TouchableOpacity, View } from 'react-native';
import Option from 'types/apps/selectbox';
import selectBoxGroup from './SelectBoxGroup.style';

interface Props {
  payOption: Option;
  selectPay: (option: Option) => void;
  participantOption: Option;
  selectParticipant: (option: Option) => void;
  applicationAbleOption: Option;
  selectApplication: (option: Option) => void;
  openDetailGroup: () => void;
}

const SelectBoxGroup = ({
  payOption,
  selectPay,
  participantOption,
  selectParticipant,
  applicationAbleOption,
  selectApplication,
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
        currentOption={payOption}
        options={payOptions}
        label="비용"
        select={selectPay}
      />
      <SingleSelectBox
        currentOption={participantOption}
        options={participantOptions}
        label="참여 인원"
        select={selectParticipant}
      />
      <SingleSelectBox
        currentOption={applicationAbleOption}
        options={applicationAbleOptions}
        label="신청 현황"
        select={selectApplication}
      />
    </View>
  );
};

export default SelectBoxGroup;
