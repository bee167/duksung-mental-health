import { Link } from 'react-router-dom'

const SERVICES = [
  '개인 심리상담 (비밀 보장)',
  '집단 상담 프로그램',
  '심리검사 (MMPI-2, SCL-90-R 등)',
  '위기 개입 상담',
  '정신건강 교육 프로그램',
  '진로·학업 스트레스 상담',
  '대인관계 상담',
]

const EMERGENCY = [
  {
    name: '자살예방상담전화',
    tel: '1393',
    desc: '24시간 무료',
  },
  {
    name: '정신건강 위기상담',
    tel: '1577-0199',
    desc: '24시간 무료',
  },
  {
    name: '청소년 전화',
    tel: '1388',
    desc: '24시간 무료',
  },
  {
    name: '여성긴급전화',
    tel: '1366',
    desc: '24시간 무료',
  },
]

const PROCEDURE = [
  { step: '01', title: '예약 신청', desc: '전화(02-901-8386) 또는 방문으로 상담 예약' },
  { step: '02', title: '접수 면접', desc: '상담사와 첫 만남으로 어려움과 상담 목표 파악 (약 50분)' },
  { step: '03', title: '상담 진행', desc: '개인 상황에 맞춘 상담 계획으로 정기 상담 진행' },
  { step: '04', title: '마무리', desc: '목표 달성 후 종결 또는 외부 기관 연계' },
]

export default function Counseling() {
  return (
    <div className="page">
      {/* Banner */}
      <div className="counseling-banner">
        <h1>
          도움을 요청하는 건<br />
          <span>용기 있는 일</span>이에요
        </h1>
        <p style={{ marginTop: '0.75rem' }}>
          덕성여대 학생상담센터와 다양한 지원 기관에서 여러분을 기다리고 있어요.
          혼자 힘들어하지 말고 손을 내밀어 주세요 💚
        </p>
      </div>

      {/* Info Grid */}
      <div className="info-grid">
        {/* 학생상담센터 기본 정보 */}
        <div className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon">🏫</span>
            <h3>덕성여대 학생상담센터</h3>
          </div>
          <div className="info-item">
            <span className="info-label">위치</span>
            <span className="info-value">학생회관 2층</span>
          </div>
          <div className="info-item">
            <span className="info-label">전화</span>
            <span className="info-value">
              <a href="tel:02-901-8386">02-901-8386</a>
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">운영</span>
            <span className="info-value">
              월~금 09:00 – 17:00<br />
              (점심 12:00 – 13:00 제외)
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">예약</span>
            <span className="info-value">전화 또는 방문 예약</span>
          </div>
          <div className="info-item">
            <span className="info-label">비용</span>
            <span className="info-value">재학생 전원 무료</span>
          </div>
        </div>

        {/* 제공 서비스 */}
        <div className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon">🌿</span>
            <h3>제공 서비스</h3>
          </div>
          <ul className="services-list">
            {SERVICES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* 상담 안내 */}
        <div className="info-card">
          <div className="info-card-header">
            <span className="info-card-icon">💬</span>
            <h3>이런 경우 상담받으세요</h3>
          </div>
          <ul className="services-list">
            {[
              '우울하거나 무기력함이 지속될 때',
              '불안과 걱정이 심해질 때',
              '대인관계가 어려울 때',
              '학업 스트레스가 극심할 때',
              '자해나 자살에 대한 생각이 들 때',
              '진로·미래에 대한 고민이 있을 때',
              '외로움이나 고립감을 느낄 때',
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* 비밀보장 안내 */}
        <div className="info-card" style={{ background: 'var(--rose-pale)', borderColor: 'var(--rose-pale2)' }}>
          <div className="info-card-header">
            <span className="info-card-icon">🔒</span>
            <h3>비밀이 완전히 보장돼요</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.7 }}>
            학생상담센터의 모든 상담 내용은 철저한 비밀이 보장됩니다.
            상담 사실이나 내용이 학교 어디에도 알려지지 않아요.
            안심하고 마음을 털어놓을 수 있는 공간입니다.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
            * 본인이나 타인의 생명이 위험한 경우에만 예외적으로 조치가 취해질 수 있습니다.
          </p>
        </div>
      </div>

      {/* 상담 절차 */}
      <div className="info-card" style={{ marginBottom: '1.5rem' }}>
        <div className="info-card-header">
          <span className="info-card-icon">📋</span>
          <h3>상담 절차</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
          {PROCEDURE.map((p) => (
            <div key={p.step} style={{
              background: 'var(--bg)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              textAlign: 'center',
            }}>
              <p style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                background: 'var(--sage)',
                color: 'white',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem',
              }}>{p.step}</p>
              <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '0.3rem' }}>{p.title}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 긴급 연락처 */}
      <div className="emergency-section">
        <h3>🆘 긴급 위기상담 연락처</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', marginBottom: '1rem' }}>
          즉각적인 도움이 필요할 때 언제든지 연락하세요. 모두 24시간, 무료로 운영됩니다.
        </p>
        <div className="emergency-grid">
          {EMERGENCY.map((e) => (
            <a key={e.tel} href={`tel:${e.tel}`} className="emergency-item" style={{ textDecoration: 'none' }}>
              <p className="emergency-name">{e.name}</p>
              <p className="emergency-tel">{e.tel}</p>
              <p className="emergency-desc">{e.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Self-help Tips */}
      <div className="info-card" style={{ marginBottom: '1.5rem' }}>
        <div className="info-card-header">
          <span className="info-card-icon">💡</span>
          <h3>스스로 마음 돌보기 팁</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { icon: '🌙', tip: '규칙적인 수면', desc: '매일 같은 시간에 자고 일어나기' },
            { icon: '🏃', tip: '가벼운 운동', desc: '하루 30분 산책이나 스트레칭' },
            { icon: '🍀', tip: '자연과 함께', desc: '햇볕을 쬐고 자연 속에서 쉬기' },
            { icon: '📝', tip: '감정 일기', desc: '매일 감정을 글로 표현해보기' },
            { icon: '👭', tip: '연결감 유지', desc: '친구나 가족과 대화 나누기' },
            { icon: '🎨', tip: '창의적 활동', desc: '그림, 음악, 취미로 표현하기' },
          ].map((item) => (
            <div key={item.tip} style={{
              background: 'var(--bg)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '0.15rem' }}>
                  {item.tip}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courage Card */}
      <div className="courage-card">
        <h3>🌸 당신은 혼자가 아니에요</h3>
        <p>
          힘든 시간을 혼자 버티려 하지 않아도 됩니다.
          도움을 요청하는 것은 약함이 아니라 용기입니다.
          마음봄과 덕성여대 상담센터가 항상 곁에 있을게요.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:02-901-8386" className="btn btn-sage">
            📞 상담센터 전화하기
          </a>
          <Link to="/survey" className="btn btn-secondary">
            자가진단 해보기
          </Link>
        </div>
      </div>
    </div>
  )
}
