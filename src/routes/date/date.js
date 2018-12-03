
export function createDateInfo() {
  let date = new Date();
  let formattedDate;
  let time;
  let dateInfo = [];

  formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

  if (date.getHours().toString().length === 1) time = '0' + date.getHours();
  else time = '' + date.getHours();

  if (date.getMinutes().toString().length === 1) time += ':0' + date.getMinutes();
  else time += ':' + date.getMinutes();

  if (date.getHours() > 11) time += ' PM';
  else time += ' AM';

  dateInfo['timestamp'] = date.getTime();
  dateInfo['date'] = formattedDate;
  dateInfo['time'] = time;

  return dateInfo;
}
