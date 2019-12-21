/**
 * @format
 */

import 'react-native'
import React from 'react'

// eslint-disable-next-line max-len
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import DataNull from '../src/components/DataNull'
import Requesting from '../src/components/Requesting'
import Modal from '../src/components/Modal'
import Details from '../src/components/Details'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

describe('Rendering Components', () => {

  // it('App', () => {
  //   renderer.create(<App />)
  // })

  it('DataNull', () => {
    renderer.create(<DataNull />)
  })

  it('Requesting', () => {
    renderer.create(<Requesting />)
  })

  it('Modal', () => {
    renderer.create(<Modal />)
  })

  it('Details', () => {
    renderer.create(
      <Details
        names={['p1', 'p2']}
        item={{ p1: 'C t1', p2: 'C t2' }}
      />)
  })

})
