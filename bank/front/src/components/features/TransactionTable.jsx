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


  return (
    <div className="w-full max-w-4xl mx-auto mt-8 overflow-x-auto">
      
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
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-8">
                No transactions found
              </td>
            </tr>
          ) : (
            sortedTransactions.map((tx) => (
              <tr key={tx._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{tx.from}</td>
                <td className="px-6 py-4">{tx.to}</td>
                <td className={`px-6 py-4 ${tx.to === email ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(tx.amount)}
                </td>
                <td className="px-6 py-4">{formatDate(tx.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>  
    </div>
  );
}