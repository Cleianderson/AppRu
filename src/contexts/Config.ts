import { createContext } from 'react'

type ConfigType = {
    showIndicator: boolean
    showDateOnIndicator: boolean
}

const ConfigContext = createContext<ConfigType>({} as ConfigType)

export default ConfigContext
