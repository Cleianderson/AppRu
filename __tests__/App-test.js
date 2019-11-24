/**
 * @format
 */

import 'react-native'
import React from 'react'

// eslint-disable-next-line max-len
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import App from '../src/App'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

it('App rendered correctly', () => {
  renderer.create(<App />)
})
