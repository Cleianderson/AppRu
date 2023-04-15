import Storage from '@react-native-async-storage/async-storage'

// eslint-disable-next-line camelcase
export async function setWeek (str: string, number_week: number, foods: any) {
  await Storage.setItem(
    str,
    JSON.stringify({
      number_week,
      foods
  }))
}

export async function setItem (str: string, json: object) {
  await Storage.setItem(str, JSON.stringify(json))
}

export async function setPrimitive (str: string, item: any) {
  await Storage.setItem(str, String(item))
}

export async function getItem<T> (str: string): Promise< {data: T}> {
  const item = await Storage.getItem(str)
  const itemJson = JSON.parse(item || '{ "data": null }') as any as Promise<{data: T}>
  return itemJson
}

// Atualiza as variáveis food e @week
export async function updateWeekStorage (foods: any, week?: any) {
  if (week !== null) {
    await setWeek('@week', week.number_week, foods)
  }
}
