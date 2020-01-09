/**
 * @format
 */

import 'react-native'
import React from 'react'

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import DataNull from '../src/components/DataNull'
import Requesting from '../src/components/Requesting'
import Modal from '../src/components/Modal'
import ButtonMenu from '../src/components/ButtonMenu'

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

const item = {
  almoco: {
    suc: 'ACEROLA/ CAJU',
    p1: 'CARNE ASSADA AO MOLHO FERRUGEM',
    p2: 'PEIXE À GOMES DE SÁ',
    gua: 'QUIBEBE- ARROZ COM ERVILHAS- FEIJÃO PRETO',
    sob: 'MAÇA',
    veg: 'RISOTO DE GRÃO DE BICO',
    gre: 'ISCA DE FRANGO COM PIMENTÕES',
    fag: 'PARMEGIANA DE FRANGO',
    sco: 'BETERRABA COM CEBOLINHO E GERGELIM BRANCO',
    sal: 'MIX DE FOLHAS COM  CENOURA E HORTELÃ'
  },
  jantar: {
    suc: 'ACEROLA / CAJU',
    p1: 'PEITO ACEBOLADO',
    p2: 'ESCONDIDINHO DE ABÓBORA COM CHARQUE',
    gua: 'ARROZ COM CHEIRO VERDE',
    sob: 'MAÇA',
    sopa: 'SOPA MINESTRONE',
    veg: 'QUIBE COM MOLHO DE ERVAS',
    gre: 'FRANGO AO FORNO COM AVEIA',
    fag: '*******',
    sal: 'TOMATE COM ACELGA E ERVILHAS'
  }
}

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
    renderer.create(<Modal component={<Requesting />} />)
  })

  it('ButtonMenu', () => {
    renderer.create(
      <ButtonMenu
        onPress={() => { }}
        type='launch'
        item={item.almoco}
        isIncluded={() => true}
      />
    )
    renderer.create(
      <ButtonMenu
        onPress={() => { }}
        type='launch'
        item={item.almoco}
        isIncluded={() => false}
      />
    )
    renderer.create(
      <ButtonMenu
        onPress={() => { }}
        type='dinner'
        item={item.jantar}
        isIncluded={() => true}
      />
    )
    renderer.create(
      <ButtonMenu
        onPress={() => { }}
        type='dinner'
        item={item.jantar}
        isIncluded={() => false}
      />
    )
  })

})
