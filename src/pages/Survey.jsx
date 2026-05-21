import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NDS_TITLE, NDS_DESC, NDS_QUESTIONS, ANSWER_OPTIONS, getNDSResult } from '../data/nds'
import { NAS_TITLE, NAS_DESC, NAS_QUESTIONS, getNASResult } from '../data/nas'
import { NSS_TITLE, NSS_DESC, NSS_QUESTIONS, getNSSResult } from '../data/nss'

const TABS = [
  { id: 'nds', label: '우울 (NDS)', icon: '🌧' },
  { id: 'nas', label: '불안 (NAS)', icon: '💨' },
  { id: 'nss', label: '스트레스 (NSS)', icon: '⚡' },
]

const MAX_SCORES = { nds: 36, nas: 33, nss: 33 }

function SurveyForm({ questions, title, desc, surveyId, onResult }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))

  const answered = answers.filter((a) => a !== null).length
  const total = questions.length
  const progress = Math.round((answered / total) * 100)
  const allAnswered = answered === total

  function handleChange(idx, value) {
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = value
      return next
    })
  }

  function handleSubmit() {
    const score = answers.reduce((sum, v) => sum + v, 0)
    const result =
      surveyId === 'nds' ? getNDSResult(score) :
      surveyId === 'nas' ? getNASResult(score) :
      getNSSResult(score)
    onResult({ score, result, surveyId, answers })

    const history = JSON.parse(localStorage.getItem('survey_history') || '[]')
    history.unshift({
      id: Date.now(),
      type: surveyId,
      score,
      level: result.level,
      date: new Date().toLocaleDateString('ko-KR'),
    })
    localStorage.setItem('survey_history', JSON.stringify(history.slice(0, 20)))
  }

  return (
    <div>
      <div className="survey-header">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <span className="survey-period">최근 2주간의 상태를 기준으로 응답해 주세요</span>

      <div className="survey-progress">
        <div className="survey-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="survey-progress-text">
        {answered} / {total} 완료
      </p>

      {questions.map((q, idx) => (
        <div className="question-card" key={idx}>
          <p className="question-number">질문 {idx + 1}</p>
          {surveyId === 'nds' && idx === 2 && (
            <p className="question-9-note">
              ⚠️ 이 문항은 위기 상황과 관련된 내용입니다. 해당 생각이 있다면 즉시 전문가에게 도움을 요청해 주세요.
            </p>
          )}
          <p className="question-text">{q}</p>
          <div className="answer-options">
            {ANSWER_OPTIONS.map((opt) => (
              <label className="answer-option" key={opt.value}>
                <input
                  type="radio"
                  name={`q_${surveyId}_${idx}`}
                  value={opt.value}
                  checked={answers[idx] === opt.value}
                  onChange={() => handleChange(idx, opt.value)}
                />
                <span className="answer-label">
                  <span className="answer-dot" />
                  <span>
                    <span style={{ display: 'block' }}>{opt.label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{opt.sublabel}</span>
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="survey-actions">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
          disabled={!allAnswered}
        >
          {allAnswered ? '결과 확인하기' : `${total - answered}개 문항 남음`}
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
        본 척도는 국립정신건강센터가 개발한 한국인 정신건강 척도입니다. 결과는 참고용이며 전문적 진단을 대체하지 않습니다.
      </p>
    </div>
  )
}

function ResultCard({ score, result, surveyId, answers, onReset }) {
  const isCrisisScore = (surveyId === 'nds' && score >= 19) || (surveyId === 'nas' && score >= 25) || (surveyId === 'nss' && score >= 21)
  const hasSuicideThought = surveyId === 'nds' && answers && answers[2] > 0

  return (
    <div>
      <div className={`result-card ${result.color}`}>
        <span className="result-emoji">{result.emoji}</span>
        <p className="result-score">총점 {score}점 / {MAX_SCORES[surveyId]}점</p>
        <p className="result-level">{result.level}</p>
        <p className="result-desc">{result.description}</p>
        <div className="result-advice">
          <strong>💡 이렇게 해보세요</strong>
          {result.advice}
        </div>
        <div className="result-btns">
          <button className="btn btn-outline" onClick={onReset}>
            다시 검사하기
          </button>
          <Link to="/counseling" className="btn btn-sage">
            상담센터 보기
          </Link>
        </div>
      </div>

      {hasSuicideThought && (
        <div className="crisis-alert">
          <h4>🆘 지금 즉각적인 도움이 필요해요</h4>
          <p>죽고 싶다는 생각이 드신다면 혼자 견디지 않아도 됩니다. 지금 바로 연락해 주세요.</p>
          <p className="crisis-tel">1393</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            자살예방상담전화 (24시간 무료)
          </p>
        </div>
      )}

      {!hasSuicideThought && isCrisisScore && (
        <div className="crisis-alert">
          <h4>🆘 전문적인 도움이 필요한 상태예요</h4>
          <p>혼자 견디지 않아도 됩니다. 지금 바로 연락해 주세요.</p>
          <p className="crisis-tel">1577-0199</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            정신건강 위기상담전화 (24시간 무료)
          </p>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
        출처: 국립정신건강센터, 한국인 정신건강 척도 사용자 지침서 통합본 (2024)
      </p>
    </div>
  )
}

export default function Survey() {
  const [activeTab, setActiveTab] = useState('nds')
  const [result, setResult] = useState(null)
  const [key, setKey] = useState(0)

  function handleTabChange(tab) {
    setActiveTab(tab)
    setResult(null)
    setKey((k) => k + 1)
  }

  function handleReset() {
    setResult(null)
    setKey((k) => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tabData = {
    nds: { questions: NDS_QUESTIONS, title: NDS_TITLE, desc: NDS_DESC },
    nas: { questions: NAS_QUESTIONS, title: NAS_TITLE, desc: NAS_DESC },
    nss: { questions: NSS_QUESTIONS, title: NSS_TITLE, desc: NSS_DESC },
  }

  const current = tabData[activeTab]

  return (
    <div className="page">
      <div className="survey-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`survey-tab${activeTab === t.id ? ' active' : ''}`}
            onClick={() => handleTabChange(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {result ? (
        <ResultCard
          score={result.score}
          result={result.result}
          surveyId={result.surveyId}
          answers={result.answers}
          onReset={handleReset}
        />
      ) : (
        <SurveyForm
          key={`${activeTab}-${key}`}
          surveyId={activeTab}
          questions={current.questions}
          title={current.title}
          desc={current.desc}
          onResult={setResult}
        />
      )}
    </div>
  )
}
