import MAX_POSTER from 'constants/event/event';
import i18n from 'locales';
import { initEventFormErrMsg } from 'stores/OpenEventStore';
import { EventForm } from 'types/openEvent/EventForm';
import { EventFormError } from 'types/openEvent/EventFormError';
import { validateEmail, validatorOnlyPhoneNumber } from 'utils/validate';

interface Props {
  openEvent: EventForm;
}

const useOpenEventValidator = ({ openEvent }: Props) => {
  let errorMessage: EventFormError = initEventFormErrMsg;
  let hasError = false;

  const setError = (field: keyof EventFormError, message: string) => {
    hasError = true;
    errorMessage = { ...errorMessage, [field]: message };
  };

  if (!openEvent.field.length) {
    setError('field', i18n.t('error_field'));
  }

  if (!openEvent.title) {
    setError('title', i18n.t('error_title'));
  }

  if (!openEvent.applicationStartDate || !openEvent.applicationEndDate) {
    setError('applicationPeriod', i18n.t('error_application_date'));
  }

  if (!openEvent.eventDates.length) {
    setError('eventDates', i18n.t('error_date'));
  }

  if (!openEvent.address.roadAddress) {
    setError('address', i18n.t('input_event_place'));
  }

  if (!openEvent.recruitmentNumber) {
    setError('recruitmentNumber', i18n.t('recruitment_input'));
  }

  if (!openEvent.description) {
    setError('description', i18n.t('description_input'));
  }

  if (!openEvent.imageBuilders.length) {
    setError(
      'imageUrls',
      i18n.t('image_upload', {
        max_poster: MAX_POSTER,
      }),
    );
  }

  if (!openEvent.hostName) {
    setError('hostName', i18n.t('host_name_input'));
  }

  if (!openEvent.hostPhoneNumber) {
    setError('hostPhoneNumber', i18n.t('host_phone_input'));
  } else if (!validatorOnlyPhoneNumber(openEvent.hostPhoneNumber)) {
    setError('hostPhoneNumber', i18n.t('input_valid_phone'));
  }

  if (!openEvent.hostEmail) {
    setError('hostEmail', i18n.t('input_email'));
  } else if (validateEmail(openEvent.hostEmail)) {
    setError('hostEmail', i18n.t('input_valid_email'));
  }

  return { hasError, errorMessage };
};

export default useOpenEventValidator;
