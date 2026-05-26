import { useState, useEffect } from 'react'
import EmotionCalendar from '../components/EmotionCalendar'

const MOODS = [
  { emoji: '😊', label: '행복해요' },
  { emoji: '😌', label: '평온해요' },
  { emoji: '💗', label: '설레요' },
  { emoji: '😐', label: '그저 그래요' },
  { emoji: '😔', label: '슬퍼요' },
  { emoji: '😢', label: '많이 슬퍼요' },
  { emoji: '😰', label: '불안해요' },
  { emoji: '😤', label: '화나요' },
  { emoji: '😴', label: '피곤해요' },
]

const STORAGE_KEY = 'diary_entries'

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

export default function Diary() {
  const [entries, setEntries] = useState(loadEntries)
  const [date, setDate] = useState(today())
  const [mood, setMood] = useState(null)
  const [content, setContent] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  function handleSave() {
    if (!mood || !content.trim()) return

    const newEntry = {
      id: Date.now(),
      date,
      mood: mood.emoji,
      moodLabel: mood.label,
      content: content.trim(),
    }

    setEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== date)
      return [newEntry, ...filtered].sort((a, b) => b.date.localeCompare(a.date))
    })

    setMood(null)
    setContent('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleDelete(id) {
    if (!window.confirm('이 일기를 삭제할까요?')) return
    setEntries((prev) => prev.filter((e) => e.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  function toggleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const canSave = mood && content.trim().length > 0

  return (
    <div className="page">
      {/* New Entry Form */}
      <div className="diary-form">
        <h2>✏️ 오늘의 감정 기록</h2>

        {saved && (
          <div style={{
            background: 'var(--sage-pale)',
            border: '1.5px solid var(--sage-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            color: 'var(--sage)',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}>
            ✅ 일기가 저장되었어요!
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="diary-date">📅 날짜</label>
          <input
            id="diary-date"
            type="date"
            className="date-input"
            value={date}
            max={today()}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <p className="form-label">오늘 기분이 어떠세요?</p>
          <div className="mood-grid">
            {MOODS.map((m) => (
              <button
                key={m.emoji}
                className={`mood-btn${mood?.emoji === m.emoji ? ' selected' : ''}`}
                onClick={() => setMood(m)}
                type="button"
              >
                <span className="mood-emoji-lg">{m.emoji}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="diary-content">
            💭 오늘의 이야기
          </label>
          <textarea
            id="diary-content"
            className="diary-textarea"
            placeholder="오늘 하루 어떤 일이 있었나요? 어떤 감정을 느꼈나요? 자유롭게 써보세요 😊"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>

        <div className="diary-actions">
          <button
            className="btn btn-ghost"
            onClick={() => { setMood(null); setContent('') }}
            type="button"
          >
            초기화
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!canSave}
            type="button"
          >
            {canSave ? '일기 저장하기 💾' : '기분과 내용을 입력해주세요'}
          </button>
        </div>
      </div>

      {/* Emotion Calendar */}
      <EmotionCalendar entries={entries} />

      {/* Entry List */}
      <div className="diary-list">
        <h3>📖 나의 감정 기록 ({entries.length}개)</h3>

        {entries.length === 0 ? (
          <div className="diary-empty">
            <span className="diary-empty-icon">📔</span>
            <p>아직 기록이 없어요.</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>
              위에서 오늘의 감정을 기록해보세요 🌸
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div className="entry-card" key={entry.id}>
              <div
                className="entry-header"
                onClick={() => toggleExpand(entry.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleExpand(entry.id)}
              >
                <span className="entry-mood-badge">{entry.mood}</span>
                <div className="entry-meta">
                  <p className="entry-date">{formatDate(entry.date)}</p>
                  <p className="entry-mood-label">{entry.moodLabel}</p>
                  {expandedId !== entry.id && (
                    <p className="entry-preview">{entry.content}</p>
                  )}
                </div>
                <span className="entry-toggle">
                  {expandedId === entry.id ? '▲' : '▼'}
                </span>
              </div>

              {expandedId === entry.id && (
                <div className="entry-body">
                  <p className="entry-content">{entry.content}</p>
                  <div className="entry-footer">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleDelete(entry.id)}
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
