// 한국인 불안 척도 (National Anxiety Scale, NAS)
// 출처: 국립정신건강센터, 2024. 무상 공개 평가도구.

export const NAS_TITLE = '한국인 불안 척도 (NAS)'
export const NAS_DESC =
  '국립정신건강센터가 한국 문화에 맞게 개발한 불안 자가평가 도구입니다. 최근 2주간의 상태를 기준으로 응답해 주세요.'

export const NAS_QUESTIONS = [
  '이유 없이 불안하다',
  '안절부절못한다',
  '불안이나 걱정으로 일상생활이 안된다',
  '나쁜 일이 일어날까 두렵다',
  '걱정이 많다는 것을 알면서도 걱정을 멈출 수 없다',
  '집중하는 것이 어렵다',
  '금방 피로해진다',
  '신경이 날카롭다',
  '근육이 긴장된다',
  '잠들기가 어렵거나 자는 도중 자꾸 깬다',
  '두근거림, 떨림, 입마름 등의 증상이 있다',
]

// 절단점: 10점 이상 불안장애 가능성 (ROC 분석 기준)
export const NAS_RESULTS = [
  {
    min: 0,
    max: 9,
    level: '낮은 수준',
    color: 'success',
    emoji: '😊',
    description: '현재 불안 증상이 거의 없는 안정적인 상태입니다. 지금의 평온함을 유지해 나가세요.',
    advice: '규칙적인 생활과 명상, 가벼운 운동이 마음의 평온을 유지하는 데 도움이 됩니다.',
  },
  {
    min: 10,
    max: 16,
    level: '경증 수준',
    color: 'mild',
    emoji: '😌',
    description: '경증 수준의 불안 증상이 있을 수 있습니다. 스트레스 관리와 자기 돌봄이 도움이 될 수 있어요.',
    advice: '복식 호흡, 가벼운 스트레칭, 자연 속 산책 등을 시도해 보세요. 증상이 지속되면 상담을 고려해 보세요.',
  },
  {
    min: 17,
    max: 24,
    level: '중등도 수준',
    color: 'moderate',
    emoji: '😰',
    description: '중등도 수준의 불안 증상이 나타나고 있습니다. 전문적인 도움을 받아보시길 권장합니다.',
    advice: '학교 상담센터에서 불안 관리에 대한 전문적인 도움을 받아보세요.',
  },
  {
    min: 25,
    max: 33,
    level: '중증 수준',
    color: 'severe',
    emoji: '💙',
    description: '중증 수준의 불안 증상이 나타나고 있습니다. 전문가의 도움이 필요한 상태입니다.',
    advice: '지금 바로 학교 상담센터(02-901-8386) 또는 정신건강 위기상담전화(1577-0199)에 연락해 주세요.',
  },
]

export function getNASResult(score) {
  return NAS_RESULTS.find((r) => score >= r.min && score <= r.max)
}
