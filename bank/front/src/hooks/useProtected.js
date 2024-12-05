import { useState } from 'react';
import protectedService from '../services/protectedService';
import parseError from '../utils/error-parser.js';

export default function useProtected() {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
    const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
    const [isBalanceLoading, setIsBalanceLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
  
    const fetchTransactions = async () => {
      try {
        setIsTransactionsLoading(true);
        const transactions = await protectedService.getTransactions();
        setTransactions(transactions);
      } catch (error) {
        setApiError(parseError(error.message));
      } finally {
        setIsTransactionsLoading(false);
      }
    };
  
    const fetchUserInfo = async () => {
      try {
        setIsUserInfoLoading(true);
        const user = await protectedService.getUser();
        setUserInfo(user);
      } catch (error) {
        setApiError(parseError(error.message));
      } finally {
        setIsUserInfoLoading(false);
      }
    };

    const fetchBalance = async () => {
      try {
        setIsBalanceLoading(true);
        const balance = await protectedService.getBalance();
        setBalance(balance);
      } catch (error) {
        setApiError(parseError(error.message));
      } finally {
        setIsBalanceLoading(false);
      }
    }

    const postTransaction = async (transaction) => {
      try {
        await protectedService.postTransaction(transaction);
        setIsTransactionsLoading(true);
        setIsBalanceLoading(true);
      } catch (error) {
        setApiError(parseError(error.message));
        throw error;
      }
    };
  
    return {
      transactions,
      balance,
      userInfo,
      isTransactionsLoading,
      isUserInfoLoading,
      isBalanceLoading,
      apiError,
      setApiError,
      fetchTransactions,
      fetchUserInfo,
      fetchBalance,
      postTransaction
    };
  }