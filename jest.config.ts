import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'react-native',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', 
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-redux)/)',

  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

export default config;
