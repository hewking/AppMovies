export interface BaseProps {
  style?: {};
  intl?: any;
  navigation?: any;
  onLayout?: (event: { nativeEvent: { layout: { x: number; y: number; width: number; height: number } } }) => void;
  // ref?: (ref) => void;
}
