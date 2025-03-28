import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyDUQSelQOAkrlZsiwpgN9zTC52MUbmHNzA",
  authDomain: "ohmyfragrance-da34e.firebaseapp.com",
  projectId: "ohmyfragrance-da34e",
  storageBucket: "ohmyfragrance-da34e.appspot.com",
  messagingSenderId: "276821300191",
  appId: "1:276821300191:web:YOUR_APP_ID", // 実際のアプリIDに置き換える必要があります
}

// Firebaseの初期化（既に初期化されている場合は既存のインスタンスを使用）
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export { app, auth }

