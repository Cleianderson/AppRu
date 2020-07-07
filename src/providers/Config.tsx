import React, { useState, useEffect } from 'react'

import ConfigContext from '~/contexts/Config'

import { getItem, setItem } from '~/service/Storage'

type ConfigProps = {
    showIndicator: boolean
    showDateOnIndicator: boolean
}

const Config: React.FC = ({ children }) => {
  const [showIndicator, setShowIndicator] = useState(true)
  const [showDateOnIndicator, setShowDateOnIndicator] = useState(false)

  const updateConfigStore = async () => await setItem('@RUral:config', {
    data: { showIndicator, showDateOnIndicator }
  })

  useEffect(() => {
    const loadConfigFromStorage = async () => {
      const config = (await getItem<ConfigProps>('@RUral:config')).data

      if (config === null) {
        await updateConfigStore()
      } else {
        setShowDateOnIndicator(config.showDateOnIndicator)
        setShowIndicator(config.showIndicator)
      }
    }

    loadConfigFromStorage()
  }, [])

  useEffect(() => {
    updateConfigStore()
  }, [showIndicator, showDateOnIndicator])

  return (
    <ConfigContext.Provider value={{
      showIndicator,
      setShowIndicator,
      showDateOnIndicator,
      setShowDateOnIndicator
    }} >
      {children}
    </ConfigContext.Provider>
  )
}

export default Config
