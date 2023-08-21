import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import { DetailEventInfoResponseDto } from 'models/event/response/DetailEventInfoResponseDto';
import EventApplyStatus from 'types/event/eventApplyStatus';

const useEventApplyStatus = () => {
  const createDisabledObject = (label: string) => ({
    disabled: true,
    label,
  });

  const disabledEvent = (
    event: DetailEventInfoResponseDto,
  ): EventApplyStatus => {
    if (event?.isEnded) {
      return createDisabledObject(MENT_EVENT_DETAIL.MAIN.ENDED_EVENT);
    }
    if (new Date(event?.eventApplyStartDate ?? '') > new Date()) {
      return createDisabledObject(MENT_EVENT_DETAIL.MAIN.BE_OPENED);
    }
    if (new Date(event?.eventApplyEndDate ?? '') < new Date()) {
      return createDisabledObject(MENT_EVENT_DETAIL.MAIN.CLOSED_EVENT);
    }
    if (!event?.isApplyPermit) {
      return createDisabledObject(MENT_EVENT_DETAIL.MAIN.APPLICATION_CLOSES);
    }
    return {
      disabled: false,
      label: MENT_EVENT_DETAIL.MAIN.APPLY_PARTICIPATION,
    };
  };

  return { disabledEvent };
};

export default useEventApplyStatus;
