export const PHQ9_TITLE = 'PHQ-9 우울증 자가진단'
export const PHQ9_DESC =
  'Patient Health Questionnaire-9(PHQ-9)는 지난 2주간의 우울 증상을 측정하는 표준화된 도구입니다.'

export const PHQ9_QUESTIONS = [
  '일 또는 여가 활동을 하는 데 흥미나 즐거움을 느끼지 못함',
  '기분이 가라앉거나, 우울하거나, 희망이 없음',
  '잠들기 어렵거나, 수면 유지가 어렵거나, 또는 잠을 너무 많이 잠',
  '피곤함을 느끼거나 기운이 거의 없음',
  '식욕이 없거나 과식을 함',
  '자신이 실패자라고 느끼거나, 자신 또는 가족을 실망시킴',
  '신문을 읽거나 TV를 보는 것과 같은 일에 집중하기 어려움',
  '다른 사람들이 알아챌 정도로 너무 느리게 움직이거나 말함, 또는 반대로 너무 안절부절못하거나 들떠 있음',
  '자신이 죽는 것이 더 낫겠다거나 어떤 식으로든 자신을 해칠 것이라는 생각',
]

export const ANSWER_OPTIONS = [
  { label: '전혀 없음', value: 0 },
  { label: '며칠 동안', value: 1 },
  { label: '7일 이상', value: 2 },
  { label: '거의 매일', value: 3 },
]

export const PHQ9_RESULTS = [
  {
    min: 0,
    max: 4,
    level: '정상',
    color: 'success',
    emoji: '😊',
    description:
      '현재 우울 증상이 거의 없는 상태입니다. 지금처럼 규칙적인 생활과 긍정적인 사고를 유지해 주세요.',
    advice: '꾸준한 수면, 운동, 균형 잡힌 식사가 마음 건강을 지켜줍니다.',
  },
  {
    min: 5,
    max: 9,
    level: '가벼운 우울',
    color: 'mild',
    emoji: '😌',
    description:
      '가벼운 우울 증상이 있습니다. 충분한 휴식과 자기 돌봄이 도움이 될 수 있습니다.',
    advice: '좋아하는 활동을 늘리고, 가까운 사람과 대화를 나눠보세요. 증상이 지속되면 전문 상담을 고려해 보세요.',
  },
  {
    min: 10,
    max: 14,
    level: '중등도 우울',
    color: 'moderate',
    emoji: '😔',
    description:
      '중간 정도의 우울 증상이 나타나고 있습니다. 전문적인 도움을 받아보시길 권장합니다.',
    advice: '학교 상담센터나 전문 기관에 도움을 요청해 보세요. 혼자 견디지 않아도 됩니다.',
  },
  {
    min: 15,
    max: 19,
    level: '중등도-심한 우울',
    color: 'severe',
    emoji: '😢',
    description:
      '상당한 우울 증상이 있습니다. 전문가의 도움이 필요한 상태입니다.',
    advice: '지금 바로 학교 상담센터에 연락하거나 정신건강 전문의를 만나보세요. 용기 있는 선택입니다.',
  },
  {
    min: 20,
    max: 27,
    level: '심한 우울',
    color: 'very-severe',
    emoji: '💙',
    description:
      '심한 우울 증상이 나타나고 있습니다. 즉각적인 전문가 도움이 필요합니다.',
    advice: '혼자 있지 마시고, 지금 당장 학교 상담센터(02-901-8386) 또는 정신건강 위기상담전화(1577-0199)에 연락해 주세요.',
  },
]

export function getPHQ9Result(score) {
  return PHQ9_RESULTS.find((r) => score >= r.min && score <= r.max)
}
