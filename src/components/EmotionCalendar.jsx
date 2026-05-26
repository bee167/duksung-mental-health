import { useState } from 'react'

const MOOD_COLORS = {
  '😊': '#FBE4D8',
  '😌': '#DFB6B2',
  '💗': '#DFB6B2',
  '😐': '#854F6C',
  '😔': '#522B5B',
  '😢': '#3A1650',
  '😰': 'rgba(168,100,130,0.75)',
  '😤': 'rgba(208,128,128,0.65)',
  '😴': '#3D1A5C',
}

const MOOD_LABELS = {
  '😊': '행복',
  '😌': '평온',
  '💗': '설렘',
  '😐': '보통',
  '😔': '슬픔',
  '😢': '많이슬픔',
  '😰': '불안',
  '😤': '화남',
  '😴': '피곤',
}

const LEGEND = [
  { emoji: '😊', label: '행복', color: '#FBE4D8' },
  { emoji: '😌', label: '평온', color: '#DFB6B2' },
  { emoji: '😐', label: '보통', color: '#854F6C' },
  { emoji: '😔', label: '슬픔', color: '#522B5B' },
  { emoji: '😰', label: '불안', color: 'rgba(168,100,130,0.75)' },
  { emoji: '😤', label: '화남', color: 'rgba(208,128,128,0.65)' },
  { emoji: '😴', label: '피곤', color: '#3D1A5C' },
]

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function EmotionCalendar({ entries }) {
  const now = new Date()
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const entryMap = {}
  entries.forEach((e) => { entryMap[e.date] = e })

  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ day: d, date: dateStr, entry: entryMap[dateStr] ?? null })
  }

  const isCurrentMonth =
    year === now.getFullYear() && month === now.getMonth()

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }
  function nextMonth() {
    if (!isCurrentMonth) setViewDate(new Date(year, month + 1, 1))
  }

  const filledCount = cells.filter((c) => c?.entry).length

  return (
    <div className="emo-cal">
      <div className="emo-cal-header">
        <button className="emo-cal-nav" onClick={prevMonth} aria-label="이전 달">‹</button>
        <div style={{ textAlign: 'center' }}>
          <p className="emo-cal-title">🗓️ {year}년 {month + 1}월 감정 달력</p>
          {filledCount > 0 && (
            <p className="emo-cal-subtitle">{filledCount}일 기록됨</p>
          )}
        </div>
        <button
          className="emo-cal-nav"
          onClick={nextMonth}
          disabled={isCurrentMonth}
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="emo-cal-weekdays">
        {WEEKDAYS.map((d) => (
          <span key={d} className="emo-cal-weekday">{d}</span>
        ))}
      </div>

      <div className="emo-cal-grid">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`e-${i}`} className="emo-cal-cell empty" />
          const color = cell.entry ? MOOD_COLORS[cell.entry.mood] : undefined
          return (
            <div
              key={cell.date}
              className={[
                'emo-cal-cell',
                cell.entry ? 'has-entry' : '',
                cell.date === today ? 'today' : '',
              ].join(' ').trim()}
              style={color ? { background: color } : undefined}
              title={cell.entry
                ? `${month + 1}/${cell.day} ${MOOD_LABELS[cell.entry.mood]}`
                : `${month + 1}/${cell.day}`}
            >
              {cell.day}
            </div>
          )
        })}
      </div>

      {filledCount === 0 && (
        <p className="emo-cal-empty-hint">이번 달 기록이 아직 없어요 ✦</p>
      )}

      <div className="emo-cal-legend">
        {LEGEND.map((l) => (
          <span key={l.emoji} className="emo-cal-legend-item">
            <span className="emo-cal-legend-dot" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}
