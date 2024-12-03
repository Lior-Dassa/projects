import { useState } from 'react'
import { useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onSwitchForms , setIsConnected}) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [apiError, setApiError] = useState();
  const [isLoginError, setIsLoginError] = useState(false);

  const [errors, setErrors] = useState({});
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        setIsConnected(true);
      } catch (error) {
        setApiError(error.message);
        setIsLoginError(true);
      }
    }else {
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleChange = (e) => {
    setApiError(null);
    setIsLoginError(false);

    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFocus = (e) => {
    e.target.classList.remove('border-red-500', 'bg-red-50');
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  }

  return (
    <div className="p-8"> 
      <div className="mb-8"> 
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-sm text-gray-600">Welcome back! Please enter your details.</p>
      </div>

      
      <form  onSubmit={handleSubmit}>  
        {/* Email Field */}
        <div >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`block w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 
                ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="absolute left-0 top-full mt-1 mb-8">
                <p className="text-sm text-red-600 error-message">
                  {errors.email}
                </p>
            </div>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 mt-10">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`block w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500
                ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter your password"
            />
            
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 
                <EyeOff className="h-5 w-5 text-gray-400" /> : 
                <Eye className="h-5 w-5 text-gray-400" />
              }
            </button>
            {errors.password && (
              <div className="absolute left-0 top-full mt-1 mb-8">
                <p className="text-sm text-red-600 error-message">
                  {errors.password}
                </p>
              </div>
            )}
          </div>

        </div>
        

        {/* Remember me and Forgot Password Link    
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              id="remember"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500"
          > 
            Forgot password?
          </button>
        </div> */}

        {/* Submit Button */}
        <div className="mt-12"> 
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isLoginError ? 'bg-red-500 hover:bg-red-600' : ''}`}
          >
            {apiError ? apiError : isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm pt-4"> 
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-500 font-medium"
            onClick={onSwitchForms}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}