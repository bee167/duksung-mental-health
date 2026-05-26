import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxa3K4EgVn4d6enGC_GCaCfLatbjs_Bsv84z46UnaJ3o6HugpZPnMvOxS71CX0TJGPn6w/exec'
const STORAGE_KEY = 'participantModalDone'

export default function ParticipantModal() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!agreed) return
    setStatus('submitting')
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(form),
      })
      setStatus('done')
      setTimeout(dismiss, 2500)
    } catch {
      dismiss()
    }
  }

  if (!visible) return null

  return (
    <div className="modal-overlay" onClick={dismiss}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {status === 'done' ? (
          <div className="modal-success">
            <span className="modal-success-icon">✅</span>
            <p>참여해 주셔서 감사해요!<br />추후 이메일로 설문 링크를 보내드릴게요.</p>
          </div>
        ) : (
          <>
            <h3 className="modal-title">📋 연구 참여자 모집</h3>
            <p className="modal-desc">
              마음봄 서비스 개선 연구에 참여하실 분을 모집합니다.
              이메일로 설문지를 보내드리며, 일부 분들께는 인터뷰를 요청드릴 수 있어요.
            </p>
            <form onSubmit={handleSubmit} className="modal-form">
              <label className="modal-label">
                <span>이름 <em className="required">*</em></span>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>
              <label className="modal-label">
                <span>이메일 <em className="required">*</em></span>
                <input
                  type="email"
                  placeholder="example@duksung.ac.kr"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </label>
              <label className="modal-label">
                <span>전화번호 <em className="optional">(선택)</em></span>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </label>
              <label className="modal-checkbox">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  <Link to="/privacy" onClick={dismiss}>개인정보 처리방침</Link>에 동의합니다
                </span>
              </label>
              <div className="modal-actions">
                <button
                  type="submit"
                  className="btn btn-sage"
                  disabled={!agreed || status === 'submitting'}
                >
                  {status === 'submitting' ? '제출 중…' : '참여하기'}
                </button>
                <button type="button" className="btn btn-ghost" onClick={dismiss}>
                  괜찮아요
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
