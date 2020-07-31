import { createContext } from 'react'

type RequestType = {
    action: () => Promise<any>
    setAction: any
}

const RequestContext = createContext<RequestType>({} as RequestType)

export default RequestContext
