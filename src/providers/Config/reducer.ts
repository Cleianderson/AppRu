import { getItem, setItem } from '~/service/Storage'

export function initConfigs () {
  const loadConfig = async () => (await getItem<Configs>('@RUral:config')).data

  let config: Configs | null = null
  loadConfig().then((data) => { config = data })

  if (config === null) {
    return {
      showIndicator: true,
      showDateOnIndicator: false
    }
  } else {
    return config
  }
}

export default function reducer (state: Configs, action: ConfigAction): Configs {
  const updateConfigStore = async (data: Configs) => await setItem('@RUral:config', { data })

  switch (action.type) {
    case 'log': {
      console.log('oi')
      return state
    }
    case 'UPDATE_CONFIG': {
      const updatedState = { ...state, ...action.data }
      updateConfigStore(updatedState)
      return updatedState
    }
    default: {
      return state
    }
  }
}
