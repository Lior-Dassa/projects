import { useState, useRef } from 'react';
import { Check } from 'lucide-react';   
import { useAuth } from '../../hooks/useAuth.js';
export default function ConfirmationCodeForm({ email, onSwitchForms }) {
  const [code, setCode] = useState(['','','','','','']);
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const { confirmSignup, resendConfirmation } = useAuth();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleFocus = () => {
    setError('');
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs[index - 1].current.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs[index - 1].current.focus();
      setTimeout(() => {
        inputRefs[index - 1].current.setSelectionRange(1, 1);
      }, 0);
    } else if (event.key === 'ArrowRight' && index < code.length - 1) {
      event.preventDefault();
      inputRefs[index + 1].current.focus();
      setTimeout(() => {
        inputRefs[index + 1].current.setSelectionRange(1, 1);
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResendMessage('');
    setIsLoading(true);

    try {
      await confirmSignup(code.join(''));
      setIsConfirmed(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMessage('');
    const response = await resendConfirmation(email);
    setResendMessage(response.message);
  };

  return (
    isConfirmed ? (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified</h2>
        <p className="text-sm text-gray-600">Your email has been verified successfully.</p>
        <div className=" text-sm pt-2">
          <span className="text-gray-600">Please </span>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-500 font-medium"
            onClick={onSwitchForms}
          >
            Log in
          </button>
          <span className="text-gray-600"> to continue.</span>
        </div>
        
      </div>
    ) : (
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-sm text-gray-600">
            We've sent a 6-digit confirmation code to {email}. 
            Enter the code below to confirm your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmation Code
            </label>
            
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={() => handleFocus()}
                  className={`w-8 h-12 mr-2 bg-gray-100 text-center text-xl font-semibold border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-400'}`}
                  required
                />
              ))}
            </div>
          
            {error && (
              <p className="mt-1 text-sm text-red-600 error-message">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              'Verifying...'
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Verify Account
              </span>
            )}
          </button>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => handleResend(email)}
              >
                Resend
              </button>
            </p>
            {resendMessage && (
              <p className="mt-1 text-sm text-gray-600">{resendMessage}</p>
            )}
          </div>
        </form>
      </div>
    )
  );
}