import { initializeApp } from 'firebase/app'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDEekEfomO0zx_fnD48gx5dFhe5FCRBVCA',
  authDomain: 'bee-d-754e5.firebaseapp.com',
  projectId: 'bee-d-754e5',
  storageBucket: 'bee-d-754e5.firebasestorage.app',
  messagingSenderId: '840697063612',
  appId: '1:840697063612:web:4fa0720ca9d8787eeb48b9',
  measurementId: 'G-2B2GFKQR89',
}

const app = initializeApp(firebaseConfig)

/* IndexedDB 영구 캐시 — 새로고침해도 이전 대화 즉시 표시, 멀티탭 지원 */
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
})
