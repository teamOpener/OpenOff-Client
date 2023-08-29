module.exports = {
  header: '# 🌈 Changelog',
  types: [
    { type: 'feat', section: '✨ Features', hidden: false },
    { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
    {
      type: 'improvement',
      section: '💫 Feature Improvements',
      hidden: false,
    },
    { type: 'design', section: '💅 Design', hidden: false },
    { type: 'refactor', section: '🫧 Code Refactoring', hidden: false },
    { type: 'chore', hidden: true },
    { type: 'test', hidden: true },
    { type: 'ci', hidden: true },
  ],
  releaseCommitMessageFormat: '⛴️ chore(release): v{{currentTag}}',
};
