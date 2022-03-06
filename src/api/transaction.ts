import { transactions } from './mock-data'
import { ITransaction } from './../assets/models/transaction'
export const useTransactionApis = () => {
  const getCardTransactions = (cardId: string) => {
    return new Promise<ITransaction[]>((resolve, reject) => {
      const cardTransactions = transactions.filter((tx) => tx.cardId === cardId)
      resolve(cardTransactions)
    })
  }
  return {
    getCardTransactions,
  }
}
