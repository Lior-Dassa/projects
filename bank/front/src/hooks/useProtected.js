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
  
    const fetchTransactions = async () => {
      try {
        setIsTransactionsLoading(true);
        const transactions = await protectedService.getTransactions();
        setTransactions(transactions);
      } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
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
      fetchTransactions,
      fetchUserInfo,
      fetchBalance,
      postTransaction
    };
  }