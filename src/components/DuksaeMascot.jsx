import { useState } from 'react'
import selfCompassionMessages from '../data/selfCompassion'

function getRandomMessage(exclude = null) {
  const pool = exclude
    ? selfCompassionMessages.filter((m) => m.id !== exclude.id)
    : selfCompassionMessages
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function DuksaeMascot() {
  const [popup, setPopup] = useState({ visible: false, message: null })

  function handleClick() {
    setPopup({ visible: true, message: getRandomMessage() })
  }

  function handleNext() {
    setPopup((prev) => ({ visible: true, message: getRandomMessage(prev.message) }))
  }

  function handleClose() {
    setPopup({ visible: false, message: null })
  }

  return (
    <>
      {/* 덕새 마스코트 버튼 */}
      <button
        className="duksae-btn"
        onClick={handleClick}
        aria-label="덕새에게 응원받기"
        title="덕새에게 응원받기"
      >
        <svg
          width="72"
          height="80"
          viewBox="0 0 110 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="duksae-bounce"
        >
          {/* 몸통 */}
          <ellipse cx="55" cy="80" rx="30" ry="26" fill="white" stroke="#3D1C26" strokeWidth="1.8" />

          {/* 머리 */}
          <circle cx="55" cy="46" r="22" fill="white" stroke="#3D1C26" strokeWidth="1.8" />

          {/* 머리 위 뿔/술 장식 */}
          <circle cx="49" cy="25" r="4" fill="white" stroke="#3D1C26" strokeWidth="1.5" />
          <circle cx="61" cy="23" r="4" fill="white" stroke="#3D1C26" strokeWidth="1.5" />

          {/* 왼쪽 날개 (아래 방향) */}
          <ellipse
            cx="26"
            cy="82"
            rx="13"
            ry="8"
            fill="#B70050"
            stroke="#3D1C26"
            strokeWidth="1.4"
            transform="rotate(-30 26 82)"
          />

          {/* 오른쪽 날개 (위로 들린 형태) */}
          <ellipse
            cx="84"
            cy="68"
            rx="13"
            ry="8"
            fill="#B70050"
            stroke="#3D1C26"
            strokeWidth="1.4"
            transform="rotate(40 84 68)"
          />

          {/* 오른쪽 날개 노란 지팡이 선 */}
          <line x1="88" y1="62" x2="100" y2="48" stroke="#FFC72C" strokeWidth="2.5" strokeLinecap="round" />
          {/* 지팡이 끝 버건디 동그라미 */}
          <circle cx="100" cy="47" r="4" fill="#B70050" stroke="#3D1C26" strokeWidth="1.2" />

          {/* 볼 블러시 왼쪽 */}
          <ellipse cx="39" cy="52" rx="6" ry="4" fill="#F9A8C4" opacity="0.6" />
          {/* 볼 블러시 오른쪽 */}
          <ellipse cx="71" cy="52" rx="6" ry="4" fill="#F9A8C4" opacity="0.6" />

          {/* 눈썹 (약간 인상 쓴 곡선) */}
          <path d="M44 38 Q47 35 50 37" stroke="#3D1C26" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M60 37 Q63 35 66 38" stroke="#3D1C26" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* 눈 (curved arc 웃음눈) */}
          <path d="M43 44 Q47 48 51 44" stroke="#3D1C26" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M59 44 Q63 48 67 44" stroke="#3D1C26" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* 가슴 무궁화 배지 - 8개 버건디 타원 꽃잎 */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const cx = 55 + Math.cos(rad) * 6
            const cy = 80 + Math.sin(rad) * 6
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="3.5"
                ry="2"
                fill="#B70050"
                transform={`rotate(${angle} ${cx} ${cy})`}
                opacity="0.9"
              />
            )
          })}
          {/* 배지 중앙 원 */}
          <circle cx="55" cy="80" r="4" fill="#B70050" stroke="white" strokeWidth="0.8" />
          {/* 배지 흰 'D' 텍스트 */}
          <text
            x="55"
            y="83"
            textAnchor="middle"
            fill="white"
            fontSize="5"
            fontWeight="800"
            fontFamily="serif"
          >
            D
          </text>

          {/* 다리 왼쪽 */}
          <rect x="44" y="103" width="8" height="12" rx="2" fill="#3D1C26" />
          {/* 다리 오른쪽 */}
          <rect x="58" y="103" width="8" height="12" rx="2" fill="#3D1C26" />
        </svg>
      </button>

      {/* 팝업 */}
      {popup.visible && popup.message && (
        <div className="duksae-popup-overlay" onClick={handleClose}>
          <div
            className="duksae-popup"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="자기자비 메시지"
          >
            <span className="duksae-popup-theme">{popup.message.theme}</span>
            <p className="duksae-popup-message">{popup.message.text}</p>
            <div className="duksae-popup-actions">
              <button className="btn btn-primary btn-sm" onClick={handleNext}>
                다른 문구 💫
              </button>
              <button className="btn btn-ghost btn-sm" onClick={handleClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
