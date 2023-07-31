/** 
  - EE("Exhibition/Expo", "전시/박람회")
  - S("Show", "공연")
  - EA("Exercise/Activity", "운동/액티비티")
  - FD("Food/Drink", "푸드/드링크")
  - PF("Party/Festival","파티/페스티벌")
  - FSDH("FellowShip/DailyHope","친목/일일호프")
*/
const enum FieldCode {
  EE = 'EE',
  S = 'S',
  EA = 'EA',
  FD = 'FD',
  PF = 'PF',
  FSDH = 'FSDH',
}
/** 
 *- CA: Comment Alert
  - EA: Event Alert
 */
const enum AlertCode {
  CA = 'CA',
  EA = 'EA',
}

export { AlertCode, FieldCode };
