import { useEffect, useState } from 'react';
import DashboardHeader from '../components/layout/DashboardHeader.jsx'
import TransactionTable from '../components/features/TransactionTable.jsx'
import TransactionForm from '../components/features/TransactionForm.jsx'
import UserInfo from '../components/features/UserInfo.jsx'
import useProtected from '../hooks/useProtected.js'
import authService from '../services/authService.js'

export default function Dashboard({setIsConnected, setIsLoggedOut}) {
    const [isTableShouldRefresh, setIsTableShouldRefresh] = useState(true);
    const [isUserInfoShouldRefresh, setIsUserInfoShouldRefresh] = useState(true);
    const [isBalanceShouldRefresh, setIsBalanceShouldRefresh] = useState(true);

    const { 
        transactions, 
        userInfo, 
        balance,
        isTransactionsLoading, 
        isUserInfoLoading,
        isBalanceLoading,
        apiError, 
        fetchTransactions,
        fetchUserInfo,
        fetchBalance,
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
        if (isBalanceShouldRefresh) {
            fetchBalance();
            setIsBalanceShouldRefresh(false);
        }
    }, [isTableShouldRefresh, isUserInfoShouldRefresh, isBalanceShouldRefresh]);

    const handleTransactionSubmit = async (formData) => {
        try {
            await postTransaction(formData);
            setIsTableShouldRefresh(true);
            setIsBalanceShouldRefresh(true);
        } catch (error) {
            if (error.message.includes('token')) {
                authService.logout();
                setIsLoggedOut(true);
                setIsConnected(false);
            }
            throw error;
        }
    }
      
  return (
    <main className="min-h-screen bg-blue-50 pt-36"> 
      <DashboardHeader setIsConnected={setIsConnected}/>
      
      <div className="max-w-7xl mx-auto px-4 py-8"> 
        <UserInfo 
          isLoading={isUserInfoLoading}
          isBalanceLoading={isBalanceLoading}
          apiError={apiError}
          userInfo={userInfo}
          balance={balance}
        />

        <TransactionForm onSubmit={handleTransactionSubmit} />

        <TransactionTable 
          isLoading={isTransactionsLoading}
          apiError={apiError}
          transactions={transactions}
          email={userInfo?.email}
        />
      </div>
    </main>
  )
}
