export default function DuksungLogo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="덕성여자대학교 로고"
    >
      <circle cx="24" cy="24" r="23" fill="#7A0033" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="#E8799F" strokeWidth="1.2" />
      <path
        d="M14 18 Q24 10 34 18 L34 30 Q24 38 14 30 Z"
        fill="none"
        stroke="#C45080"
        strokeWidth="1"
        opacity="0.6"
      />
      <text
        x="24"
        y="21"
        textAnchor="middle"
        fill="#FFD0E4"
        fontSize="8"
        fontWeight="600"
        fontFamily="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif"
        letterSpacing="0.5"
      >
        덕성여자
      </text>
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="700"
        fontFamily="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif"
        letterSpacing="0.5"
      >
        대학교
      </text>
    </svg>
  )
}
