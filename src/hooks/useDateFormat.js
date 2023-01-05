function useDateFormat(value, type) {
  const date = new Date(value);
  switch (type) {
    case 'year':
      return date.getFullYear();
    case 'month':
      return date.getMonth();
    case 'date':
      return date.getDate();
    case 'day':
      return date.getDay();
    case 'hour':
      return date.getHours();
    case 'minute':
      return date.getMinutes();
    case 'seconds':
      return date.getSeconds();
    case 'milliseconds':
      return date.getMilliseconds();
    case 'dateString':
      return date.toDateString();
    case 'm/d/y':
      return date.toLocaleDateString();
    case 'm/d/y,h:m:s':
      return date.toLocaleString();
    default:
      return date;
  }
}

export default useDateFormat;
