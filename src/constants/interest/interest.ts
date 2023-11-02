const enum FieldCode {
  EE = 'EE',
  S = 'S',
  EA = 'EA',
  FD = 'FD',
  PF = 'PF',
  FSDH = 'FSDH',
}

const enum FieldName {
  EE = '전시/플리마켓',
  S = '공연',
  EA = '운동/액티비티',
  FD = '푸드/드링크',
  PF = '파티/페스티벌',
  FSDH = '친목/네트워킹',
}

const getFieldName = (fieldCode: FieldCode): FieldName => {
  switch (fieldCode) {
    case FieldCode.EE:
      return FieldName.EE;
    case FieldCode.S:
      return FieldName.S;
    case FieldCode.EA:
      return FieldName.EA;
    case FieldCode.FD:
      return FieldName.FD;
    case FieldCode.PF:
      return FieldName.PF;
    case FieldCode.FSDH:
      return FieldName.FSDH;
    default:
      throw new Error(`Invalid FieldCode: ${fieldCode}`);
  }
};

export { FieldCode, FieldName, getFieldName };
