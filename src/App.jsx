import React from 'react'
import { AuthProvider, useAuth } from './AuthContext'
import FollowerGoalTracker from './FollowerGoalTracker'
import Login from './Login'

function ProtectedApp() {
  const { user } = useAuth()
  return user ? <FollowerGoalTracker /> : <Login />
}

function App() {
  return (
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  )
}

export default App