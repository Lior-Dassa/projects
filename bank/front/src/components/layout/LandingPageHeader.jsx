import { useState } from 'react'
import {LogIn , UserPlus2} from 'lucide-react'
import Modal from '../shared/Modal'
import LoginForm from '../features/LoginForm'
import SignUpForm from '../features/SignUpForm'

export default function LandingPageHeader({ setIsConnected }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  const switchForms = () => {
    setIsLoginOpen(!isLoginOpen)
    setIsSignUpOpen(!isSignUpOpen)
  }

  return (
    <header className="w-full h-36 bg-white shadow-sm relative"> 
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-5xl font-bold text-blue-600">MO Bank</h1> 
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-4">
            <div className="relative">
              <button 
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="flex items-center gap-2 px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg text-lg" 
            >
              <LogIn className="w-8 h-8" /> 
              <span>Login</span>
            </button>

            <Modal 
              isOpen={isLoginOpen} 
              onClose={() => setIsLoginOpen(false)}
            >
              <LoginForm  onSwitchForms={switchForms} setIsConnected={setIsConnected}/>
            </Modal>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsSignUpOpen(!isSignUpOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-lg"
              >
                <UserPlus2 className="w-6 h-6" />
                <span>Sign Up</span>
              </button>

              <Modal 
                isOpen={isSignUpOpen} 
                onClose={() => setIsSignUpOpen(false)}
              >
                <SignUpForm onSwitchForms={switchForms}/>
              </Modal>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  )
}