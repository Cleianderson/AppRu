import moment from 'moment'

export function getDate (inx: number) {
  let dateToReturn: string

  if (moment().add(1, 'days').isoWeek() !== moment().isoWeek()) {
    const date = moment().add(1, 'days').isoWeekday(inx + 1)
    dateToReturn = date.format('DD/MM')
  } else {
    const date = moment().isoWeekday(inx + 1)
    dateToReturn = date.format('DD/MM')
  }

  return dateToReturn
}

export function tranformNum2Day (inx: number) {
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
