export interface ICard {
  id: string
  cardHolder: string
  cardNumber: string
  cvv: string
  expiryDate: string
  status: 'frozen' | 'active' | 'canceled'
  spendLimit?: number
}
