import { Dimensions } from "react-native";
export const Spacing = {
  none: 0,
  tiny: 2,
  xsmall: 4,
  small: 8,
  medium: 16,
  big: 24,
  large: 32
};

export const ButtonSize = {
  small: 28,
  medium: 42,
  large: 50
};

export const ButtonRadius = {
  radius: 6
};

export const Colors = {
  background: "#191A2A",
  darkerBackground: "#10101A",
  lightBackground: "#212132",
  lighterBackground: "#2d2e46",
  lightestBackground: "#3f415d",
  lightPurple: "#696A9C",
  primaryText: "#FFFFFF",
  secondaryText: "#66688F",
  summaryText: "#999bb5",
  buttonText: "#9c9eb9",
  titleLabel: "#7476A2",
  primaryGradient: ["#FF4465", "#F6CA1D"],
  buttonGradient: ["#39619b", "#3f879b"],
  transactionCardGradient: ["#444663", "#2d2e46"],
  transactionsRewardsGradient: ["#FF4465", "#f7b229"],
  transactionSuccessGradient: ["#3de278", "#1c5631"],
  confirmed: "#3FE77B",
  unconfirmed: "#FF4465",
  yellow: "#F5FF30",
  green: "#a9ff68",
  red: "#9A2520",
  orange: "#ff7f28",
  RGB: {
    background: "25,26,42",
    darkerBackground: "16,16,26",
    lighterBackground: "45,46,70",
    lightestBackground: "63,65,93",
    primaryText: "255,255,255",
    secondaryText: "102,104,143",
    summaryText: "155,155,180"
  },
  // #ffffff白色   #89a0ae灰色   #4ab9f0 蓝色 ，三种text颜色
  whiteLabel: "#ffffff",
  greyLabel: "#89a0ae",
  blueLabel: "#4ab9f0",
  colorPrimary: "#222937",
  colorPrimaryDark: "#222937",
  colorAccent: "#448aec",
  chatBgColor: "#2d3549",
  inputPanelBackground: '#1A1E29',
  transparent: 'transparent',
};

const { width, height } = Dimensions.get("window");

export const ScreenSize = {
  width,
  height
};

const getAdjustedFontSize = (size) =>
  parseInt(size) * width * (1.8 - 0.002 * width) / 400;

export const FontSize = {
  tiny: getAdjustedFontSize(11),
  button: getAdjustedFontSize(12),
  xsmall: getAdjustedFontSize(12),
  smaller: getAdjustedFontSize(14),
  small: getAdjustedFontSize(16),
  average: getAdjustedFontSize(18),
  medium: getAdjustedFontSize(24),
  large: getAdjustedFontSize(36),
  huge: getAdjustedFontSize(54)
};
