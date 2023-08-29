import fieldData from 'data/lists/fieldData';
import { useState } from 'react';
import { Field } from 'types/apps/group';

const useInterestField = () => {
  const [interestField, setInterestField] = useState<Field[]>(fieldData);

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
