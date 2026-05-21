import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PHQ9_TITLE, PHQ9_DESC, PHQ9_QUESTIONS, ANSWER_OPTIONS, getPHQ9Result,
} from '../data/phq9'
import { GAD7_TITLE, GAD7_DESC, GAD7_QUESTIONS, getGAD7Result } from '../data/gad7'

const TABS = [
  { id: 'phq9', label: 'PHQ-9 우울증' },
  { id: 'gad7', label: 'GAD-7 불안' },
]

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
    const result = surveyId === 'phq9' ? getPHQ9Result(score) : getGAD7Result(score)
    onResult({ score, result, surveyId })

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
      <span className="survey-period">지난 2주 동안을 기준으로 응답해 주세요</span>

      <div className="survey-progress">
        <div className="survey-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="survey-progress-text">
        {answered} / {total} 완료
      </p>

      {questions.map((q, idx) => (
        <div className="question-card" key={idx}>
          <p className="question-number">질문 {idx + 1}</p>
          {idx === 8 && surveyId === 'phq9' && (
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
                  {opt.label}
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
    </div>
  )
}

function ResultCard({ score, result, surveyId, onReset }) {
  const isCrisis = surveyId === 'phq9' && score >= 15

  return (
    <div>
      <div className={`result-card ${result.color}`}>
        <span className="result-emoji">{result.emoji}</span>
        <p className="result-score">총점 {score}점 / {surveyId === 'phq9' ? 27 : 21}점</p>
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

      {isCrisis && (
        <div className="crisis-alert">
          <h4>🆘 지금 즉각적인 도움이 필요해요</h4>
          <p>혼자 견디지 않아도 됩니다. 지금 바로 연락해 주세요.</p>
          <p className="crisis-tel">1393</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            자살예방상담전화 (24시간 무료)
          </p>
        </div>
      )}
    </div>
  )
}

export default function Survey() {
  const [activeTab, setActiveTab] = useState('phq9')
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

  const isPhq9 = activeTab === 'phq9'

  return (
    <div className="page">
      <div className="survey-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`survey-tab${activeTab === t.id ? ' active' : ''}`}
            onClick={() => handleTabChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {result ? (
        <ResultCard
          score={result.score}
          result={result.result}
          surveyId={result.surveyId}
          onReset={handleReset}
        />
      ) : (
        <SurveyForm
          key={`${activeTab}-${key}`}
          surveyId={activeTab}
          questions={isPhq9 ? PHQ9_QUESTIONS : GAD7_QUESTIONS}
          title={isPhq9 ? PHQ9_TITLE : GAD7_TITLE}
          desc={isPhq9 ? PHQ9_DESC : GAD7_DESC}
          onResult={setResult}
        />
      )}
    </div>
  )
}
