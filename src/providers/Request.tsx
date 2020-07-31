import React, { useState } from 'react'

// import { Container } from './styles';
import RequestContext from '~/contexts/RequestContext'
import Requesting from '~/components/Requesting'

const Request: React.FC = ({ children }) => {
  // eslint-disable-next-line no-extra-parens
  const [action, setAction] = useState<() => Promise<any>>(async () => false)

  return (
    <RequestContext.Provider value={{ action, setAction }} >
      {children}
      <Requesting action={action} />
    </RequestContext.Provider>
  )
}

export default Request
