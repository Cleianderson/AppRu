// eslint-disable-next-line no-unused-vars
import { createContext, Dispatch, SetStateAction } from 'react'

type ConfigType = {
    configs: Configs
    configDispatch: Dispatch<ConfigAction>
}

const ConfigContext = createContext<ConfigType>({} as ConfigType)

export default ConfigContext
