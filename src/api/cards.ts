import { cards } from './mock-data'
import { ICard } from './../assets/models/card'

export const useCardApis = () => {
  const saveCardToLocalStorage = (cards: ICard[]) => {
    localStorage.setItem('my-cards', JSON.stringify(cards))
  }

  const getCardList = () => {
    return new Promise<ICard[]>((resolve, _) => {
      const localStoredCards = localStorage.getItem('my-cards')
      let myCards: ICard[] = []
      if (localStoredCards) {
        myCards = JSON.parse(localStoredCards) as ICard[]
      } else {
        myCards = cards
        saveCardToLocalStorage(cards)
      }
      myCards = myCards.filter((card) => card.status !== 'canceled')
      resolve(myCards)
    })
  }

  const addNewCard = async (data: Required<ICard>) => {
    const cards = [...(await getCardList())]
    const isExisted = cards.find((card) => card.cardNumber === data.cardNumber)
    if (!isExisted) {
      cards.unshift(data)
      saveCardToLocalStorage(cards)
    } else {
      return 'This card has already been added'
    }
    return cards
  }

  const updateCard = async (id: string, data: Partial<ICard>) => {
    const cards = [...(await getCardList())]
    const cardToUpdateIdx = cards.findIndex((card) => card.id === id)
    if (cardToUpdateIdx > -1) {
      cards[cardToUpdateIdx] = {
        ...cards[cardToUpdateIdx],
        ...data,
      }
      saveCardToLocalStorage(cards)
    } else {
      return 'This card is not avaiable now. Please try again later.'
    }
  }

  return { getCardList, addNewCard, updateCard }
}
