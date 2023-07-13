import React from 'react';
import { View } from 'react-native';
import SingleSelectBox from 'components/eventMap/selectboxes/SingleSelectBox/SingleSelectBox';
import {
  applicationAbleOption,
  participantOptions,
  payOptions,
} from 'data/selectData';
import Option from 'types/apps/selectbox';
import selectBoxGroup from './SelectBoxGroup.style';

interface Props {
  selectPay: (option: Option) => void;
  selectParticipant: (option: Option) => void;
  selectApplication: (option: Option) => void;
}

const SelectBoxGroup = ({
  selectPay,
  selectParticipant,
  selectApplication,
}: Props) => {
  return (
    <View style={selectBoxGroup.selectContainer}>
      <SingleSelectBox options={payOptions} label="비용" select={selectPay} />
      <SingleSelectBox
        options={participantOptions}
        label="참여 인원"
        select={selectParticipant}
      />
      <SingleSelectBox
        options={applicationAbleOption}
        label="신청 현황"
        select={selectApplication}
      />
    </View>
  );
};

export default SelectBoxGroup;
