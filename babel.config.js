module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-react-docgen-typescript', { exclude: 'node_modules' }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.style.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.test.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
