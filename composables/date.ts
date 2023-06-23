const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Nov', 'Dec'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const useDate = () => ({
  timeOfDay: (date: Date) => {
    const minutes = date.getMinutes() - (date.getHours() * 60);
    const amPm = date.getHours() >= 12 ? 'pm' : 'am';

    return `${date.getHours()}${minutes > 0 ? '.' + `${minutes}`.padStart(2, '0') : ''}${amPm}`;
  },
  longDate: (date: Date) => {
    const dayOfMonth = date.getDate();
    const lastNumber = parseInt(`${dayOfMonth}`.split('').reverse()[0]);
    const suffix = lastNumber === 1 ? 'st' : (lastNumber === 2 ? 'nd' : (lastNumber === 3 ? 'rd' : 'th'));

    return `${days[date.getDay()]} ${dayOfMonth}${suffix} ${months[date.getMonth()]}`;
  },
  isSameDay: (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  },
  isAfter: (date1: Date, date2: Date) => {
    return date1.getFullYear() > date2.getFullYear()
      || (date1.getFullYear() === date2.getFullYear() && date1.getMonth() > date2.getMonth())
      || (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() > date2.getDate());
  },
})