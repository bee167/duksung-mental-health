import { useState } from 'react'
import { Link } from 'react-router-dom'
import ParticipantModal from '../components/ParticipantModal'

function IconSurvey() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1.5" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}

function IconDiary() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="13" y2="13" />
    </svg>
  )
}

function IconCounsel() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="12" y2="14" />
    </svg>
  )
}

const FEATURES = [
  {
    Icon: IconSurvey,
    title: '자가진단',
    desc: '우울·불안·스트레스 척도로 마음 상태를 확인해요.',
    to: '/survey',
    cls: 'fc-survey',
    iconBg: 'rgba(223,182,178,0.15)',
    iconColor: '#DFB6B2',
  },
  {
    Icon: IconDiary,
    title: '감정일기',
    desc: '매일의 감정을 기록해요.',
    to: '/diary',
    cls: 'fc-diary',
    iconBg: 'rgba(168,112,144,0.18)',
    iconColor: '#A87090',
  },
  {
    Icon: IconCounsel,
    title: '상담 연결',
    desc: '학생상담센터 및 긴급 연락처를 안내해요.',
    to: '/counseling',
    cls: 'fc-counsel',
    iconBg: 'rgba(133,79,108,0.18)',
    iconColor: '#854F6C',
  },
]

export default function Home() {
  const [noticeOpen, setNoticeOpen] = useState(false)

  return (
    <div className="page">
      <ParticipantModal />

      {/* Hero — 로고 제거, 문구 압축, 버튼 위계 명확화 */}
      <section className="home-hero">
        <h1>
          마음이 힘들 때,<br />
          <span>마음봄</span>이 함께해요
        </h1>
        <p>덕성여대 학우를 위한 정신건강 케어 공간이에요.</p>
        <div className="hero-btns">
          <Link to="/survey" className="btn btn-primary btn-lg">
            자가진단 시작하기
          </Link>
          <Link to="/diary" className="btn btn-secondary btn-lg">
            감정 기록하기
          </Link>
        </div>
      </section>

      {/* Features — survey 전폭 + 하단 2열 */}
      <p className="section-title">🌿 무엇을 도와드릴까요?</p>
      <div className="feature-grid">
        {FEATURES.map((f) => (
          <Link key={f.to} to={f.to} className={`feature-card ${f.cls}`}>
            <div
              className="feature-icon-wrap"
              style={{ background: f.iconBg, color: f.iconColor }}
            >
              <f.Icon />
            </div>
            <div className="feature-card-body">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
            <span className="feature-link">시작하기 →</span>
          </Link>
        ))}
      </div>

      {/* Notice — 접기/펼치기 */}
      <div className="notice-card">
        <span className="notice-icon">💜</span>
        <div style={{ flex: 1 }}>
          <h4>이 서비스에 대해</h4>
          <p>
            참고용 서비스로, 전문 의료를 대체할 수 없어요.{' '}
            {!noticeOpen && (
              <button className="notice-expand-btn" onClick={() => setNoticeOpen(true)}>
                자세히 보기
              </button>
            )}
          </p>
          {noticeOpen && (
            <p style={{ marginTop: '0.4rem' }}>
              심각한 증상이 있다면 반드시 전문가의 도움을 받으세요.
              모든 데이터는 여러분의 기기에만 저장됩니다.{' '}
              <button className="notice-expand-btn" onClick={() => setNoticeOpen(false)}>
                접기
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Survey Banner */}
      <div className="survey-banner">
        <div className="survey-banner-text">
          <span className="survey-banner-icon">📝</span>
          <div>
            <h4>마음봄 만족도 조사</h4>
            <p>서비스 개선을 위해 소중한 의견을 들려주세요. 1분이면 충분해요!</p>
          </div>
        </div>
        <a
          href="https://forms.gle/ywnBXNLURF1kUNtk7"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sage survey-banner-btn"
        >
          참여하기 →
        </a>
      </div>
    </div>
  )
}
