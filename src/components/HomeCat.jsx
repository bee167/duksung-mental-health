import { useState } from 'react'

const HIGH_STRESS = new Set([
  '중등도 수준', '중증 수준', '중등도 이상', '매우 높은 중증 수준',
])

const MSGS = [
  '오늘도 왔구냥 🐱',
  '밥은 먹었냥? 🍚',
  '힘들면 쉬어도 돼냥 💤',
  '너 오늘 잘 하고 있냥 ✨',
  '나 보러 온 거냥? 냥냥 💗',
]

function detectState() {
  try {
    const hist = JSON.parse(localStorage.getItem('survey_history') || '[]')
    if (hist.slice(0, 3).some((h) => HIGH_STRESS.has(h.level))) return 'crouch'
  } catch {}
  const h = new Date().getHours()
  if (h < 6) return 'sleep'
  if (h >= 18) return 'roll'
  return 'sit'
}

/* ── Color constants ── */
const C = {
  body:  '#F4C09A',
  ear:   '#F9B0C0',
  dark:  '#2A1818',
  nose:  '#F07098',
  shine: '#FFF8F5',
  toe:   '#E8907A',
  line:  'rgba(240,210,190,0.55)',
}

/* ── SVG cat sub-components ── */
function Ears({ flat = false }) {
  /* flat=true: ears angled back (stressed) */
  const lAngle = flat ? 'rotate(-18 28 26)' : ''
  const rAngle = flat ? 'rotate(18 92 26)'  : ''
  return (
    <>
      <polygon points="28,26 20,6 44,22" fill={C.body} transform={lAngle}/>
      <polygon points="92,26 100,6 76,22" fill={C.body} transform={rAngle}/>
      <polygon points="30,24 24,10 42,21" fill={C.ear}  transform={lAngle}/>
      <polygon points="90,24 96,10 78,21" fill={C.ear}  transform={rAngle}/>
    </>
  )
}

function Whiskers() {
  return (
    <>
      <line x1="44" y1="48" x2="18" y2="44" stroke={C.line} strokeWidth="1.2"/>
      <line x1="44" y1="52" x2="18" y2="55" stroke={C.line} strokeWidth="1.2"/>
      <line x1="76" y1="48" x2="102" y2="44" stroke={C.line} strokeWidth="1.2"/>
      <line x1="76" y1="52" x2="102" y2="55" stroke={C.line} strokeWidth="1.2"/>
    </>
  )
}

function EyesOpen({ wide = false }) {
  const ry = wide ? 8 : 6.5
  return (
    <>
      <ellipse cx="50" cy="40" rx="5" ry={ry} fill={C.dark}/>
      <ellipse cx="70" cy="40" rx="5" ry={ry} fill={C.dark}/>
      <circle  cx="52" cy="37" r="1.8"        fill={C.shine}/>
      <circle  cx="72" cy="37" r="1.8"        fill={C.shine}/>
    </>
  )
}

function EyesHappy() { /* half-closed blissful */
  return (
    <>
      <path d="M44,40 Q50,34 56,40" stroke={C.dark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M64,40 Q70,34 76,40" stroke={C.dark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </>
  )
}

function EyesClosed() {
  return (
    <>
      <path d="M44,39 Q50,44 56,39" stroke={C.dark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M64,39 Q70,44 76,39" stroke={C.dark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </>
  )
}

function NoseMouth({ flat = false }) {
  return (
    <>
      <path d="M57,47 L60,51 L63,47 Z" fill={C.nose}/>
      {flat
        ? <path d="M56,51 Q60,51 64,51" stroke="#D05880" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        : <path d="M57,51 Q60,56 63,51" stroke="#D05880" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      }
    </>
  )
}

function Paws() {
  return (
    <>
      <ellipse cx="36" cy="118" rx="15" ry="10" fill={C.body}/>
      <ellipse cx="84" cy="118" rx="15" ry="10" fill={C.body}/>
      <line x1="30" y1="122" x2="30" y2="127" stroke={C.toe} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="36" y1="123" x2="36" y2="128" stroke={C.toe} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="42" y1="122" x2="42" y2="127" stroke={C.toe} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="78" y1="122" x2="78" y2="127" stroke={C.toe} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="84" y1="123" x2="84" y2="128" stroke={C.toe} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="90" y1="122" x2="90" y2="127" stroke={C.toe} strokeWidth="1.5" strokeLinecap="round"/>
    </>
  )
}

/* ── State SVGs ── */
function CatSit() {
  return (
    <>
      <Ears/>
      <circle cx="60" cy="42" r="26" fill={C.body}/>
      {/* forehead stripes */}
      <path d="M52,25 Q57,21 62,25" stroke="#DDA07A" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round"/>
      <path d="M58,23 Q63,19 68,23" stroke="#DDA07A" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round"/>
      <ellipse cx="60" cy="94" rx="32" ry="28" fill={C.body}/>
      <EyesOpen/>
      <NoseMouth/>
      <Whiskers/>
      <Paws/>
      {/* Tail – wagging */}
      <path className="cat-tail" d="M92,100 Q112,80 100,58"
        stroke={C.body} strokeWidth="10" fill="none" strokeLinecap="round"/>
    </>
  )
}

function CatSleep() {
  return (
    <>
      {/* curled body */}
      <ellipse cx="65" cy="92" rx="40" ry="26" fill={C.body}/>
      {/* head tucked left */}
      <circle cx="26" cy="78" r="22" fill={C.body}/>
      <polygon points="12,65 7,50 22,62" fill={C.body}/>
      <polygon points="36,62 43,49 33,60" fill={C.body}/>
      <polygon points="13,63 9,52 21,61" fill={C.ear}/>
      <polygon points="36,61 41,51 33,59" fill={C.ear}/>
      {/* closed eyes */}
      <path d="M18,76 Q22,80 26,76" stroke={C.dark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M26,76 Q30,80 34,76" stroke={C.dark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* small nose */}
      <path d="M22,81 L25,84 L28,81 Z" fill={C.nose}/>
      {/* tail curled around */}
      <path d="M96,90 Q112,98 102,112 Q90,122 74,114"
        stroke={C.body} strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* ZZZ */}
      <text x="62" y="56" fontSize="13" fill="rgba(251,228,216,0.80)" fontWeight="bold" fontFamily="inherit"
        style={{ animation: 'zzz1 2.4s ease-in-out infinite' }}>z</text>
      <text x="73" y="40" fontSize="16" fill="rgba(251,228,216,0.62)" fontWeight="bold" fontFamily="inherit"
        style={{ animation: 'zzz1 2.4s ease-in-out infinite', animationDelay: '0.7s' }}>z</text>
      <text x="84" y="22" fontSize="20" fill="rgba(251,228,216,0.44)" fontWeight="bold" fontFamily="inherit"
        style={{ animation: 'zzz1 2.4s ease-in-out infinite', animationDelay: '1.4s' }}>Z</text>
    </>
  )
}

function CatRoll() {
  return (
    /* rocking animation via CSS on this group */
    <g className="cat-rock">
      <Ears/>
      <circle cx="60" cy="42" r="26" fill={C.body}/>
      <ellipse cx="60" cy="94" rx="32" ry="28" fill={C.body}/>
      {/* belly stripes */}
      <line x1="52" y1="84" x2="52" y2="108" stroke="#DDA07A" strokeWidth="1" opacity="0.28" strokeLinecap="round"/>
      <line x1="60" y1="82" x2="60" y2="110" stroke="#DDA07A" strokeWidth="1" opacity="0.28" strokeLinecap="round"/>
      <line x1="68" y1="84" x2="68" y2="108" stroke="#DDA07A" strokeWidth="1" opacity="0.28" strokeLinecap="round"/>
      <EyesHappy/>
      <NoseMouth/>
      <Whiskers/>
      <Paws/>
      {/* tail up */}
      <path d="M92,98 Q108,78 102,58"
        stroke={C.body} strokeWidth="10" fill="none" strokeLinecap="round"
        style={{ animation: 'cat-tail-sweep 1.8s ease-in-out infinite' }}/>
    </g>
  )
}

function CatCrouch() {
  return (
    <>
      <Ears flat/>
      <circle cx="60" cy="46" r="25" fill={C.body}/>
      {/* wider/lower body */}
      <ellipse cx="60" cy="100" rx="38" ry="22" fill={C.body}/>
      {/* worried brows */}
      <path d="M44,34 Q49,29 54,34" stroke={C.dark} strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round"/>
      <path d="M66,34 Q71,29 76,34" stroke={C.dark} strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round"/>
      <EyesOpen wide/>
      <NoseMouth flat/>
      <Whiskers/>
      {/* lower paws */}
      <ellipse cx="36" cy="120" rx="16" ry="9" fill={C.body}/>
      <ellipse cx="84" cy="120" rx="16" ry="9" fill={C.body}/>
      {/* tail low and curled */}
      <path d="M96,106 Q106,116 96,122 Q86,128 80,118"
        stroke={C.body} strokeWidth="9" fill="none" strokeLinecap="round"/>
    </>
  )
}

/* ── Main component ── */
export default function HomeCat() {
  const [msg, setMsg] = useState(null)
  const [catState] = useState(detectState)

  function handleTap() {
    const txt = MSGS[Math.floor(Math.random() * MSGS.length)]
    setMsg(txt)
    setTimeout(() => setMsg(null), 3200)
  }

  const stateLabel = {
    sleep:  '냥이가 자고 있어요 💤',
    roll:   '저녁엔 뒹굴뒹굴 🌙',
    crouch: '오늘 좀 힘들었냥... 💜',
    sit:    '탭해서 말 걸어봐요 🐾',
  }

  return (
    <div className="home-cat-section">
      <button
        className="home-cat-btn"
        onClick={handleTap}
        aria-label="고양이에게 말 걸기"
        type="button"
      >
        {msg && (
          <div className="home-cat-bubble">
            <span>{msg}</span>
            <div className="home-cat-bubble-tail"/>
          </div>
        )}
        <svg
          viewBox="0 0 120 132"
          width="96"
          height="106"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          {catState === 'sit'    && <CatSit/>}
          {catState === 'sleep'  && <CatSleep/>}
          {catState === 'roll'   && <CatRoll/>}
          {catState === 'crouch' && <CatCrouch/>}
        </svg>
      </button>
      <p className="home-cat-label">{stateLabel[catState]}</p>
    </div>
  )
}
