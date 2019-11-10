import moment from 'moment'

export function getDate(inx) {
  const date = moment().isoWeekday(inx + 1)
  return date.format('DD/MM/YY')
}

export function tranformNum2Day(inx) {
  switch (inx) {
  case 1:
    return 'TERÇA'
  case 2:
    return 'QUARTA'
  case 3:
    return 'QUINTA'
  case 4:
    return 'SEXTA'
  }
  return 'SEGUNDA'
}
