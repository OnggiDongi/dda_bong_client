type engCategory =
  | 'LIVING'
  | 'EDUCATION'
  | 'SAFETY'
  | 'CULTURE'
  | 'ENVIRONMENT'
  | 'PUBLIC'
  | 'RURALAREA';

type korCategory =
  | '생활'
  | '교육'
  | '보건'
  | '문화'
  | '환경'
  | '행정'
  | '농어촌';

export const CATEGORY_MAP: Record<engCategory, korCategory> = {
  LIVING: '생활',
  EDUCATION: '교육',
  SAFETY: '보건',
  CULTURE: '문화',
  ENVIRONMENT: '환경',
  PUBLIC: '행정',
  RURALAREA: '농어촌',
};
