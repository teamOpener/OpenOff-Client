import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SelectControlButton from 'components/eventMap/buttons/SelectControlButton/SelectControlButton';
import SelectDetailBox from 'components/eventMap/selectboxes/SelectDetailBox/SelectDetailBox';
import {
  applicationAbleOptions,
  participantOptions,
  payOptions,
} from 'data/selectData';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import Option from 'types/apps/selectbox';
import selectDetailGroupStyles from './SelectDetailGroup.style';

interface Props {
  payOption: Option;
  selectPay: (option: Option) => void;
  participantOption: Option;
  selectParticipant: (option: Option) => void;
  applicationAbleOption: Option;
  selectApplication: (option: Option) => void;
  closeDetailGroup: () => void;
}

const SelectDetailGroup = ({
  payOption,
  selectPay,
  participantOption,
  selectParticipant,
  applicationAbleOption,
  selectApplication,
  closeDetailGroup,
}: Props) => {
  const initializeSelect = () => {
    selectPay({
      value: 'all',
      label: '전체',
    });
    selectParticipant({
      value: 'all',
      label: '전체',
    });
    selectApplication({
      value: 'all',
      label: '전체',
    });
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
        currentOption={payOption}
        options={payOptions}
        label="비용"
        select={selectPay}
      />
      <View style={selectDetailGroupStyles.boxLine} />
      <SelectDetailBox
        currentOption={participantOption}
        options={participantOptions}
        label="참여 인원"
        select={selectParticipant}
      />
      <View style={selectDetailGroupStyles.boxLine} />
      <SelectDetailBox
        currentOption={applicationAbleOption}
        options={applicationAbleOptions}
        label="신청 현황"
        select={selectApplication}
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
