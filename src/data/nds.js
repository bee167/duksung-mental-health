// 한국인 우울 척도 (National Depression Scale, NDS)
// 출처: 국립정신건강센터, 2024. 무상 공개 평가도구.

export const NDS_TITLE = '한국인 우울 척도 (NDS)'
export const NDS_DESC =
  '국립정신건강센터가 한국 문화에 맞게 개발한 우울 자가평가 도구입니다. 최근 2주간의 상태를 기준으로 응답해 주세요.'

export const NDS_QUESTIONS = [
  '하루 종일 우울하다',
  '평소에는 즐겁던 일이 재미 없어졌다',
  '죽고 싶다',
  '마음속에서 뭔가 치밀어 오르는 것 같다',
  '사소한 일도 결정하기가 어렵다',
  '자신감을 잃었다',
  '앞으로도 좋은 일이 생길 것 같지 않다',
  '안절부절못하거나 느려졌다는 말을 듣는다',
  '잠을 지나치게 많이 자거나 적게 잔다',
  '식욕이 지나치게 늘거나 줄었다',
  '피곤하고 기진맥진한 상태이다',
  '하루를 생활하기가 버겁다',
]

// 공통 응답 옵션 (NDS/NAS/NSS 동일)
export const ANSWER_OPTIONS = [
  { label: '전혀 그렇지 않다', sublabel: '없음', value: 0 },
  { label: '가끔 그렇다', sublabel: '2일 이상', value: 1 },
  { label: '자주 그렇다', sublabel: '1주 이상', value: 2 },
  { label: '거의 매일 그렇다', sublabel: '거의 2주', value: 3 },
]

// 절단점: 9점 이상 우울장애 가능성 (ROC 분석 기준)
export const NDS_RESULTS = [
  {
    min: 0,
    max: 8,
    level: '낮은 수준',
    color: 'success',
    emoji: '😊',
    description: '현재 우울 증상이 거의 없는 상태입니다. 지금처럼 규칙적인 생활과 자기 돌봄을 유지해 주세요.',
    advice: '꾸준한 수면, 가벼운 운동, 균형 잡힌 식사가 마음 건강을 지켜줍니다.',
  },
  {
    min: 9,
    max: 18,
    level: '경도 수준',
    color: 'mild',
    emoji: '😌',
    description: '경도 수준의 우울 증상이 있을 수 있습니다. 충분한 휴식과 자기 돌봄이 도움이 될 수 있어요.',
    advice: '좋아하는 활동을 늘리고, 가까운 사람과 대화를 나눠보세요. 증상이 지속되면 전문 상담을 고려해 보세요.',
  },
  {
    min: 19,
    max: 28,
    level: '중등도 수준',
    color: 'moderate',
    emoji: '😔',
    description: '중등도 수준의 우울 증상이 나타나고 있습니다. 전문적인 도움을 받아보시길 권장합니다.',
    advice: '학교 상담센터나 정신건강 전문기관에 도움을 요청해 보세요. 혼자 견디지 않아도 됩니다.',
  },
  {
    min: 29,
    max: 36,
    level: '중증 수준',
    color: 'very-severe',
    emoji: '💙',
    description: '중증 수준의 우울 증상이 나타나고 있습니다. 즉각적인 전문가 도움이 필요합니다.',
    advice: '지금 바로 학교 상담센터(02-901-8386) 또는 정신건강 위기상담전화(1577-0199)에 연락해 주세요.',
  },
]

export function getNDSResult(score) {
  return NDS_RESULTS.find((r) => score >= r.min && score <= r.max)
}
