import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Text from 'components/common/Text/Text';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import SortDialog from 'components/eventMap/dialogs/SortDialog/SortDialog';
import SelectBoxGroup from 'components/eventMap/groups/SelectBoxGroup/SelectBoxGroup';
import SelectDetailGroup from 'components/eventMap/groups/SelectDetailGroup/SelectDetailGroup';
import MapEventCardSkeleton from 'components/suspense/skeleton/MapEventCardSkeleton/MapEventCardSkeleton';
import { Dispatch, SetStateAction, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { Action, SelectBox } from 'types/apps/selectbox';
import { MapEvent } from 'types/event';
import mapBottomSheetStyles from './MapBottomSheet.style';

interface SortInfo {
  dialog: boolean;
  value: string;
}

interface Props {
  isLoading: boolean;
  snapTop: number;
  snapBottom: number;
  sort: SortInfo;
  setSort: Dispatch<SetStateAction<SortInfo>>;
  selectState: SelectBox;
  selectDispatch: Dispatch<Action>;
  eventList: MapEvent[];
  clickedMarker: number | undefined;
}

const MapBottomSheet = ({
  isLoading,
  snapTop,
  snapBottom,
  sort,
  setSort,
  selectState,
  eventList,
  selectDispatch,
  clickedMarker,
}: Props) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);

  const handleCloseGroupDetail = () => {
    setIsDetail(() => {
      return false;
    });
  };
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
            {!clickedMarker && (
              <>
                <SelectBoxGroup
                  selectState={selectState}
                  selectDispatch={selectDispatch}
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
              </>
            )}
            <BottomSheetFlatList
              style={mapBottomSheetStyles.bottomSheetContainer}
              data={eventList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                isLoading ? (
                  <>
                    <MapEventCardSkeleton />
                    <MapEventCardSkeleton />
                    <MapEventCardSkeleton />
                  </>
                ) : null
              }
              renderItem={(mapEventList) => (
                <MapEventCard
                  key={mapEventList.item.id}
                  event={mapEventList.item}
                  distance={mapEventList.item.distance ?? 0}
                />
              )}
            />
          </>
        ) : (
          <BottomSheetScrollView
            style={mapBottomSheetStyles.bottomSheetContainer}
          >
            <SelectDetailGroup
              selectState={selectState}
              selectDispatch={selectDispatch}
              closeDetailGroup={handleCloseGroupDetail}
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

export default MapBottomSheet;
