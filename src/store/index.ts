import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { Reducers } from '~/reducers'
import storageSaga from '~/sagas/Storage'

const sagaMiddleware = createSagaMiddleware()

export const Store = createStore(Reducers, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(storageSaga)
