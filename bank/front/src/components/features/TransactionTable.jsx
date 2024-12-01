import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

export default function TransactionTable() {
  const [transactions] = useState([
    {
      id: '1',
      from: 'John Doe',
      to: 'Jane Smith',
      amount: 500.00,
      date: '2024-03-20'
    },
    {
        id: '2',
        from: 'Lior Shalom',
        to: 'Maya Shasho',
        amount: 25.50,
        date: '2024-11-26'
      },
    // Add more sample transactions as needed
  ])

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left flex items-center gap-2">
              From <ArrowUpDown className="w-4 h-4" />
            </th>
            <th className="px-6 py-3 text-left">To</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{tx.from}</td>
              <td className="px-6 py-4">{tx.to}</td>
              <td className={`px-6 py-4 ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(tx.amount).toFixed(2)}
              </td>
              <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}