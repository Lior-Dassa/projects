import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import ConfirmationCodeForm from './ConfirmationCodeForm'

export default function SignUpForm({ onSwitchForms }) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { signup, isLoading , apiError } = useAuth();

  const validateForm = () => {
    const newErrors = {}

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Name must be at least 2 characters'
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Name must be at least 2 characters'
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }

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

  const handleSignUpError = () => {
    for (const errorMessage of apiError) {
      if (errorMessage.includes('email')) {
        setErrors(prev => ({
          ...prev,
          email: errorMessage
        }))
      } else if (errorMessage.includes('phone')) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: errorMessage
        }))
      } else if (errorMessage.includes('first')) {
        setErrors(prev => ({
          ...prev,
          firstName: errorMessage
        }))
      } else if (errorMessage.includes('last')) {
        setErrors(prev => ({
          ...prev,
          lastName: errorMessage
        }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        await signup(formData)
        setShowConfirmation(true);
        setRegisteredEmail(formData.email);
      } catch (error) {
        handleSignUpError();
      }
    } else {
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleChange = (e) => {
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

  if (showConfirmation) {
    return (
      <ConfirmationCodeForm 
        email={registeredEmail}
        onSwitchForms={onSwitchForms}
      />
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-sm text-gray-600">Join us! Please enter your details.</p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* First Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              className={`block w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 
                ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 error-message">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              className={`block w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 
                ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 error-message">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onFocus={handleFocus}
              required
              className={`block w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 
                ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600 error-message">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
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
              required
              className={`block w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 
                ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 error-message">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
              required
              className={`block w-full pl-10 pr-10 py-3 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 
                ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Create a password"
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
            </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 error-message">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            {isLoading ? 'Creating Account' : 'Create Account'}
          
        </button>

        {/* Login Link */}
        <div className="text-center text-sm pt-2">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-500 font-medium"
            onClick={onSwitchForms}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}