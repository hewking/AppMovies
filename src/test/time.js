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

console.log(formatVideoTime(6));