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

/* ── Pixel palette ── */
const C = {
  D: '#2A1208',
  S: '#7A3010',
  M: '#A04818',
  O: '#C86422',
  L: '#E08840',
  H: '#F0A858',
  W: '#FFFAF0',
  T: '#18B8B8',
  t: '#0E8888',
  K: '#E87890',
  _: null,
}

function PixelGrid({ map, px = 6, ox = 0, oy = 0 }) {
  const rects = []
  map.forEach((row, r) => {
    ;[...row].forEach((ch, col) => {
      const fill = C[ch]
      if (fill) rects.push(
        <rect key={`${r}-${col}`} x={ox + col * px} y={oy + r * px} width={px} height={px} fill={fill} />
      )
    })
  })
  return <>{rects}</>
}

/* Each row is 16 chars wide, px=6 → 96px wide */

const SIT = [
  '___DD______DD___',
  '__DMSD____DSMD__',
  '__DOMODS__DMOMD_',
  '_DOLOOOD_DOLOSD_',
  '_DOOOOOOOOOOOSD_',
  'DOOOTTOOOOTTOOOD',
  'DOOOtTOOOOtTOOOD',
  'DOOOOOKWKOOOOOoD',
  'DOOOODWWWDOOOOOD',
  '_DOSOSWWWOSOSSD_',
  '_DOOOOWWWOOOOSD_',
  '__DOOOOOOOOOOD__',
  '__DOSOSOOSOSD___',
  '__DOOOOOOOOOD___',
  '__DOOOWWWOOOOD__',
  '_DOOOWWWWWOOOOD_',
  '_DWWOWWWWWOWWWD_',
  '_DWWWWD___DWWWD_',
  '__DDDD_____DDDD_',
]

const SLEEP = [
  '________________',
  '_DD_____________',
  'DMSD____________',
  'DOMSD___________',
  'DOOOODDDDDDDDD__',
  'DSOOOOOOOOOOOSD_',
  'DOOOOOOOOOOOOOD_',
  '_DOODDOOOOOOOOD_',
  '_DOOOOOWWWOOOOD_',
  '_DOSOOWWWWWOOOD_',
  '__DOOOWWWWWOOSD_',
  '__DOOOOOOOOOOD__',
  '__DOOOOOOOOOD___',
  '_DOOOOOOOOOOOD__',
  '_DOWWOOOOOOWWOD_',
  'DWWWWD___DWWWWD_',
  'DWWWDD___DDWWWD_',
  '_DDDD_____DDDD__',
]

const ROLL = [
  '__DD______DD____',
  '_DMSD____DSMD___',
  'DOMOOD__DOOMOD__',
  'DOOOOODOOOOOMD__',
  'DOTTOOOOOTTOOD__',
  'DOtTOSOOOtTOOD__',
  'DOOOKWOOOOOOd___',
  '_DOOOWWWOOOOD___',
  '_DOOOOOOOOOOD___',
  '_DOSWWWWSOOOOD__',
  '_DOOOWWWOOOOOD__',
  '_DOOOOOOOOOOOD__',
  'DOOOOOOOOOOOOD__',
  'DOWWOOOOOOOWWD__',
  'DWWWWD__DOWWWOD_',
  '_DDDD___DOOOOD__',
  '________DOOOOD__',
  '_________DOoD___',
]

const CROUCH = [
  '_DD________DD___',
  'DSMD______DMSD__',
  'DOSOD____DOSD___',
  '_DOOOODDDOOOSD__',
  '_DOOOOOOOOOOSD__',
  'DOOTTOOOOTTOOOD_',
  'DOOtTODODtTOOOD_',
  'DOOOOKWKOOOOOOd_',
  'DOOOODWWWDOOOOOD',
  'DOSOSOWWWOOSOSED',
  '_DOOOOOOOOOOOOD_',
  '_DOOOOOOOOOOOSD_',
  '_DOOOWWWWWOOOOD_',
  'DOOOOWWWWWWOOOOD',
  'DOWWWWD___DWWWOD',
  'DWWDD_____DDWWWD',
  '_DD___________DD',
]

function ZzzText() {
  return (
    <>
      <text x="68" y="28" fontSize="11" fill="rgba(251,228,216,0.80)"
        fontWeight="bold" fontFamily="inherit"
        style={{ animation: 'zzz1 2.4s ease-in-out infinite' }}>z</text>
      <text x="78" y="16" fontSize="14" fill="rgba(251,228,216,0.62)"
        fontWeight="bold" fontFamily="inherit"
        style={{ animation: 'zzz1 2.4s ease-in-out infinite', animationDelay: '0.7s' }}>z</text>
      <text x="88" y="4" fontSize="17" fill="rgba(251,228,216,0.44)"
        fontWeight="bold" fontFamily="inherit"
        style={{ animation: 'zzz1 2.4s ease-in-out infinite', animationDelay: '1.4s' }}>Z</text>
    </>
  )
}

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
          viewBox="0 0 96 114"
          width="108"
          height="114"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: 'pixelated' }}
        >
          {catState === 'sit'    && <g className="cat-sit-idle"><PixelGrid map={SIT} oy={6} /></g>}
          {catState === 'sleep'  && <><PixelGrid map={SLEEP} oy={12} /><ZzzText /></>}
          {catState === 'roll'   && <g className="cat-rock"><PixelGrid map={ROLL} oy={6} /></g>}
          {catState === 'crouch' && <PixelGrid map={CROUCH} oy={6} />}
        </svg>
      </button>
      <p className="home-cat-label">{stateLabel[catState]}</p>
    </div>
  )
}
