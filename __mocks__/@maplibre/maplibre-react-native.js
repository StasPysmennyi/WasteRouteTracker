const React = require('react');
const { View } = require('react-native');

const noop = () => {};
const identity = c => c;

const Map = ({ children, ...props }) => React.createElement(View, props, children);
const Camera = React.forwardRef((props, ref) => {
  if (ref) ref.current = { zoomTo: noop, flyTo: noop, setStop: noop, jumpTo: noop };
  return null;
});
const GeoJSONSource = ({ children, ...props }) => React.createElement(View, props, children);
const Layer = () => null;

module.exports = {
  __esModule: true,
  Map,
  Camera,
  GeoJSONSource,
  Layer,
};
