module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^react-native-svg$': '<rootDir>/__mocks__/react-native-svg.js',
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^@maplibre/maplibre-react-native$': '<rootDir>/__mocks__/@maplibre/maplibre-react-native.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '(jest-)?react-native' +
      '|@react-native(-community)?' +
      '|@react-navigation' +
      '|redux-persist' +
      '|react-redux' +
      '|react-native-safe-area-context' +
      '|react-native-gesture-handler' +
      '|react-native-reanimated' +
      '|react-native-svg' +
      '|react-native-calendars' +
      '|react-native-swipe-gestures' +
      '|immer' +
      '|@reduxjs/toolkit' +
      '|redux' +
      '|reselect' +
      ')/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/', '/e2e/', '__tests__/App.test.tsx'],
};
