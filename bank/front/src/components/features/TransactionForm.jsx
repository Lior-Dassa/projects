import { useState } from 'react';
import useProtected from '../../hooks/useProtected';
import parseError from '../../utils/error-parser.js';

export default function TransactionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    to: '',
    amount: ''
  });

  const [errors, setErrors] = useState({
    to: '',
    amount: ''
  });

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.to) {
      newErrors.to = 'Recipient is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.to)) {
      newErrors.to = 'Please enter a valid email address'
    }

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(parseFloat(formData.amount))) {
      newErrors.amount = 'Amount must be a number'
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTransactionError = (errors) => {
    for (const errorMessage of errors) {
        if (errorMessage.includes('recipient')) {
          setErrors(prev => ({
            ...prev,
            to: errorMessage
          }))
        } else if (errorMessage.includes('amount') || errorMessage.includes('funds')) {
          setErrors(prev => ({
            ...prev,
            amount: errorMessage
          }))
        }
    }
  }

  const handleFocus = (e) => {
    e.target.classList.remove('border-red-500', 'bg-red-50');
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.log("from transaction form", error.message);
        handleTransactionError(parseError(error.message));
      } finally {
        setFormData({ to: '', amount: '' });
      }
    } else {
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }


  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-4 mb-6 mt-8"> {/* Changed from max-w-md to max-w-2xl */}
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Make a Transaction</h3> 
    <form onSubmit={handleSubmit}> 
      <div className="flex gap-4"> 
        <div className="flex flex-col w-[55%]"> 
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                ${errors.to ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            placeholder="Recipient's email"
          />
          {errors.to && (
            <p className="text-xs text-red-600 mt-1 ml-1 whitespace-nowrap"> 
              {errors.to}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[30%]"> 
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full px-3 py-1.5 text-sm border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                ${errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            placeholder="Amount"
          />
          {errors.amount && (
            <p className="text-xs text-red-600 mt-1 ml-1 whitespace-nowrap"> 
              {errors.amount}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-[20%] h-[32px] text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </form>
  </div>
  );
}