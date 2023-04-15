import { applyMiddleware, createStore } from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

const logger = createLogger({
    collapsed: true
})

import { Reducers } from '~/reducers'
import storageSaga from '~/sagas/Storage'

const sagaMiddleware = createSagaMiddleware()

export const Store = createStore(Reducers, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(storageSaga)
