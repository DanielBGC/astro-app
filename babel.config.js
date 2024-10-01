module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@store': './src/store',
            '@screens': './src/screens',
            '@components': './src/components',
            '@consts': './src/consts',
            '@types': './src/types',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
