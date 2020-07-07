// eslint-disable-next-line no-unused-vars
import { createContext, Dispatch, SetStateAction } from 'react'

type ConfigType = {
    showIndicator: boolean
    setShowIndicator: Dispatch<SetStateAction<boolean>>
    showDateOnIndicator: boolean
    setShowDateOnIndicator: Dispatch<SetStateAction<boolean>>
}

const ConfigContext = createContext<ConfigType>({} as ConfigType)

export default ConfigContext
