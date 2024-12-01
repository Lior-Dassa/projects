import { useState } from 'react';
import { Check } from 'lucide-react';   
import { useAuth } from '../../hooks/useAuth.js';
export default function ConfirmationCodeForm({ email }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { confirmSignup, resendConfirmation } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResendMessage('');
    setIsLoading(true);

    try {
      await confirmSignup(code);
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
          <input
            type="text"
            maxLength="6"
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setCode(value);
            }}
            onFocus={() => {
                setError('');
            }}
            className={`block w-full px-4 py-3 border border-gray-300 rounded-md text-lg tracking-widest text-center focus:ring-blue-500 focus:border-blue-500"
                ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            placeholder="000000"
            required
          />
        
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
  );
}