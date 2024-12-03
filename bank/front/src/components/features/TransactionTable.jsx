import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import formatCurrency from "../../utils/currency-parser.js";
import formatDate from "../../utils/date-parser.js";
export default function TransactionTable({ isLoading, apiError, transactions , email  }) {
  const [sortDirection, setSortDirection] = useState('asc');

  const handleDateSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    return direction * (new Date(b.createdAt) - new Date(a.createdAt));
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-4">
        <div className="text-red-600 text-center">
          Error loading transactions: {apiError}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 overflow-x-auto">
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No transactions found
        </div>
      ) : (
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left flex items-center gap-2">
                From 
              </th>
              <th className="px-6 py-3 text-left">To</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th 
                className="px-6 py-3 text-left cursor-pointer hover:bg-blue-700"
                onClick={handleDateSort}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{tx.from}</td>
                <td className="px-6 py-4">{tx.to}</td>
                <td className={`px-6 py-4 ${tx.to == email ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(tx.amount)}
                </td>
                <td className="px-6 py-4">{formatDate(tx.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}