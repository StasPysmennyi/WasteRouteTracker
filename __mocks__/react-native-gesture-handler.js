const React = require('react');
const { View } = require('react-native');

module.exports = {
  GestureHandlerRootView: ({ children, ...props }) =>
    React.createElement(View, props, children),
  Gesture: { Pan: () => ({ onUpdate: () => ({}) }) },
  GestureDetector: ({ children }) => children,
  PanGestureHandler: ({ children, ...props }) =>
    React.createElement(View, props, children),
  TapGestureHandler: ({ children, ...props }) =>
    React.createElement(View, props, children),
  Swipeable: ({ children, ...props }) =>
    React.createElement(View, props, children),
  DrawerLayout: ({ children, ...props }) =>
    React.createElement(View, props, children),
  ScrollView: ({ children, ...props }) =>
    React.createElement(View, props, children),
  FlatList: ({ children, ...props }) =>
    React.createElement(View, props, children),
  TouchableOpacity: ({ children, ...props }) =>
    React.createElement(View, props, children),
  TouchableHighlight: ({ children, ...props }) =>
    React.createElement(View, props, children),
  TouchableNativeFeedback: ({ children, ...props }) =>
    React.createElement(View, props, children),
  TouchableWithoutFeedback: ({ children, ...props }) =>
    React.createElement(View, props, children),
  NativeViewGestureHandler: ({ children, ...props }) =>
    React.createElement(View, props, children),
  State: {},
  Directions: {},
};
