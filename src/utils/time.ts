export const toHHMMSS = (secs: string) => {
  const sec_num = parseInt(secs, 10);
  let hours: string | number = Math.floor(sec_num / 3600);
  let minutes: string | number = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: string | number = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};

export const toMMSS = (secs: string | number) => {
  let sec_num;
  if (typeof secs === 'number') {
    sec_num = Math.ceil(secs);
  } else {
    sec_num = parseInt(secs, 10);
  }

  if (secs < 0) {
    return '00:00';
  }

  let minutes: string | number = Math.floor(sec_num / 60);
  let seconds: string | number = sec_num - minutes * 60;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
};

export const generateTimeIntervals = (): number[] => {
  const intervals: number[] = [];
  const now = new Date();
  const roundedNow = new Date(Math.round(now.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000));
  const startTime = new Date(roundedNow.getTime() - 45 * 60 * 1000); // 45 minutes back
  const endTime = new Date(roundedNow.getTime() + 15 * 60 * 1000); // 15 minutes forward

  for (let time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + 5)) {
    const timeInSeconds = Math.floor(time.getTime() / 1000);
    intervals.push(timeInSeconds);
  }

  return intervals;
};
