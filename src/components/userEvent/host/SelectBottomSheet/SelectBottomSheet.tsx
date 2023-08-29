import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Text from 'components/common/Text/Text';
import SortType from 'models/ledger/entity/SortType';
import { colors } from 'styles/theme';
import selectBottomSheetStyles from './SelectBottomSheet.style';
import SortOption from './SortOption';

interface Props {
  selectedSortType: SortType;
  setSelectedSortType: (SortType: SortType) => void;
  handleModalClose: () => void;
}

const SelectBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  (
    { selectedSortType, setSelectedSortType, handleModalClose },
    forwardedRef,
  ) => {
    const fallbackRef = useRef<BottomSheetModal>(null);
    const ref = forwardedRef || fallbackRef;

    const snapPoints = useMemo<string[]>(() => ['30%'], []);

    const handleSortType = (type: SortType) => {
      setSelectedSortType(type);
      handleModalClose();
    };

    const handleSheetChanges = useCallback((index: number) => {
      if (index === -1) {
        handleModalClose();
      }
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={selectBottomSheetStyles.sortContainer}
          handleIndicatorStyle={{
            backgroundColor: colors.grey,
          }}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
        >
          <View style={selectBottomSheetStyles.bottomModalContainer}>
            <View style={selectBottomSheetStyles.modalTitleContainer}>
              <Text style={selectBottomSheetStyles.modalTitleText}>
                정렬 기준
              </Text>
            </View>

            <SortOption
              label="신청순"
              isSelected={selectedSortType === SortType.DATE}
              onPress={() => handleSortType(SortType.DATE)}
            />
            <SortOption
              label="이름순"
              isSelected={selectedSortType === SortType.NAME}
              onPress={() => handleSortType(SortType.NAME)}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default SelectBottomSheet;
