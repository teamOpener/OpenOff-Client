import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Divider from 'components/common/Divider/Divider';
import EmptyScreen from 'components/common/EmptyScreen/EmptyScreen';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import SortDialog from 'components/eventMap/dialogs/SortDialog/SortDialog';
import SelectBoxGroup from 'components/eventMap/groups/SelectBoxGroup/SelectBoxGroup';
import SelectDetailGroup from 'components/eventMap/groups/SelectDetailGroup/SelectDetailGroup';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import MapEventCardSkeleton from 'components/suspense/skeleton/MapEventCardSkeleton/MapEventCardSkeleton';
import MENT_EVENT_MAP from 'constants/eventMap/eventMapMessage';
import { Dispatch, SetStateAction, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { Action, SelectBox } from 'types/apps/selectbox';
import { Coordinate, MapEvent } from 'types/event';
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
  setBottomSheetChecker: Dispatch<SetStateAction<number>>;
  selectState: SelectBox;
  selectDispatch: Dispatch<Action>;
  eventList: MapEvent[];
  clickedMarker: Coordinate | undefined;
}

const MapBottomSheet = ({
  isLoading,
  snapTop,
  snapBottom,
  sort,
  setSort,
  selectState,
  setBottomSheetChecker,
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => (
    <View style={mapBottomSheetStyles.bottomSheetSeparatorContainer}>
      <Divider height={1} color="darkGrey" />
    </View>
  );

  return (
    <>
      <BottomSheet
        index={0}
        snapPoints={[snapTop, snapBottom]}
        animateOnMount
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={mapBottomSheetStyles.bottomSheetIndicatorStyle}
        onChange={(active) => setBottomSheetChecker(active)}
      >
        {!isDetail ? (
          <>
            {!clickedMarker && (
              <SpaceLayout size={12} style={{ zIndex: 99 }}>
                <SelectBoxGroup
                  selectState={selectState}
                  selectDispatch={selectDispatch}
                  openDetailGroup={() => {
                    setIsDetail(true);
                  }}
                />
                <View style={mapBottomSheetStyles.dividerWrapper}>
                  <Divider height={1} color="darkGrey" />
                </View>
                <View style={mapBottomSheetStyles.sortButton}>
                  <TouchableOpacity
                    style={mapBottomSheetStyles.sortButtonWrapper}
                    onPress={() => setSort({ ...sort, dialog: true })}
                  >
                    <Text variant="body2" color="white">
                      {sort.value === 'distance'
                        ? MENT_EVENT_MAP.MAIN.SORT.DISTANCE
                        : MENT_EVENT_MAP.MAIN.SORT.DATE}
                    </Text>
                    <Icon name="IconArrowDown" size={12} />
                  </TouchableOpacity>
                </View>
              </SpaceLayout>
            )}
            {eventList.length === 0 && !isLoading ? (
              <View>
                <EmptyScreen
                  style={mapBottomSheetStyles.bottomEmptyScreenStyle}
                  content={MENT_EVENT_MAP.MAIN.EMPTY_EVENT}
                />
              </View>
            ) : (
              <BottomSheetFlatList
                style={mapBottomSheetStyles.bottomSheetContainer}
                data={eventList}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorComponent}
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
            )}
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
