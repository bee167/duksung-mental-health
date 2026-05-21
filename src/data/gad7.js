export const GAD7_TITLE = 'GAD-7 불안 자가진단'
export const GAD7_DESC =
  'Generalized Anxiety Disorder-7(GAD-7)은 지난 2주간의 불안 증상을 측정하는 표준화된 도구입니다.'

export const GAD7_QUESTIONS = [
  '불안하거나 초조하거나 긴장된 느낌',
  '걱정을 멈추거나 조절할 수 없음',
  '다양한 것들에 대해 지나치게 걱정함',
  '편안하게 쉬기 어려움',
  '너무 안절부절못하여 가만히 있기 어려움',
  '쉽게 짜증이 나거나 과민해짐',
  '무언가 끔찍한 일이 일어날 것 같은 두려움',
]

export const GAD7_RESULTS = [
  {
    min: 0,
    max: 4,
    level: '정상',
    color: 'success',
    emoji: '😊',
    description:
      '현재 불안 증상이 거의 없는 상태입니다. 지금의 안정적인 상태를 유지해 나가세요.',
    advice: '규칙적인 생활과 명상, 가벼운 운동이 마음의 평온을 유지하는 데 도움이 됩니다.',
  },
  {
    min: 5,
    max: 9,
    level: '가벼운 불안',
    color: 'mild',
    emoji: '😌',
    description:
      '가벼운 불안 증상이 있습니다. 스트레스 관리와 자기 돌봄이 도움이 될 수 있습니다.',
    advice: '복식 호흡, 가벼운 스트레칭, 자연 속 산책 등을 시도해 보세요. 증상이 지속되면 상담을 고려해 보세요.',
  },
  {
    min: 10,
    max: 14,
    level: '중등도 불안',
    color: 'moderate',
    emoji: '😰',
    description:
      '중간 정도의 불안 증상이 나타나고 있습니다. 전문적인 도움을 받아보시길 권장합니다.',
    advice: '학교 상담센터에서 불안 관리에 대한 전문적인 도움을 받아보세요.',
  },
  {
    min: 15,
    max: 21,
    level: '심한 불안',
    color: 'severe',
    emoji: '💙',
    description:
      '심한 불안 증상이 나타나고 있습니다. 전문가의 도움이 필요한 상태입니다.',
    advice: '지금 바로 학교 상담센터(02-901-8386) 또는 정신건강 위기상담전화(1577-0199)에 연락해 주세요.',
  },
]

export function getGAD7Result(score) {
  return GAD7_RESULTS.find((r) => score >= r.min && score <= r.max)
}
