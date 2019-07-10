import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 750;
const guidelineBaseHeight = 1334;

// iphonex的尺寸
const X_WIDTH = 375;
const X_HEIGHT = 812;
export const isIphoneX = Platform.OS === "ios" &&
  ((height >= X_HEIGHT && width >= X_WIDTH) ||
    (height >= X_WIDTH && width >= X_HEIGHT));

export const radio = PixelRatio.get();
export const pixel = 1 / PixelRatio.get();
export const wScreen  = Dimensions.get("window").width;
export const hScreen = Dimensions.get("window").height;
export const dp2px  = (dp) => PixelRatio.getPixelSizeForLayoutSize(dp);
export const px2dp  = (px) => PixelRatio.roundToNearestPixel(px);
export const hScale  = (size) => (width / guidelineBaseWidth) * size;
export const vScale  = (size) => (height / guidelineBaseHeight) * size;

export const statusBarHeight = getStatusBarHeight();
export const safeAreaViewHeight = isIphoneX ? 34 : 0;
// 标题栏的高度
export const titleHeight = (height / guidelineBaseHeight) * 100 + (statusBarHeight ? statusBarHeight : 20);

export function isIPhoneXPaddTop(size) {
    size = isNaN(+size) ? 0 : +size;
    return size + (isIphoneX ? 44 : 20);
}

export function isIPhoneXFooter(size) {
    size = isNaN(+size) ? 0 : +size;
    return size + (isIphoneX ? 34 : 0 );
}
export function screenLog() {
    console.log(Dimensions.get("window").width, Dimensions.get("window").height);
}
// 状态栏的高度
export function getStatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  }

  if (isIphoneX) {
      return 44;
  }
  return 20;
}
