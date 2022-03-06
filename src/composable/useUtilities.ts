import numeral from 'numeral'
import moment from 'moment'

export const useUtilities = () => {
  const formatMoney = (value: string | number) => {
    return numeral(value).format('0,0[.]00')
  }

  const formatDate = (value: string | number, format = 'DD MMM YYYY') => {
    return moment(value).format(format)
  }
  return { formatMoney, formatDate }
}
