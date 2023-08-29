module.exports = {
  types: [
    { type: 'feat', section: '✨ Features', hidden: false },
    { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
    { type: 'chore', section: '🔧 Others', hidden: false },
    {
      type: 'improvement',
      section: '💫 Feature Improvements',
      hidden: false,
    },
    { type: 'design', section: '💅 Design', hidden: false },
    { type: 'refactor', section: '🫧 Code Refactoring', hidden: false },
    { type: 'test', section: '✅ Tests', hidden: false },
    { type: 'ci', section: '👷 CI', hidden: false },
  ],
  releaseCommitMessageFormat: '⛴️ chore(release): v{{currentTag}}',
};
