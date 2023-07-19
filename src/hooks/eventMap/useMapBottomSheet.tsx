import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Text from 'components/common/Text/Text';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import SortDialog from 'components/eventMap/dialogs/SortDialog/SortDialog';
import SelectBoxGroup from 'components/eventMap/groups/SelectBoxGroup/SelectBoxGroup';
import SelectDetailGroup from 'components/eventMap/groups/SelectDetailGroup/SelectDetailGroup';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import Option from 'types/apps/selectbox';
import { Event } from 'types/event';

interface SortInfo {
  dialog: boolean;
  value: string;
}

const mapBottomSheetStyles = StyleSheet.create({
  sortButton: {
    marginTop: 18,
    marginLeft: 18,
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },
});

const useMapBottomSheet = (eventList: Event[]) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [sort, setSort] = useState<SortInfo>({
    dialog: false,
    value: 'date',
  });
  const [payOption, setPayOption] = useState<Option>({
    label: '전체',
    value: 'all',
  });
  const [participantOption, setParticipantOption] = useState<Option>({
    label: '전체',
    value: 'all',
  });
  const [applicationAbleOption, setApplicationAbleOption] = useState<Option>({
    label: '전체',
    value: 'all',
  });
  const renderBottomSheet = (snapTop: number, snapBottom: number) => {
    return (
      <>
        <BottomSheet
          index={0}
          snapPoints={[snapTop, snapBottom]}
          animateOnMount
          backgroundStyle={{ backgroundColor: colors.background }}
          handleIndicatorStyle={{
            backgroundColor: colors.white,
          }}
        >
          {!isDetail ? (
            <>
              <SelectBoxGroup
                payOption={payOption}
                selectPay={(option: Option) => setPayOption(option)}
                participantOption={participantOption}
                selectParticipant={(option: Option) =>
                  setParticipantOption(option)
                }
                applicationAbleOption={applicationAbleOption}
                selectApplication={(option: Option) =>
                  setApplicationAbleOption(option)
                }
                openDetailGroup={() => {
                  setIsDetail(true);
                }}
              />
              <View style={mapBottomSheetStyles.sortButton}>
                <TouchableOpacity
                  onPress={() => setSort({ ...sort, dialog: true })}
                >
                  <Text variant="body2" color="white">
                    {sort.value === 'distance' ? '거리순' : '날짜순'}
                  </Text>
                </TouchableOpacity>
              </View>
              <BottomSheetScrollView
                style={mapBottomSheetStyles.bottomSheetContainer}
              >
                {eventList.map((event) => (
                  <MapEventCard key={event.id} event={event} />
                ))}
              </BottomSheetScrollView>
            </>
          ) : (
            <BottomSheetScrollView
              style={mapBottomSheetStyles.bottomSheetContainer}
            >
              <SelectDetailGroup
                payOption={payOption}
                selectPay={(option: Option) => setPayOption(option)}
                participantOption={participantOption}
                selectParticipant={(option: Option) =>
                  setParticipantOption(option)
                }
                applicationAbleOption={applicationAbleOption}
                selectApplication={(option: Option) =>
                  setApplicationAbleOption(option)
                }
                closeDetailGroup={() => {
                  setIsDetail(false);
                }}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheet>
        <SortDialog
          dialogShow={sort.dialog}
          value={sort.value}
          setValue={(value: string) =>
            setSort((sortInfo) => {
              return { ...sortInfo, value };
            })
          }
          handleDialog={() =>
            setSort((sortInfo) => {
              return { ...sortInfo, dialog: false };
            })
          }
        />
      </>
    );
  };
  return {
    renderBottomSheet,
    sort,
    payOption,
    participantOption,
    applicationAbleOption,
  };
};

export default useMapBottomSheet;