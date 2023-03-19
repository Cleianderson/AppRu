// eslint-disable-next-line no-unused-vars
import { createContext, Dispatch, SetStateAction } from 'react'

type StorageType = {
    stoage: Storage
    storageDispatch: Dispatch<StorageAction>
}

const StorageContext = createContext<StorageType>({} as StorageType)

export default StorageContext
