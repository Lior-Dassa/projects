import { useState } from 'react';
import protectedService from '../services/protectedService';
import parseError from '../utils/error-parser.js';

export default function useProtected() {
    const [transactions, setTransactions] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
    const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
  
    const fetchTransactions = async () => {
      try {
        setIsTransactionsLoading(true);
        const user = await protectedService.getUser();
        setTransactions(user.transactions);
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

    const postTransaction = async (transaction) => {
      try {
        await protectedService.postTransaction(transaction);
        setIsTransactionsLoading(true);
        setIsUserInfoLoading(true);
      } catch (error) {
        console.log(error);
        setApiError(parseError(error.message));
      }
    };
  
    return {
      transactions,
      userInfo,
      isTransactionsLoading,
      isUserInfoLoading,
      apiError,
      setApiError,
      fetchTransactions,
      fetchUserInfo,
      postTransaction
    };
  }