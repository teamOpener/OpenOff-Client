import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SelectControlButton from 'components/eventMap/buttons/SelectControlButton/SelectControlButton';
import SelectDetailBox from 'components/eventMap/selectboxes/SelectDetailBox/SelectDetailBox';
import { SelectStatus } from 'constants/app/selectBox';
import MENT_EVENT_MAP from 'constants/eventMap/eventMapMessage';
import queryKeys from 'constants/queries/queryKeys';
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
  const queryClient = useQueryClient();

  const refetchEventList = () => {
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
    closeDetailGroup();
  };

  const initializeSelect = () => {
    selectDispatch({ type: SelectStatus.RESET_SELECT });
    refetchEventList();
  };

  const applySelect = () => {
    selectDispatch({ type: SelectStatus.REMIND_SELECT });
    refetchEventList();
  };

  return (
    <View style={selectDetailGroupStyles.container}>
      <View style={selectDetailGroupStyles.detailTitle}>
        <Text variant="h2" color="white">
          {MENT_EVENT_MAP.MAIN.SELECT_BOX.FILTER}
        </Text>
        <View />
        <TouchableOpacity onPress={closeDetailGroup}>
          <Icon name="IconClose" size={20} fill="grey" />
        </TouchableOpacity>
      </View>
      <SelectDetailBox
        currentOption={selectState.payOption}
        options={payOptions}
        label={MENT_EVENT_MAP.MAIN.SELECT_BOX.PAY.LABEL}
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
        label={MENT_EVENT_MAP.MAIN.SELECT_BOX.PARTICIPANT.LABEL}
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
        label={MENT_EVENT_MAP.MAIN.SELECT_BOX.APPLICATION_ABLE.LABEL}
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
          label={MENT_EVENT_MAP.MAIN.SELECT_BOX.RESET}
          color="grey"
        />
        <SelectControlButton
          handlePress={applySelect}
          borderColor={colors.main}
          backgroundColor={colors.main}
          label={MENT_EVENT_MAP.MAIN.SELECT_BOX.APPLY}
          color="white"
        />
      </View>
    </View>
  );
};

export default SelectDetailGroup;
