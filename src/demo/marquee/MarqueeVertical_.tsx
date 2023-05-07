import React, {
  Component,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { NoticeValue } from "./NoticeBar";

export const deviceWidth = Dimensions.get("window").width;
export const MarqueeType = {
  Simple: "simple", //最简单的滚动
  Multiple: "multiple", //多列
  MultipleRoll: "multiple_roll", //多列连续滚动
};

export const Direction = {
  Up: "up",
  Down: "down",
};

export type MarqueeVerticalProps = {
  duration?: number;
  textList: NoticeValue[];
  width?: number;
  height?: number;
  delay?: number;
  direction: string;
  numberOfLines?: number;
  onTextClick?: (item: NoticeValue) => void;
  bgContainerStyle?: ViewStyle;
  headViews?: ReactNode;
  textStyle?: TextStyle;
  viewStyle?: ViewStyle;
  type?: string;
};

const MarqueeVertical = ({
  duration,
  textList,
  width,
  height = 50,
  delay,
  direction,
  numberOfLines,
  onTextClick,
  bgContainerStyle,
  headViews,
  textStyle,
  viewStyle,
}: MarqueeVerticalProps) => {
  const [animation, setAnimator] = useState<any>(null);
  const [oldTextList, setOldTextList] = useState(textList);
  const [maxIndex, setMainIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  let [index, setIndex] = useState(1);

  const animatedTransformYRef = useRef(new Animated.Value(0));

  useEffect(() => {
    setMainIndex(textList.length + 2);
    setTextIndex(textList.length);
    setIndex(direction === Direction.Down ? textList.length : 1);
    return () => {
      animation && (animation as any).stop();
    };
  }, []);

  useEffect(() => {
    if (!animation) {
      let myIndex = 0;
      let yValue = 0;
      let yToValue = 0;
      if (direction === Direction.Down) {
        myIndex = index;
        yValue = myIndex * height;
        yToValue = 0;
        if (myIndex > 0) {
          yToValue = (myIndex - 1) * height;
          setIndex(--index);
        } else {
          yValue = textIndex * height;
          yToValue = (textIndex - 1) * height;
          setIndex(textIndex - 1);
        }
      } else if (direction === Direction.Up) {
        myIndex = index + 1;
        yValue = (myIndex - 1) * height;
        yToValue = 0;
        if (myIndex >= maxIndex) {
          yValue = 1 * height;
          yToValue = 2 * height;
          setIndex(2);
        } else {
          yToValue = myIndex * height;
          setIndex(++index);
        }
      }

      animatedTransformYRef.current.setValue(-yValue);
      setAnimator(
        Animated.timing(animatedTransformYRef.current, {
          toValue: -yToValue,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.linear,
          delay: delay,
        })
      );

      animation &&
        animation.start(() => {
          setAnimator(null);
        });
    }
  });

  let newText = textList || [];
  let oldText = oldTextList || [];
  let newDirection = direction || Direction.Up;
  if (newText !== oldText) {
    animation && animation.stop();
    setOldTextList(newText);
    setMainIndex(newText.length + 2);
    setTextIndex(newText.length);
    setIndex(newDirection === Direction.Down ? newText.length : 1);
    setAnimator(null);
  }

  const singleLineTextView = useCallback((list: NoticeValue[]) => {
    if (list == null || list.length <= 0) {
      return <View />;
    }
    let headViewList: any[] = [];
    let mHeadViewList: any[] = [];
    let itemView = [];
    let mlist: NoticeValue[] = [];
    if (headViews == null || list.length <= 0) {
    } else {
      headViewList = headViewList.concat(headViews);
      mHeadViewList = mHeadViewList.concat(headViewList);
      mHeadViewList.push(headViewList[0]);
      mHeadViewList.unshift(headViewList[headViewList.length - 1]);
    }
    mlist = mlist.concat(list);
    mlist.push(list[0]);
    mlist.unshift(list[list.length - 1]);
    for (let i = 0; i < mlist.length; i++) {
      let item = mlist[i];
      itemView.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.9}
          onPress={() => {
            onTextClick && onTextClick(item);
          }}
        >
          <View
            style={{
              ...styles.viewStyle,
              width: width,
              height: height,
              ...viewStyle,
            }}
          >
            {mHeadViewList ? mHeadViewList[i] : null}
            <Text
              style={{
                ...styles.textStyle,
                ...textStyle,
              }}
              numberOfLines={numberOfLines}
            >
              {item.value}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Animated.View
        style={{
          width: width,
          transform: [{ translateY: animatedTransformYRef.current }],
        }}
      >
        {itemView}
      </Animated.View>
    );
  }, []);

  return (
    <View
      style={{
        ...styles.bgContainerStyle,
        width: width,
        height: height,
        ...bgContainerStyle,
      }}
      // opacity={animation ? 1 : 0}
    >
      {singleLineTextView(textList)}
    </View>
  );
};

MarqueeVertical.defaultProps = {
  duration: 600,
  textList: [],
  width: 375,
  height: 50,
  delay: 1200,
  direction: Direction.Up,
  numberOfLines: 1,
  onTextClick: (item: NoticeValue) => {},
};

const styles = StyleSheet.create({
  bgContainerStyle: {
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textStyle: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
});

export default React.memo(MarqueeVertical);
