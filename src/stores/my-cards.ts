import { useTransactionApis } from './../api/transaction'
import { ITransaction } from './../assets/models/transaction'
import { Notify } from 'quasar'
import { ICard } from './../assets/models/card'
import { useCardApis } from './../api/cards'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyCardsStore = defineStore('my-cards', () => {
  const { getCardList, updateCard } = useCardApis()
  const { getCardTransactions } = useTransactionApis()

  const cards = ref<ICard[]>([])
  const transactions = ref<ITransaction[]>([])
  const selectedCard = ref<ICard>()

  const loadCards = async () => {
    const myCards = await getCardList()
    setCards(myCards)
  }

  const loadTransactions = async (cardId: string) => {
    const _transactions = await getCardTransactions(cardId)
    transactions.value = _transactions
  }

  const setCards = (myCards: ICard[]) => {
    cards.value = [...myCards]
  }

  const selectCard = (card: ICard) => {
    selectedCard.value = card
  }

  const freezeCard = () => {
    const cardId = selectedCard.value?.id || ''
    const card = cards.value.find((c) => c.id === cardId)
    if (card) {
      card.status = 'frozen'
      updateCard(cardId, card)
      Notify.create({
        message: 'Your card has been frozen.',
        type: 'positive',
      })
    } else {
      Notify.create({
        message: 'This card is not avaiable now. Please try again later.',
        type: 'warning',
      })
    }
  }

  const unfreezeCard = () => {
    const cardId = selectedCard.value?.id || ''
    const card = cards.value.find((c) => c.id === cardId)
    if (card) {
      card.status = 'active'
      updateCard(cardId, card)
      Notify.create({
        message: 'Your card has been unfrozen.',
        type: 'positive',
      })
    } else {
      Notify.create({
        message: 'This card is not avaiable now. Please try again later.',
        type: 'warning',
      })
    }
  }

  const cancelCard = () => {
    const cardId = selectedCard.value?.id || ''
    const card = cards.value.find((c) => c.id === cardId)
    const cardIdx = cards.value.findIndex((c) => c.id === cardId)
    if (card && cardIdx > -1) {
      card.status = 'canceled'
      updateCard(cardId, card)
      cards.value.splice(cardIdx, 1)
      Notify.create({
        message: 'Your card has been canceled.',
        type: 'positive',
      })
    } else {
      Notify.create({
        message: 'This card is not avaiable now. Please try again later.',
        type: 'warning',
      })
    }
  }

  const setSpendLimit = (spendLimit: number) => {
    const cardId = selectedCard.value?.id || ''
    const card = cards.value.find((c) => c.id === cardId)
    const cardIdx = cards.value.findIndex((c) => c.id === cardId)
    if (card && cardIdx > -1) {
      card.spendLimit = spendLimit
      updateCard(cardId, card)
      Notify.create({
        message: `Your card spend limit has been set to S$${spendLimit}.`,
        type: 'positive',
      })
    } else {
      Notify.create({
        message: 'This card is not avaiable now. Please try again later.',
        type: 'warning',
      })
    }
  }

  return {
    cards,
    transactions,
    selectedCard,
    loadCards,
    setCards,
    selectCard,
    freezeCard,
    unfreezeCard,
    cancelCard,
    setSpendLimit,
    loadTransactions,
  }
})
