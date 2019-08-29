import Toast from 'react-native-root-toast';

// TODO: MANAGED BY MSG MAP
let toast: Toast;

let lastMsg: string | null = null;

let durationQueue: Array<() => Promise<any>> = [];

if (__DEV__) {
  // @ts-ignore
  global.toast = {
    durationQueue,
    showLongToast,
    showShortToast,
    get queue() {
      return durationQueue;
    },
    get msg() {
      return lastMsg;
    },
    get instance() {
      return toast;
    }
  };
}

export function showShortToast(msg: string, noRepeat = false) {
  show(msg);
}

export function showLongToast(msg: string, noRepeat = false) {
  show(msg);
}

const DeferTime = Math.floor(Toast.durations.SHORT);

export const show = (
  text: string,
  durations = Toast.durations.SHORT,
  positions = Toast.positions.CENTER
) => {
  return Toast.show(text, {
    duration: durations,
    position: positions,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};
