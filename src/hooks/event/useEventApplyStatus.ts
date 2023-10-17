import i18n from 'locales';
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
      return createDisabledObject(i18n.t('event_detail.ended_event'));
    }
    if (new Date(event?.eventApplyStartDate ?? '') > new Date()) {
      return createDisabledObject(i18n.t('event_detail.be_opened'));
    }
    if (new Date(event?.eventApplyEndDate ?? '') < new Date()) {
      return createDisabledObject(i18n.t('event_detail.closed_event'));
    }
    if (!event?.isApplyPermit) {
      return createDisabledObject(i18n.t('event_detail.application_closes'));
    }
    return {
      disabled: false,
      label: i18n.t('event_detail.apply_participation'),
    };
  };

  return { disabledEvent };
};

export default useEventApplyStatus;
