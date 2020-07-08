import React, { useReducer } from 'react'

import ConfigContext from '~/contexts/ConfigContext'

import reducer, { initConfigs } from './reducer'

const initalState = {
  showIndicator: true,
  showDateOnIndicator: false
}

const Config: React.FC = ({ children }) => {
  const [configReduce, configDispatch] = useReducer<ConfigsReducer, Configs>(reducer, initalState, initConfigs)

  return (
    <ConfigContext.Provider value={{
      configs: configReduce,
      configDispatch
    }} >
      {children}
    </ConfigContext.Provider>
  )
}

export default Config
