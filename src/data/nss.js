// 한국인 스트레스 척도 (National Stress Scale, NSS)
// 출처: 국립정신건강센터, 2024. 무상 공개 평가도구.

export const NSS_TITLE = '한국인 스트레스 척도 (NSS)'
export const NSS_DESC =
  '국립정신건강센터가 한국 문화에 맞게 개발한 스트레스 자가평가 도구입니다. 최근 2주간의 상태를 기준으로 응답해 주세요.'

export const NSS_QUESTIONS = [
  '스트레스를 많이 받는다',
  '변화에 적응하기 어렵다',
  '문제가 생기면 직접 처리할 자신이 없다',
  '머리가 아프다',
  '어지럽다',
  '소화가 안된다',
  '가슴이 답답하다',
  '불안하고 초조하다',
  '쉽게 화가 난다',
  '쉽게 짜증이 난다',
  '뭘 자꾸 먹게 된다',
]

// 절단점: 11점 이상 정신건강의학과적 질환 가능성 (ROC 분석 기준)
export const NSS_RESULTS = [
  {
    min: 0,
    max: 10,
    level: '낮은 수준',
    color: 'success',
    emoji: '😊',
    description: '현재 스트레스 수준이 낮은 상태입니다. 지금처럼 건강한 생활습관을 유지해 주세요.',
    advice: '규칙적인 수면과 운동, 충분한 휴식이 스트레스 예방에 도움이 됩니다.',
  },
  {
    min: 11,
    max: 20,
    level: '중등도 이상',
    color: 'moderate',
    emoji: '😔',
    description: '중등도 이상의 스트레스 상태입니다. 정신건강의학과 평가를 받아보시길 권장합니다.',
    advice: '지금 받는 스트레스 상황을 점검하고, 혼자 감당하기 어렵다면 전문가의 도움을 받아보세요.',
  },
  {
    min: 21,
    max: 33,
    level: '매우 높은 중증 수준',
    color: 'very-severe',
    emoji: '💙',
    description: '매우 높은 중증 수준의 스트레스 상태입니다. 반드시 전문적인 평가가 필요합니다.',
    advice: '지금 바로 학교 상담센터(02-901-8386) 또는 정신건강 위기상담전화(1577-0199)에 연락해 주세요.',
  },
]

export function getNSSResult(score) {
  return NSS_RESULTS.find((r) => score >= r.min && score <= r.max)
}
