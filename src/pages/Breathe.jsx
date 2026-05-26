import { useState, useEffect } from 'react'

const TECHNIQUES = {
  box: {
    name: '박스 호흡',
    desc: '집중력 향상',
    emoji: '🔲',
    phases: [
      { id: 'inhale', label: '들이쉬기', duration: 4, scale: 1.35 },
      { id: 'hold1', label: '참기', duration: 4, scale: 1.35 },
      { id: 'exhale', label: '내쉬기', duration: 4, scale: 0.65 },
      { id: 'hold2', label: '참기', duration: 4, scale: 0.65 },
    ],
  },
  relax: {
    name: '4-7-8 호흡',
    desc: '불안 완화',
    emoji: '🌙',
    phases: [
      { id: 'inhale', label: '들이쉬기', duration: 4, scale: 1.35 },
      { id: 'hold', label: '참기', duration: 7, scale: 1.35 },
      { id: 'exhale', label: '내쉬기', duration: 8, scale: 0.65 },
    ],
  },
  calm: {
    name: '편안한 호흡',
    desc: '긴장 완화',
    emoji: '🌿',
    phases: [
      { id: 'inhale', label: '들이쉬기', duration: 5, scale: 1.35 },
      { id: 'exhale', label: '내쉬기', duration: 5, scale: 0.65 },
    ],
  },
}

const HOLD_IDS = new Set(['hold', 'hold1', 'hold2'])

const ORB_COLORS = {
  inhale: 'rgba(251,228,216,0.22)',
  hold: 'rgba(223,182,178,0.18)',
  hold1: 'rgba(223,182,178,0.18)',
  hold2: 'rgba(133,79,108,0.20)',
  exhale: 'rgba(96,43,104,0.22)',
}

const GUIDE_TEXT = {
  inhale: '코로 천천히 들이쉬세요',
  hold: '숨을 참으세요',
  hold1: '숨을 참으세요',
  hold2: '숨을 참으세요',
  exhale: '입으로 천천히 내쉬세요',
}

export default function Breathe() {
  const [technique, setTechnique] = useState('box')
  const [isRunning, setIsRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [count, setCount] = useState(TECHNIQUES.box.phases[0].duration)
  const [cycles, setCycles] = useState(0)

  const phases = TECHNIQUES[technique].phases
  const currentPhase = phases[phaseIdx]
  const isHold = HOLD_IDS.has(currentPhase.id)

  useEffect(() => {
    if (!isRunning) return
    if (count > 1) {
      const t = setTimeout(() => setCount((c) => c - 1), 1000)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      const next = (phaseIdx + 1) % phases.length
      if (next === 0) setCycles((c) => c + 1)
      setPhaseIdx(next)
      setCount(phases[next].duration)
    }, 1000)
    return () => clearTimeout(t)
  }, [isRunning, count, phaseIdx, phases])

  function handleStart() {
    setPhaseIdx(0)
    setCount(phases[0].duration)
    setCycles(0)
    setIsRunning(true)
  }

  function handleStop() {
    setIsRunning(false)
    setPhaseIdx(0)
    setCount(phases[0].duration)
  }

  function handleTechChange(key) {
    if (isRunning) handleStop()
    setTechnique(key)
    setPhaseIdx(0)
    setCount(TECHNIQUES[key].phases[0].duration)
    setCycles(0)
  }

  const scale = isRunning ? currentPhase.scale : 0.85
  const transDur = isRunning ? (isHold ? 0.4 : currentPhase.duration - 0.2) : 0.6

  return (
    <div className="breathe-page">
      {/* Stars overlay */}
      <div className="breathe-stars" aria-hidden="true" />

      {/* Technique chips */}
      <div className="breathe-techniques">
        {Object.entries(TECHNIQUES).map(([key, tech]) => (
          <button
            key={key}
            className={`breathe-chip${technique === key ? ' active' : ''}`}
            onClick={() => handleTechChange(key)}
          >
            <span className="breathe-chip-name">{tech.emoji} {tech.name}</span>
            <span className="breathe-chip-desc">{tech.desc}</span>
          </button>
        ))}
      </div>

      {/* Center orb area */}
      <div className="breathe-center">
        {cycles > 0 && (
          <p className="breathe-cycles">{cycles}회 완료 ✨</p>
        )}

        <div className="breathe-orb-wrap">
          <div
            className="breathe-ring"
            style={{
              transform: `scale(${scale * 1.18})`,
              transition: `transform ${transDur}s cubic-bezier(0.45,0,0.25,1)`,
            }}
            aria-hidden="true"
          />
          <div
            className="breathe-orb"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${transDur}s cubic-bezier(0.45,0,0.25,1), background ${transDur * 0.5}s ease`,
              background: isRunning
                ? `radial-gradient(circle, ${ORB_COLORS[currentPhase.id]} 0%, transparent 70%)`
                : 'radial-gradient(circle, rgba(251,228,216,0.12) 0%, transparent 70%)',
            }}
          >
            {isRunning ? (
              <>
                <span className="breathe-count">{count}</span>
                <span className="breathe-phase-label">{currentPhase.label}</span>
              </>
            ) : (
              <span className="breathe-idle-text">호흡</span>
            )}
          </div>
        </div>

        {isRunning && (
          <p className="breathe-guide">{GUIDE_TEXT[currentPhase.id]}</p>
        )}
      </div>

      {/* Controls */}
      <div className="breathe-controls">
        {!isRunning ? (
          <button className="breathe-btn-start" onClick={handleStart}>
            ▶&nbsp; 시작하기
          </button>
        ) : (
          <button className="breathe-btn-stop" onClick={handleStop}>
            ■&nbsp; 멈추기
          </button>
        )}
      </div>

      {/* Phase dots */}
      {isRunning && (
        <div className="breathe-phase-dots" aria-label="호흡 단계">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`breathe-dot${i === phaseIdx ? ' active' : ''}`}
            />
          ))}
        </div>
      )}

      {/* Tips when idle */}
      {!isRunning && (
        <div className="breathe-tips">
          <p>편안한 자세로 앉아 눈을 감고 시작하세요.</p>
          <p>호흡에만 집중하며 마음을 비워보세요 🌙</p>
        </div>
      )}
    </div>
  )
}
