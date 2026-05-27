import { useState, useEffect, useRef, useCallback } from 'react'

/* ── 닉네임 풀 ── */
const NICKNAMES = [
  '따뜻한 버들송이', '포근한 델파이', '오늘의 무궁화',
  '조용한 진달래', '수줍은 목련', '햇살 머금은 솔',
  '지친 버들송이', '토닥토닥 델파이', '맑은 하늘 채송화', '바람결 민들레',
]

const STORAGE_USER   = 'chat_user_id'
const STORAGE_NICK   = 'chat_nickname'
const DUMMY_ONLINE   = Math.floor(Math.random() * 6) + 3  // 3~8명

/* ── 유저 초기화 ── */
function initUser() {
  let uid = localStorage.getItem(STORAGE_USER)
  if (!uid) {
    uid = crypto.randomUUID()
    localStorage.setItem(STORAGE_USER, uid)
  }
  let nick = localStorage.getItem(STORAGE_NICK)
  if (!nick) {
    nick = NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]
    localStorage.setItem(STORAGE_NICK, nick)
  }
  return { uid, nick }
}

/* ── 샘플 메시지 (첫 로드용) ── */
function seedMessages() {
  return [
    {
      id: '1',
      text: '안녕하세요 🌸 오늘 하루 어떠셨나요?',
      nickname: '맑은 하늘 채송화',
      userId: 'other-1',
      timestamp: Date.now() - 120000,
    },
    {
      id: '2',
      text: '힘든 일이 있었는데 여기 와서 좀 위로받고 싶었어요 💜',
      nickname: '조용한 진달래',
      userId: 'other-2',
      timestamp: Date.now() - 80000,
    },
    {
      id: '3',
      text: '함께라서 덜 외롭네요. 다들 잘 버티고 있어요 ✨',
      nickname: '포근한 델파이',
      userId: 'other-3',
      timestamp: Date.now() - 30000,
    },
  ]
}

function formatTime(ts) {
  const d = new Date(ts)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export default function Chat() {
  const [user]         = useState(initUser)
  const [messages, setMessages] = useState(seedMessages)
  const [input, setInput]       = useState('')
  const [reportId, setReportId] = useState(null)   // 신고 팝업 대상 메시지 id
  const [reported, setReported] = useState(new Set())
  const bottomRef  = useRef(null)
  const holdTimer  = useRef(null)
  const inputRef   = useRef(null)

  /* ── 자동 스크롤 ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ── 메시지 전송 ── */
  function sendMessage() {
    const text = input.trim()
    if (!text) return

    const newMsg = {
      id: crypto.randomUUID(),
      text,
      nickname: user.nick,
      userId: user.uid,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMsg])
    setInput('')
    inputRef.current?.focus()

    /* ── Firebase 연동 포인트 ──────────────────────────────────────────────
     * import { db } from '../firebase'
     * import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
     *
     * await addDoc(collection(db, 'messages'), {
     *   text:      newMsg.text,
     *   nickname:  newMsg.nickname,
     *   userId:    newMsg.userId,
     *   timestamp: serverTimestamp(),
     * })
     * setMessages 호출은 onSnapshot에서 자동 처리되므로 여기서는 제거
     * ─────────────────────────────────────────────────────────────────── */
  }

  /* ── 실시간 수신 (Firebase 연동 포인트) ────────────────────────────────
   * useEffect(() => {
   *   const q = query(
   *     collection(db, 'messages'),
   *     orderBy('timestamp', 'asc'),
   *     limitToLast(100)
   *   )
   *   const unsub = onSnapshot(q, (snap) => {
   *     setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
   *   })
   *   return () => unsub()
   * }, [])
   * ─────────────────────────────────────────────────────────────────── */

  /* ── 꾹 누르기 (신고 팝업) ── */
  const startHold = useCallback((id) => {
    holdTimer.current = setTimeout(() => setReportId(id), 500)
  }, [])

  const cancelHold = useCallback(() => {
    clearTimeout(holdTimer.current)
  }, [])

  function handleReport() {
    if (reportId) setReported((prev) => new Set([...prev, reportId]))
    setReportId(null)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-page">
      {/* 상단 헤더 */}
      <div className="chat-header">
        <p className="chat-online">현재 <strong>{DUMMY_ONLINE}명</strong>의 학우가 대화 중이에요 🍀</p>
        <p className="chat-my-nick">나의 닉네임: <strong>{user.nick}</strong></p>
      </div>

      {/* 메시지 목록 */}
      <div className="chat-messages">
        {messages.map((msg) => {
          const isMine = msg.userId === user.uid
          if (reported.has(msg.id)) return (
            <div key={msg.id} className="chat-reported-notice">신고된 메시지예요</div>
          )
          return (
            <div
              key={msg.id}
              className={`chat-row ${isMine ? 'mine' : 'theirs'}`}
              onTouchStart={() => !isMine && startHold(msg.id)}
              onTouchEnd={cancelHold}
              onMouseDown={() => !isMine && startHold(msg.id)}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
            >
              {!isMine && <p className="chat-nick">{msg.nickname}</p>}
              <div className="chat-bubble-row">
                <div className={`chat-bubble ${isMine ? 'bubble-mine' : 'bubble-theirs'}`}>
                  {msg.text}
                </div>
                <span className="chat-time">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* 신고 팝업 */}
      {reportId && (
        <div className="chat-report-overlay" onClick={() => setReportId(null)}>
          <div className="chat-report-box" onClick={(e) => e.stopPropagation()}>
            <p className="chat-report-title">이 메시지를 신고할까요?</p>
            <p className="chat-report-desc">부적절한 내용은 관리자가 검토해요.</p>
            <div className="chat-report-actions">
              <button className="btn btn-sage" onClick={handleReport}>신고하기</button>
              <button className="btn btn-ghost" onClick={() => setReportId(null)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 입력창 */}
      <div className="chat-input-area">
        <p className="chat-notice">💛 비방 대신 따뜻한 공감을 건네주세요</p>
        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-textarea"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={300}
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={!input.trim()}
            aria-label="전송"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}
