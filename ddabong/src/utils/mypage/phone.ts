// 휴대폰 번호 유효성 검사
export const isValidMobile = (val: string) =>
  /^(01[016789])-(\d{3,4})-(\d{4})$/.test(val);
