import { Link } from 'react-router-dom'
import DuksungLogo from '../components/DuksungLogo'

const FEATURES = [
  {
    icon: '📋',
    title: '자가진단',
    desc: 'PHQ-9 우울증 검사와 GAD-7 불안 검사로 나의 마음 상태를 확인하고 결과를 해석해 드려요.',
    to: '/survey',
    cls: 'fc-survey',
  },
  {
    icon: '📔',
    title: '감정일기',
    desc: '매일의 감정을 기록하고 나만의 마음 일기를 써보세요. 기록은 내 기기에만 저장돼요.',
    to: '/diary',
    cls: 'fc-diary',
  },
  {
    icon: '💚',
    title: '상담 연결',
    desc: '덕성여대 학생상담센터 정보와 긴급 지원 연락처를 안내해 드려요.',
    to: '/counseling',
    cls: 'fc-counsel',
  },
]

export default function Home() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="home-hero">
        <DuksungLogo size={72} className="hero-logo" />
        <h1>
          마음이 힘들 때,<br />
          <span>마음봄</span>이 함께해요
        </h1>
        <p>
          덕성여대 학우 여러분의 정신건강을 위한 공간입니다.
          언제든지 편하게 찾아와 마음을 돌봐주세요.
        </p>
        <div className="hero-btns">
          <Link to="/survey" className="btn btn-primary btn-lg">
            자가진단 시작하기
          </Link>
          <Link to="/diary" className="btn btn-secondary btn-lg">
            감정 기록하기
          </Link>
        </div>
      </section>

      {/* Features */}
      <p className="section-title">🌿 무엇을 도와드릴까요?</p>
      <div className="feature-grid">
        {FEATURES.map((f) => (
          <Link key={f.to} to={f.to} className={`feature-card ${f.cls}`}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <span className="feature-link">
              시작하기 →
            </span>
          </Link>
        ))}
      </div>

      {/* Notice */}
      <div className="notice-card">
        <span className="notice-icon">💜</span>
        <div>
          <h4>이 서비스에 대해</h4>
          <p>
            마음봄은 전문 의료 서비스가 아닙니다. 자가진단 결과는 참고용이며,
            전문적인 진단과 치료를 대체할 수 없어요. 심각한 증상이 있다면
            반드시 전문가의 도움을 받으세요. 모든 데이터는 여러분의 기기에만 저장됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
