import { useState } from 'react';
import useInterestFields from 'hooks/interest/useInterestFields';
import { Field } from 'types/interest';

const useInterestField = () => {
  const { clickableInterestTags } = useInterestFields();

  const [interestField, setInterestField] = useState<Field[]>(
    clickableInterestTags(),
  );

  const computedCount = () => {
    let count = 0;
    interestField.forEach((mappingField) => {
      if (mappingField.isActive) {
        count += 1;
      }
    });
    return count;
  };

  return { setInterestField, interestField, computedCount };
};

export default useInterestField;
