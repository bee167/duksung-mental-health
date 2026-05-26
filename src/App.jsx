import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import DuksaeMascot from './components/DuksaeMascot'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Diary from './pages/Diary'
import Counseling from './pages/Counseling'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Breathe from './pages/Breathe'

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/counseling" element={<Counseling />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/breathe" element={<Breathe />} />
        </Routes>
      </main>
      <DuksaeMascot />
      <Footer />
    </div>
  )
}
