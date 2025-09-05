export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${`${d.getMonth() + 1}`.padStart(2, '0')}.${`${d.getDate()}`.padStart(2, '0')}`;
