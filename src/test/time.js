function formatVideoTime(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);
  let time = '';
  if (totalSeconds > -1) {
    const hour = Math.floor(totalSeconds / 3600);
    const min = Math.floor(totalSeconds / 60) % 60;
    const sec = totalSeconds % 60;
    console.log(hour, min, sec);
    if (hour < 10 && hour > 0) {
      time += hour + ':';
    } else if (hour >= 10) {
      time += hour + ":";
    }

    if (min < 10 && min > 0) {
      if (hour > 0) {
        time += '0' + min + ":";
      } else {
        time = min + ":";
      }
    } else if (min >= 10) {
      time += min + ":";
    } else {
      time += ':'.padStart(2, '0');
    }

    if (sec < 10) {
      time += "0";
    }
    time += sec;
  }
  return time;
}

 function formatVideoTime2(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);
  const hour = Math.floor(totalSeconds / 3600);
  const min = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
  const sec = String(totalSeconds % 60).padStart(2, '0');
  const hourStr = hour < 1 ? '' : (String(hour).padStart(2, '0') + ':');
  return `${hourStr}${min}:${sec}`;
}
 function formatTime(curTime) {
  curTime = Math.round(curTime);
  let time = '0';
  if (curTime > -1) {
    const hour = Math.floor(curTime / 3600);
    const min = Math.floor(curTime / 60) % 60;
    const sec = curTime % 60;
    if (hour < 10) {
      time = '0' + hour + ":";
    } else {
      time = hour + ":";
    }

    if (min < 10) {
      time += "0";
    }
    time += min + ":";

    if (sec < 10) {
      time += "0";
    }
    time += sec;
  }
  return time;
}

function formatTime2(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);
  const hour = Math.floor(totalSeconds / 3600);
  const min = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
  const sec = String(totalSeconds % 60).padStart(2, '0');
  const hourStr = String(hour).padStart(2, '0') + ':';
  return `${hourStr}${min}:${sec}`;
}

const test = (seconds) => {
  console.log(formatVideoTime2(seconds));
  console.log(formatTime2(seconds));
}

test(6);

