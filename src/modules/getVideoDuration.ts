export default function getVideoDuration(seconds: number) {
  let time = {
    decimal: 0,
    seconds: 0,
    min: 0,
    hours: 0,
  };

  let hours = seconds / 3600;
  time.hours = Math.floor(hours);
  time.decimal = hours - time.hours;

  let min = time.decimal * 60;
  time.min = Math.floor(min);
  time.decimal = min - time.min;

  let sec = time.decimal * 60;
  time.seconds = Math.floor(sec);
  time.decimal = sec - time.seconds;
  let result;
  if (time.hours === 0) {
    result = `${time.min}:${time.seconds}`;
  } else {
    result = `${time.hours}:${time.min}:${time.seconds}`;
  }

  return result;
}
