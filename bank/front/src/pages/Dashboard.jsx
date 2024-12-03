import { useEffect, useState } from 'react';
import DashboardHeader from '../components/layout/DashboardHeader.jsx'
import TransactionTable from '../components/features/TransactionTable.jsx'
import TransactionForm from '../components/features/TransactionForm.jsx'
import UserInfo from '../components/features/UserInfo.jsx'
import useProtected from '../hooks/useProtected.js'

export default function Dashboard() {
    const [isTableShouldRefresh, setIsTableShouldRefresh] = useState(true);
    const [isUserInfoShouldRefresh, setIsUserInfoShouldRefresh] = useState(true);

    const { 
        transactions, 
        userInfo, 
        isTransactionsLoading, 
        isUserInfoLoading,
        apiError, 
        fetchTransactions,
        fetchUserInfo,
        postTransaction
    } = useProtected();

    useEffect(() => {
        if (isTableShouldRefresh) {
            fetchTransactions();
            setIsTableShouldRefresh(false);
        }
        if (isUserInfoShouldRefresh) {
            fetchUserInfo();
            setIsUserInfoShouldRefresh(false);
        }
    }, [isTableShouldRefresh, isUserInfoShouldRefresh]);

    const handleTransactionSubmit = async (formData) => {
        try {
            await postTransaction(formData);
            setIsTableShouldRefresh(true);
            setIsUserInfoShouldRefresh(true);
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
    }
      
    
  return (
    <main className="min-h-screen bg-blue-50"> 
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8"> 
        <UserInfo 
          isLoading={isUserInfoLoading}
          apiError={apiError}
          userInfo={userInfo}
        />

        <TransactionForm onSubmit={handleTransactionSubmit} />

        <TransactionTable 
          isLoading={isTransactionsLoading}
          apiError={apiError}
          transactions={transactions}
          email={userInfo?._id}
        />
      </div>
    </main>
  )
}
