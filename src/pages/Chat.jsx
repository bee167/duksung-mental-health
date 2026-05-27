import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection, addDoc, deleteDoc, doc,
  query, orderBy, limitToLast, onSnapshot,
  serverTimestamp, where, getDocs, Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

/* ── 닉네임 풀 ── */
const NICKNAMES = [
  '따뜻한 버들송이', '포근한 델파이', '오늘의 무궁화',
  '조용한 진달래', '수줍은 목련', '햇살 머금은 솔',
  '지친 버들송이', '토닥토닥 델파이', '맑은 하늘 채송화', '바람결 민들레',
]

const STORAGE_USER = 'chat_user_id'
const STORAGE_NICK = 'chat_nickname'

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

function formatTime(ts) {
  /* Firestore serverTimestamp는 처음엔 null일 수 있으므로 방어 처리 */
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

/* 10분 이상 된 stale presence 정리 */
async function cleanStalePresence() {
  const cutoff = Timestamp.fromMillis(Date.now() - 10 * 60 * 1000)
  const q = query(collection(db, 'presence'), where('joinedAt', '<', cutoff))
  const snap = await getDocs(q)
  snap.forEach((d) => deleteDoc(d.ref))
}

export default function Chat() {
  const [user]     = useState(initUser)
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [onlineCount, setOnlineCount] = useState(null)
  const [reportId, setReportId] = useState(null)
  const [reported, setReported] = useState(new Set())
  const [sending, setSending]   = useState(false)

  const bottomRef    = useRef(null)
  const holdTimer    = useRef(null)
  const presenceRef  = useRef(null)   // 내 presence 문서 ref
  const inputRef     = useRef(null)
  const navigate     = useNavigate()

  /* ── 자동 스크롤 ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ── 실시간 메시지 수신 ── */
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc'),
      limitToLast(100)
    )
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  /* ── Presence (실시간 접속자 수) ── */
  useEffect(() => {
    let myPresenceId = null

    async function join() {
      /* 오래된 presence 정리 */
      await cleanStalePresence()

      /* 내 presence 등록 */
      const pdoc = await addDoc(collection(db, 'presence'), {
        userId: user.uid,
        joinedAt: serverTimestamp(),
      })
      myPresenceId = pdoc.id
      presenceRef.current = pdoc.id
    }

    /* presence 컬렉션 실시간 감지 → 접속자 수 */
    const unsub = onSnapshot(collection(db, 'presence'), (snap) => {
      setOnlineCount(snap.size)
    })

    join()

    /* 탭 닫기 / 새로고침 시 presence 삭제 */
    function handleUnload() {
      if (presenceRef.current) {
        /* sendBeacon은 동기적으로 전송되어 탭 닫혀도 실행됨 — Firestore는 직접 지원 안 해
           대신 React cleanup에서 deleteDoc 호출로 처리 */
        deleteDoc(doc(db, 'presence', presenceRef.current))
      }
    }
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      unsub()
      window.removeEventListener('beforeunload', handleUnload)
      if (presenceRef.current) {
        deleteDoc(doc(db, 'presence', presenceRef.current))
        presenceRef.current = null
      }
    }
  }, [user.uid])

  /* ── 메시지 전송 ── */
  async function sendMessage() {
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    setInput('')
    try {
      await addDoc(collection(db, 'messages'), {
        text,
        nickname: user.nick,
        userId: user.uid,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      console.error('전송 실패:', err)
      setInput(text)   // 실패 시 입력창 복원
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

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
        <button
          className="chat-back-btn"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ‹
        </button>
        <div className="chat-header-center">
          <p className="chat-title">마음 나누기</p>
          {onlineCount !== null && (
            <p className="chat-online">
              현재 <strong>{onlineCount}명</strong>의 학우가 대화 중이에요 🍀
            </p>
          )}
        </div>
        <p className="chat-my-nick">{user.nick}</p>
      </div>

      {/* 메시지 목록 */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <p>아직 대화가 없어요.</p>
            <p>먼저 따뜻한 말을 건네보세요 🌸</p>
          </div>
        )}
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
            disabled={sending}
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || sending}
            aria-label="전송"
          >
            {sending ? '…' : '➤'}
          </button>
        </div>
      </div>
    </div>
  )
}
