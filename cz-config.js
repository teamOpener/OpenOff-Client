module.exports = {
  types: [
    {value: '✨ feat', name: '✨ feat:\t새로운 기능 추가'},
    {value: '🐛 fix', name: '🐛 fix:\t버그 수정'},
    {value: '📝 docs', name: '📝 docs:\t리드미 수정'},
    {value: '💅 design', name: '💅 design:\tUI, UX 관련 코드 수정'},
    {
      value: '💄 style',
      name: '💄 style:\t코드 format 수정 (not production, UI,UX code)',
    },
    {
      value: '🫧 refactor',
      name: '🫧 refactor:\t리팩토링',
    },
    {
      value: '🔧 chore',
      name: '🔧 chore:\t작은 범위 수정 (ex. 코멘트, 주석)',
    },
    {value: '🚚 move', name: '🚚 move:\t파일 및 폴더 위치 변경'},
    {value: '🚚 rename', name: '🚚 rename:\t파일 및 폴더 이름 변경'},
    {value: '🗑️ remove', name: '🗑️ remove:\t파일 및 폴더 삭제'},
    {value: '👷 ci', name: '👷 ci:\tCI/CD 관련 수정'},
    {value: '🚧 wip', name: '🚧 wip:\t작업중'},
    {
      value: '✅ test',
      name: '✅ test:\t테스트 코드 관련',
    },
  ],
  subjectLimit: 50,
  skipQuestions: ['body', 'footer'],
  skipEmptyScopes: true,
};
