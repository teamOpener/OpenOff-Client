import React, { useCallback, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SortType from 'models/ledger/entity/SortType';

interface UseBottomSheetOptions {
  initialSortType?: SortType;
}

interface UseBottomSheetResult {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  openBottomSheet: boolean;
  selectedSortType: SortType;
  presentModal: () => void;
  closeModal: () => void;
  handleSortType: (sortType: SortType) => void;
}

const useBottomSheet = ({
  initialSortType = SortType.DATE,
}: UseBottomSheetOptions = {}): UseBottomSheetResult => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const [selectedSortType, setSelectedSortType] =
    useState<SortType>(initialSortType);

  const presentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setOpenBottomSheet(true);
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setOpenBottomSheet(false);
  }, []);

  const handleSortType = (sortType: SortType) => {
    setSelectedSortType(sortType);
  };

  return {
    bottomSheetModalRef,
    openBottomSheet,
    selectedSortType,
    presentModal,
    closeModal,
    handleSortType,
  };
};

export default useBottomSheet;
